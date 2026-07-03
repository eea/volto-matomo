# volto-matomo

[![Releases](https://img.shields.io/github/v/release/eea/volto-matomo)](https://github.com/eea/volto-matomo/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-matomo%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-matomo/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-matomo&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-matomo)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-matomo&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-matomo)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-matomo&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-matomo)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-matomo&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-matomo)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-matomo%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-matomo/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-matomo&branch=develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-matomo&branch=develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-matomo&branch=develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-matomo&branch=develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-matomo&branch=develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-matomo&branch=develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-matomo&branch=develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-matomo&branch=develop)

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

## Getting started

### Try volto-matomo with Docker

      git clone https://github.com/eea/volto-matomo.git
      cd volto-matomo
      make
      make start

Go to http://localhost:3000

`make start` now defaults to Volto 18. To run the same setup against Volto 17, use:

      VOLTO_VERSION=17 make
      VOLTO_VERSION=17 make start

### Add volto-matomo to your Volto project

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

   For a legacy Volto 17 project, install the package with `yarn` and restart the frontend as usual.

1. Go to http://localhost:3000

1. Happy editing!

## Release

See [RELEASE.md](https://github.com/eea/volto-matomo/blob/master/RELEASE.md).

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-matomo/blob/master/DEVELOP.md).

## Secret Scanning

This repository uses the Betterleaks GitHub Action to scan the current
repository content on every push and pull request. The scan uses the rules in
`.gitleaks.toml` and uploads a `betterleaks-report` artifact when a finding is
detected.

If the optional SMTP secrets are configured, failed scans also send an email to
the last commit committer. The workflow expects these repository or
organization secrets:

- `SMTP_URL`
- `SMTP_PORT` (optional, defaults to `25`)
- `SMTP_EMAIL`
- `SMTP_PASSWORD` (optional if the SMTP server does not require authentication)

Port `465` is sent with direct TLS; other ports use the default SMTP handshake.
The email includes a short finding summary from the redacted Betterleaks report,
including the redacted matched line from each finding.

There are three common outcomes:

1. **Everything is OK.** The `Betterleaks / Scan for secrets` check is green and
   no action is needed. Regular references to runtime values are OK, for example:

   ```js
   const tokenFromCookie = req.universalCookies.get('auth_token');
   ```

2. **A real secret was found.** The check is red and the workflow log asks you to
   download the `betterleaks-report` artifact. Open the artifact from the GitHub
   Actions run and check the reported file, line and rule. Remove the committed
   value, move it to the proper secret store, and rotate it if it was exposed.
   A report entry looks like this:

   ```json
   {
     "RuleID": "secret-literal-assignment",
     "File": "src/config.js",
     "StartLine": 12,
     "Secret": "[REDACTED]"
   }
   ```

3. **The finding is a false positive.** Keep the value only if it is clearly not
   sensitive, such as a test fixture, placeholder, or public example. Add
   `betterleaks:allow` on the same line and include a short explanation in the
   pull request.

   ```js
   const testPassword = 'admin'; //betterleaks:allow
   ```

   ```yaml
   password: "admin" #betterleaks:allow
   ```

Do not add `betterleaks:allow` to real credentials.

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-matomo/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
