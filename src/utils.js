import { createInstance } from '@datapunt/matomo-tracker-react';
import config from '@plone/volto/registry';

/**
 * NOTE: this file exposes just a part of the Matomo React API. If you wish to
 * extend this file or to understand it better, this link may be helpful:
 * https://github.com/Amsterdam/matomo-tracker/tree/master/packages/react
 */

const _matomo = {};

function getMatomoParams(matomoTrackerId) {
  const custom =
    (matomoTrackerId ?? config.settings.matomoTrackers?.[matomoTrackerId]) ||
    {};

  const siteId =
    custom.matomoSiteId ??
    window.env?.RAZZLE_MATOMO_SITE_ID ??
    config.settings.matomoSiteId;

  const urlBase =
    custom.matomoUrlBase ??
    window.env?.RAZZLE_MATOMO_URL ??
    config.settings.matomoUrlBase ??
    'https://matomo.eea.europa.eu/';

  const userId =
    custom.matomoUserId ??
    window.env?.RAZZLE_MATOMO_USER_ID ??
    config.settings.matomoUserId;

  const trackerUrl =
    custom.matomoTrackerUrl ??
    window.env?.RAZZLE_MATOMO_TRACKER_URL ??
    config.settings.matomoTrackerUrl ??
    `${urlBase}matomo.php`;

  const srcUrl =
    custom.matomoSrcUrl ??
    window.env?.RAZZLE_MATOMO_SRC_URL ??
    config.settings.matomoSrcUrl ??
    `${urlBase}matomo.js`;

  const secondSiteId =
    custom.matomoSecondSiteId ??
    window.env?.RAZZLE_MATOMO_SECOND_SITE_ID ??
    config.settings.matomoSecondSiteId;

  const secondUrlBase =
    custom.matomoSecondUrlBase ??
    window.env?.RAZZLE_SECOND_MATOMO_URL ??
    config.settings.matomoSecondUrlBase ??
    urlBase;

  const secondTrackerUrl =
    custom.matomoSecondTrackerUrl ??
    window.env?.RAZZLE_MATOMO_SECOND_TRACKER_URL ??
    config.settings.matomoSecondTrackerUrl ??
    `${secondUrlBase}matomo.php`;

  return {
    siteId,
    urlBase,
    userId,
    trackerUrl,
    srcUrl,
    secondSiteId,
    secondTrackerUrl,
  };
}

const doWithMatomo = (fn, matomoTrackerId) => {
  if (__SERVER__) return;
  if (!_matomo[matomoTrackerId]) {
    const {
      siteId,
      urlBase,
      userId,
      trackerUrl,
      srcUrl,
      secondSiteId,
      secondTrackerUrl,
    } = getMatomoParams(matomoTrackerId);

    if (siteId) {
      /**
       * NOTE: check this link to see all the available options
       * https://www.npmjs.com/package/@datapunt/matomo-tracker-react
       */
      _matomo[matomoTrackerId] = createInstance({
        urlBase,
        siteId,
        userId,
        trackerUrl,
        srcUrl,
        // Add your own configuration
        ...(config.settings.matomo || {}),
      });

      if (secondSiteId) {
        _matomo[matomoTrackerId].pushInstruction(
          'addTracker',
          secondTrackerUrl,
          secondSiteId,
        );
      }
    } else {
      if (window.console) {
        /* eslint-disable-next-line */
        console.warn(
          'Matomo SiteID is not defined, page actions will not be tracked',
        );
      }
    }
  }

  console.log(matomoTrackerId);
  if (_matomo[matomoTrackerId]) fn(_matomo[matomoTrackerId]);
};

export const trackPageView = ({
  href,
  matomoTrackerId = 'instance',
  ...options
}) => {
  doWithMatomo((m) => {
    m.trackPageView({
      href,
      ...options,
    });
  }, matomoTrackerId);
};

export const setCustomUrl = (url, matomoTrackerId = 'instance') => {
  doWithMatomo((m) => {
    m.pushInstruction('setCustomUrl', url);
  }, matomoTrackerId);
};

export const trackEvent = (options, matomoTrackerId = 'instance') => {
  doWithMatomo((m) => {
    m.trackEvent(options);
  }, matomoTrackerId);
};

export const trackSiteSearch = (options, matomoTrackerId = 'instance') => {
  doWithMatomo((m) => {
    m.trackSiteSearch(options);
  }, matomoTrackerId);
};

export const trackLink = (options, matomoTrackerId = 'instance') => {
  doWithMatomo((m) => {
    m.trackLink(options);
  }, matomoTrackerId);
};

export const pushInstruction = (
  name,
  matomoTrackerId = 'instance',
  ...args
) => {
  doWithMatomo((m) => {
    m.pushInstruction(name, ...args);
  }, matomoTrackerId);
};
