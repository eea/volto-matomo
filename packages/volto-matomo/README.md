# @eeacms/volto-matomo

[![Releases](https://img.shields.io/github/v/release/eea/volto-matomo)](https://github.com/eea/volto-matomo/releases)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-matomo%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-matomo/job/master/display/redirect)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-matomo&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-matomo)

[Volto](https://github.com/plone/volto) add-on that integrates [Matomo](https://matomo.org/) with [Volto](https://github.com/plone/volto) sites. At this moment there is a very basic integration that just pings Matomo on each router location change.

## How to

To configure it, either set the following variables:

- `settings.matomoSiteId` (if not available it uses: `1`)
- `settings.matomoUrlBase` (if not available it uses: `https://matomo.eea.europa.eu/`)

or `RAZZLE_MATOMO_SITE_ID` and `RAZZLE_MATOMO_URL` environment variables.

With version 4.0.0+, you have the possibility to use a second matomo in parallel:

- `settings.matomoSecondSiteId` (if not available it uses: `1`)
- `settings.matomoSecondUrlBase` (if not available it uses: `https://matomo.eea.europa.eu/`)

or `RAZZLE_MATOMO_SECOND_SITE_ID` and `RAZZLE_MATOMO_SECOND_URL` environment variables.

With version 6.0.0 it is possible to have custom matomo settings based on the pathname.

- `settings.matomoTrackerIdFn` is function with signature `(pathname) => trackerId:string`
- `settings.matomoTrackers` is a mapping of `trackerId`s to `matomo` setting objects (all the keys for `config.settings` can be added to this object).

## API

There are four exports in `utils.js` (which can be imported from `volto-matomo/utils`, including from other Volto addons):

1. `trackPageView({ href, ...options }) : void` - takes an object with `href` and other options and sends to Matomo a page view track;
2. `trackEvent(options) : void` - takes an `options` object parameter and sends to Matomo an event track.
3. `trackSiteSearch(options) : void` - takes an `options` object parameter and sends to Matomo an site search track.
4. `pushInstruction(name, null, ...args): void` - takes a name and an arbitrary number of parameters, and pushes them to Matomo.

Note that the Matomo instance is behind the scenes lazy-loaded and cached.

The default behavior of volto-matomo is a call to `trackPageView` in `utils.js`, with the `href` and `documentTitle` options, on every URL change as recorded by the `AppExtras` component in Volto. The `href` is taken from `props.content['@id']` received by the `MatomoAppExtra.jsx` component. The `utils.js` file exposes just a part of the Matomo React API. If you wish to extend it or to understand it better, [this link](https://github.com/Amsterdam/matomo-tracker/tree/master/packages/react) might be helpful.

## Upgrade

### Upgrading to 8.x

> This version requires `Volto 18` or `Volto 19` and Node.js 22.

The add-on keeps the same settings shape, the same defaults and the same moment of script injection,
so a site that upgrades keeps tracking exactly as before. The release adds Volto 19 support and moves
the repository to the Volto 19 layout, where the published package lives in
`packages/volto-matomo`.

#### Breaking changes

- **Node.js 22 or newer is required** (`engines.node >= 22`), 7.x declared no engine.
- **React 18 is required.** The package declares `react` and `react-dom` as `^18.2.0` peers, 7.x
  declared no peers.
- **The package no longer ships the repository tooling.** The Jest setup and the Docker files are
  gone and the unit tests moved to Vitest next to the add-on, so nothing a site imports was
  removed.

## Requirements

### Backend

- [Plone](https://plone.org/download)
- [plone.restapi](https://pypi.org/project/plone.restapi/)

### Frontend

- Node.js: `>=22.0.0`

## Installation

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

- If you already have a volto project, just update `package.json`:

  ```JSON
  "dependencies": {
      "@eeacms/volto-matomo": "*"
  }
  ```

   and `volto.config.js`:

   ```JavaScript
   const addons = ['@eeacms/volto-matomo'];
   ```

- If not, create one with Cookieplone, as recommended by the official Plone documentation for Volto 18+:

  ```
  uvx cookieplone project
  cd project-title
  ```

1. Install or update dependencies, then start the project:

   ```
   make install
   ```

   For a Cookieplone project, start the backend and frontend in separate terminals:

   ```
   make backend-start
   make frontend-start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## License

See [LICENSE.md](LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
