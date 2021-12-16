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

  * `settings.matomoSiteId` (if not available it uses: `1`)
  * `settings.matomoUrlBase` (if not available it uses: `https://matomo.eea.europa.eu/`)

or `RAZZLE_MATOMO_SITE_ID` and `RAZZLE_MATOMO_URL` environment variables.

## API

There are two exports in `utils.js` (which can be imported from `volto-matomo/utils`, including from other Volto addons):

1. `trackPageView({ href, ...options }) : void` - takes an object with `href` and other options and sends to Matomo a page view track;
2. `trackEvent(options) : void` - takes an `options` object parameter and sends to Matomo an event track.
2. `trackSiteSearch(options) : void` - takes an `options` object parameter and sends to Matomo an site search track.

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

## Release

### Automatic release using Jenkins

*  The automatic release is started by creating a [Pull Request](../../compare/master...develop) from `develop` to `master`. The pull request status checks correlated to the branch and PR Jenkins jobs need to be processed successfully. 1 review from a github user with rights is mandatory.
* It runs on every commit on `master` branch, which is protected from direct commits, only allowing pull request merge commits.
* The automatic release is done by [Jenkins](https://ci.eionet.europa.eu). The status of the release job can be seen both in the Readme.md badges and the green check/red cross/yellow circle near the last commit information. If you click on the icon, you will have the list of checks that were run. The `continuous-integration/jenkins/branch` link goes to the Jenkins job execution webpage.
* Automated release scripts are located in the `eeacms/gitflow` docker image, specifically [js-release.sh](https://github.com/eea/eea.docker.gitflow/blob/master/src/js-release.sh) script. It  uses the `release-it` tool.
* As long as a PR request is open from develop to master, the PR Jenkins job will automatically re-create the CHANGELOG.md and package.json files to be production-ready.
* The version format must be MAJOR.MINOR.PATCH. By default, next release is set to next minor version (with patch 0).
* You can manually change the version in `package.json`.  The new version must not be already present in the tags/releases of the repository, otherwise it will be automatically increased by the script. Any changes to the version will trigger a `CHANGELOG.md` re-generation.
* Automated commits and commits with [JENKINS] or [YARN] in the commit log are excluded from `CHANGELOG.md` file.

### Manual release from the develop branch ( beta release )

#### Installation and configuration of release-it

You need to first install the [release-it](https://github.com/release-it/release-it)  client.

   ```
   npm install -g release-it
   ```

Release-it uses the configuration written in the [`.release-it.json`](./.release-it.json) file located in the root of the repository.

Release-it is a tool that automates 4 important steps in the release process:

1. Version increase in `package.json` ( increased from the current version in `package.json`)
2. `CHANGELOG.md` automatic generation from commit messages ( grouped by releases )
3. GitHub release on the commit with the changelog and package.json modification on the develop branch
4. NPM release ( by default it's disabled, but can be enabled in the configuration file )

To configure the authentification, you need to export GITHUB_TOKEN for [GitHub](https://github.com/settings/tokens)

   ```
   export GITHUB_TOKEN=XXX-XXXXXXXXXXXXXXXXXXXXXX
   ```

 To configure npm, you can use the `npm login` command or use a configuration file with a TOKEN :

   ```
   echo "//registry.npmjs.org/:_authToken=YYYYYYYYYYYYYYYYYYYYYYYYYYYYYY" > .npmrc
   ```

#### Using release-it tool

There are 3 yarn scripts that can be run to do the release

##### yarn release-beta

Automatically calculates and presents 3 beta versions - patch, minor and major for you to choose ( or Other for manual input).

```
? Select increment (next version):
❯ prepatch (0.1.1-beta.0)
  preminor (0.2.0-beta.0)
  premajor (1.0.0-beta.0)
  Other, please specify...
```

##### yarn release-major-beta

Same as `yarn release-beta`, but with premajor version pre-selected.

##### yarn release

Generic command, does not automatically add the `beta` to version, but you can still manually write it if you choose Other.

#### Important notes

> Do not use release-it tool on master branch, the commit on CHANGELOG.md file and the version increase in the package.json file can't be done without a PULL REQUEST.

> Do not keep Pull Requests from develop to master branches open when you are doing beta releases from the develop branch. As long as a PR to master is open, an automatic script will run on every commit and will update both the version and the changelog to a production-ready state - ( MAJOR.MINOR.PATCH mandatory format for version).


## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-matomo/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-matomo/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
