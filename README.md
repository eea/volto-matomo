# volto-matomo
[![Releases](https://img.shields.io/github/v/release/eea/volto-matomo)](https://github.com/eea/volto-matomo/releases)

[Volto](https://github.com/plone/volto) add-on

## Features

Ping Matomo on each `GET_CONTENT_SUCCESS`
* sets up a reducer called `matomo`.
* uses the `GET_CONTENT` action type constant
* does something only in client (browser) context
* reads the settings:
  * `settings.matomoSiteId`
  * `settings.matomoUrlBase` (if not available it uses: `https://matomo.eea.europa.eu/`)
* writes the `settings.matomoInstance` setting
* lazy-loads the Matomo instance

## Getting started

1. Create new volto project if you don't already have one:
    ```
    $ npm install -g @plone/create-volto-app
    $ create-volto-app my-volto-project
    $ cd my-volto-project
    ```

1. Update `package.json`:
    ``` JSON
    "addons": [
        "@eeacms/volto-matomo"
    ],

    "dependencies": {
        "@eeacms/volto-matomo": "1.0.0"
    }
    ```

1. Install new add-ons and restart Volto:
    ```
    $ yarn
    $ yarn start
    ```

1. Go to http://localhost:3000

1. Happy editing!

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-matomo/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-matomo/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
