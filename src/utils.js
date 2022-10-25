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
  if (!_matomo.instance) {
    const siteId =
      window.env?.RAZZLE_MATOMO_SITE_ID || config.settings.matomoSiteId;

    const urlBase =
      window.env?.RAZZLE_MATOMO_URL ||
      config.settings.matomoUrlBase ||
      'https://matomo.eea.europa.eu/';

    const userId =
      window.env?.RAZZLE_MATOMO_USER_ID || config.settings.matomoUserId;

    const trackerUrl =
      window.env?.RAZZLE_MATOMO_TRAKER_URL ||
      config.settings.matomoTrackerUrl ||
      `${urlBase}matomo.php`;

    const srcUrl =
      window.env?.RAZZLE_MATOMO_SRC_URL ||
      config.settings.matomoSrcUrl ||
      `${urlBase}matomo.js`;

    if (siteId) {
      /**
       * NOTE: check this link to see all the available options
       * https://www.npmjs.com/package/@datapunt/matomo-tracker-react
       */
      _matomo.instance = createInstance({
        urlBase,
        siteId,
        userId,
        trackerUrl,
        srcUrl,
        // Add your own configuration
        ...(config.settings.matomo || {}),
      });
    } else {
      /* eslint-disable-next-line */
      console.warn(
        'Matomo SiteID is not defined, page actions will not be tracked',
      );
    }
  }

  if (_matomo.instance) fn(_matomo.instance);
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
