# volto-matomo

[![Releases](https://img.shields.io/github/v/release/eea/volto-matomo)](https://github.com/eea/volto-matomo/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-matomo%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-matomo/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-matomo-master&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-matomo-master)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-matomo-master&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-matomo-master)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-matomo-master&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-matomo-master)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-matomo-master&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-matomo-master)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-matomo%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-matomo/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-matomo-develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-matomo-develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-matomo-develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-matomo-develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-matomo-develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-matomo-develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-matomo-develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-matomo-develop)

[Volto](https://github.com/plone/volto) add-on

## Features

Integrates [Matomo](https://matomo.org/) with Volto sites. At this moment there is a very basic integration that just pings Matomo on each router location change.

To configure it, either set the following variables:

- `settings.matomoSiteId` (if not available it uses: `1`)
- `settings.matomoUrlBase` (if not available it uses: `https://matomo.eea.europa.eu/`)

or `RAZZLE_MATOMO_SITE_ID` and `RAZZLE_MATOMO_URL` environment variables.

With version 4.0.0+, you have the possibility to use a second matomo in parallel:

- `settings.matomoSecondSiteId` (if not available it uses: `1`)
- `settings.matomoSecondUrlBase` (if not available it uses: `https://matomo.eea.europa.eu/`)

or `RAZZLE_MATOMO_SECOND_SITE_ID` and `RAZZLE_MATOMO_SECOND_URL` environment variables.

## API

There are four exports in `utils.js` (which can be imported from `volto-matomo/utils`, including from other Volto addons):

1. `trackPageView({ href, ...options }) : void` - takes an object with `href` and other options and sends to Matomo a page view track;
2. `trackEvent(options) : void` - takes an `options` object parameter and sends to Matomo an event track.
3. `trackSiteSearch(options) : void` - takes an `options` object parameter and sends to Matomo an site search track.
4. `pushInstruction(name, ...args): void` - takes a name and an arbitrary number of parameters, and pushes them to Matomo.

Note that the Matomo instance is behind the scenes lazy-loaded and cached.

The default behavior of volto-matomo is a call to `trackPageView` in `utils.js`, with the `href` and `documentTitle` options, on every URL change as recorded by the `AppExtras` component in Volto. The `href` is taken from `props.content['@id']` received by the `MatomoAppExtra.jsx` component. The `utils.js` file exposes just a part of the Matomo React API. If you wish to extend it or to understand it better, [this link](https://github.com/Amsterdam/matomo-tracker/tree/master/packages/react) might be helpful.

## Getting started

1. Create new volto project if you don't already have one:

   ```
   $ npm install -g @plone/create-volto-app
   $ create-volto-app my-volto-project
   $ cd my-volto-project
   ```

1. Update `package.json`:

   ```json
   "addons": [
       "@eeacms/volto-matomo"
   ],

   "dependencies": {
       "@eeacms/volto-matomo": "4.0.0"
   }
   ```

1. Install new add-ons and restart Volto:

   ```
   $ yarn
   $ yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## Release

See [RELEASE.md](https://github.com/eea/volto-matomo/blob/master/RELEASE.md).

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-matomo/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-matomo/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
