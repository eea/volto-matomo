import { createInstance } from '@datapunt/matomo-tracker-react';
import config from '@plone/volto/registry';

/**
 * NOTE: this file exposes just a part of the Matomo React API. If you wish to
 * extend this file or to understand it better, this link may be helpful:
 * https://github.com/Amsterdam/matomo-tracker/tree/master/packages/react
 */

const _matomo = {};

const doWithMatomo = (fn) => {
  if (__SERVER__) return;
  if (!(_matomo.instance1 || _matomo.instance2)) {
    const siteId =
      window.env?.RAZZLE_MATOMO_SITE_ID || config.settings.matomoSiteId;

    const urlBase =
      window.env?.RAZZLE_MATOMO_URL ||
      config.settings.matomoUrlBase ||
      'https://matomo.eea.europa.eu/';

    const userId =
      window.env?.RAZZLE_MATOMO_USER_ID || config.settings.matomoUserId;

    const trackerUrl =
      window.env?.RAZZLE_MATOMO_TRACKER_URL ||
      config.settings.matomoTrackerUrl ||
      `${urlBase}matomo.php`;

    const srcUrl =
      window.env?.RAZZLE_MATOMO_SRC_URL ||
      config.settings.matomoSrcUrl ||
      `${urlBase}matomo.js`;

    const secondSiteId =
      window.env?.RAZZLE_MATOMO_SECOND_SITE_ID ||
      config.settings.matomoSecondSiteId;

    const secondUrlBase =
      window.env?.RAZZLE_SECOND_MATOMO_URL ||
      config.settings.matomoSecondUrlBase ||
      urlBase;

    const secondUserId =
      window.env?.RAZZLE_MATOMO_SECOND_USER_ID ||
      config.settings.matomoSecondUserId ||
      userId;

    const secondTrackerUrl =
      window.env?.RAZZLE_MATOMO_SECOND_TRACKER_URL ||
      config.settings.matomoSecondTrackerUrl ||
      trackerUrl;

    const secondSrcUrl =
      window.env?.RAZZLE_MATOMO_SECOND_SRC_URL ||
      config.settings.matomoSecondSrcUrl ||
      srcUrl;

    if (!(siteId || secondSiteId)) {
      if (window.console) {
        /* eslint-disable-next-line */
        console.warn(
          'Matomo SiteID is not defined, page actions will not be tracked',
        );
      }
      return;
    }

    if (siteId) {
      /**
       * NOTE: check this link to see all the available options
       * https://www.npmjs.com/package/@datapunt/matomo-tracker-react
       */
      _matomo.instance1 = createInstance({
        urlBase,
        siteId,
        userId,
        trackerUrl,
        srcUrl,
        // Add your own configuration
        ...(config.settings.matomo || {}),
      });
    }

    if (secondSiteId) {
      /**
       * NOTE: check this link to see all the available options
       * https://www.npmjs.com/package/@datapunt/matomo-tracker-react
       */
      _matomo.instance2 = createInstance({
        urlBase: secondUrlBase,
        siteId: secondSiteId,
        userId: secondUserId,
        trackerUrl: secondTrackerUrl,
        srcUrl: secondSrcUrl,
        // Add your own configuration
        ...(config.settings.matomo || {}),
      });
    }
  }

  if (_matomo.instance1) fn(_matomo.instance1);
  if (_matomo.instance2) fn(_matomo.instance2);
};

export const trackPageView = ({ href, ...options }) => {
  doWithMatomo((m) => {
    m.trackPageView({
      href,
      ...options,
    });
  });
};

export const trackEvent = (options) => {
  doWithMatomo((m) => {
    m.trackEvent(options);
  });
};

export const trackSiteSearch = (options) => {
  doWithMatomo((m) => {
    m.trackSiteSearch(options);
  });
};

export const trackLink = (options) => {
  doWithMatomo((m) => {
    m.trackLink(options);
  });
};

export const pushInstruction = (name, ...args) => {
  doWithMatomo((m) => {
    m.pushInstruction(name, ...args);
  });
};
