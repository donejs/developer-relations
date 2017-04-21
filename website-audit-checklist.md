This checklist is a rough guide on how to check for website accessibility, performance, and security issues.

# Accessibility

[This video](https://www.youtube.com/watch?v=cOmehxAU_4s) is a good quick-start to some common accessibility topics:

- Tabbing & focus rings
- Preventing offscreen content from being focused
- Navigating via a screen reader
- Checking the page structure
- Checking color & contrast with the [aXe Chrome extension](https://www.deque.com/products/axe/)
- Adding [axe-core](https://github.com/dequelabs/axe-core) to a build process

[The A11Y Project](http://a11yproject.com/)’s [Web Accessibility Checklist](http://a11yproject.com/checklist.html) is also a very good beginner’s guide to web accessibility.

# Performance

[Lighthouse](https://developers.google.com/web/tools/lighthouse/) is specifically made for validating parts of the [Progressive Web App Checklist](https://developers.google.com/web/progressive-web-apps/checklist), which includes various performance metrics.

The [Performance Budget Calculator](http://www.performancebudget.io/) is a handy tool for calculating a performance budget for websites.

[WebPagetest](https://www.webpagetest.org/easy) is a great tool for testing website performance on real-world devices.

Matthew’s [performance audit of a DoneJS website](https://github.com/stealjs/stealjs/issues/20) has some helpful commentary.

[Sitespeed.io](https://www.sitespeed.io/) has more useful tools, including CLI tools that could be added to a build process.

# Security

Enable [Synk](https://snyk.io/) on our repos to find and fix vulnerabilities in our dependencies.

[TODO: more security docs](https://github.com/donejs/developer-relations/issues/13#issuecomment-295915916)