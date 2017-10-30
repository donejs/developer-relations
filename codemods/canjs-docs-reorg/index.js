const fs = require("fs");
const newGroups = getNewGroupsMap();
const path = require("path");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const glob = promisify(require("glob"));

const GLOB_PATTERN = `**/*.{js,markdown,md}`;

module.exports = {
  getOptions: function() {
    return [];
  },
  run: function(directory) {
    const packageJSON = require(path.join(directory, "package.json"));
    const globOptions = {
      cwd: directory,
      ignore: ["node_modules/**", "test/**"]
    };
    return glob(GLOB_PATTERN, globOptions)
      .then(fileNames => {
        let fileIndex = {};
        return Promise.all(
          fileNames.map(fileName => {
            let filePath = path.join(directory, fileName);
            return readFile(filePath, "utf8").then(
              fileContent => (fileIndex[filePath] = fileContent)
            );
          })
        ).then(() => fileIndex);
      })
      .then(fileIndex => {
        for (let fileName in fileIndex) {
          fileIndex[fileName] = updateFileContents(
            fileIndex[fileName],
            packageJSON.name
          );
        }
        return fileIndex;
      })
      .then(fileIndex => {
        return Promise.all(
          Object.keys(fileIndex).map(fileName => {
            if (fileIndex[fileName]) {
              // Skip files that are the same (null)
              writeFile(fileName, fileIndex[fileName], "utf8");
            }
          })
        );
      });
  },
  updateFileContents: updateFileContents
};

function updateFileContents(originalFileContents, moduleName) {
  const indexOfParent = originalFileContents.indexOf("@parent");
  if (indexOfParent === -1) {
    return null;
  }

  let indexOfNextNewline = originalFileContents.indexOf("\n", indexOfParent);
  let indexOfPrecedingNewline;

  let index = indexOfParent;
  while (index > -1 && !indexOfPrecedingNewline) {
    const string = originalFileContents[index];
    if (string === "\n") {
      indexOfPrecedingNewline = index;
    }
    index -= 1;
  }

  const entireLine = originalFileContents.substring(
    indexOfPrecedingNewline,
    indexOfNextNewline
  );
  const collectionMatch = entireLine.match(
    /can-core|can-ecosystem|can-infrastructure|can-legacy/
  );
  if (!collectionMatch || !collectionMatch[0]) {
    return null;
  }
  const collectionName = collectionMatch[0];

  const lineWithCollection = entireLine.replace("@parent", "@collection");

  const newParent = newGroups[moduleName];
  const lineWithParentReplaced = entireLine.replace(collectionName, newParent);

  const newFileContents = [
    originalFileContents.substring(0, indexOfPrecedingNewline),
    lineWithParentReplaced,
    lineWithCollection,
    originalFileContents.substring(indexOfNextNewline)
  ].join("");

  return originalFileContents === newFileContents ? null : newFileContents;
}

function promisify(fn) {
  return function() {
    return new Promise((resolve, reject) => {
      fn.apply(fn, [
        ...arguments,
        (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        }
      ]);
    });
  };
}

function getNewGroupsMap() {
  const newGroups = [
    {
      children: [
        "can-compute",
        "can-define",
        "can-define-stream",
        "can-define-stream-kefir",
        "can-define/list/list",
        "can-define/map/map",
        "can-event",
        "can-event/async/async",
        "can-event/batch/batch",
        "can-event/lifecycle/lifecycle",
        "can-kefir",
        "can-list",
        "can-map",
        "can-map-backup",
        "can-map-define",
        "can-observation",
        "can-observe",
        "can-simple-map",
        "can-simple-observable",
        "can-stream",
        "can-stream-kefir"
      ],
      name: "can-observables",
      title: "Observables"
    },
    {
      children: [
        "can-connect",
        "can-connect-cloneable",
        "can-connect-feathers",
        "can-connect-ndjson",
        "can-connect-signalr",
        "can-fixture",
        "can-fixture-socket",
        "can-ndjson-stream",
        "can-set"
      ],
      name: "can-data-modeling",
      title: "Data Modeling"
    },
    {
      children: [
        "can-component",
        "can-ejs",
        "can-element",
        "can-react-component",
        "can-stache",
        "can-stache-bindings",
        "can-stache-converters",
        "can-view-autorender",
        "can-view-callbacks",
        "can-view-href",
        "can-view-import",
        "can-view-live",
        "can-view-model",
        "can-view-nodelist",
        "can-view-parser",
        "can-view-scope",
        "can-view-target",
        "react-view-model",
        "react-view-model/component",
        "steal-stache"
      ],
      name: "can-views",
      title: "Views"
    },
    {
      children: [
        "can-deparam",
        "can-param",
        "can-route",
        "can-route-pushstate",
        "can-stache/helpers/route"
      ],
      name: "can-routing",
      title: "Routing"
    },
    {
      children: [
        "can-ajax",
        "can-assign",
        "can-define-lazy-value",
        "can-globals",
        "can-make-map",
        "can-parse-uri",
        "can-test-helpers",
        "can-util",
        "can-zone",
        "can-zone-storage"
      ],
      name: "can-js-utilities",
      title: "JS Utilities"
    },
    {
      children: [
        "can-attribute-encoder",
        "can-control",
        "can-dom-events",
        "can-event-dom-enter",
        "can-event-dom-radiochange",
        "can-jquery"
      ],
      name: "can-dom-utilities",
      title: "DOM Utilities"
    },
    {
      children: [
        "can-define-validate-validatejs",
        "can-validate",
        "can-validate-interface",
        "can-validate-legacy",
        "can-validate-validatejs"
      ],
      name: "can-data-validation",
      title: "Data Validation"
    },
    {
      children: [
        "can-cid",
        "can-construct",
        "can-construct-super",
        "can-namespace",
        "can-reflect",
        "can-reflect-promise",
        "can-types"
      ],
      name: "can-typed-data",
      title: "Typed Data"
    },
    {
      children: ["can-symbol", "can-vdom"],
      name: "can-polyfills",
      title: "Polyfills"
    }
  ];

  const newGroupsMap = {};

  newGroups.forEach(newGroup => {
    newGroup.children.forEach(child => {
      newGroupsMap[child] = newGroup.name;
    });
  });

  return newGroupsMap;
}
