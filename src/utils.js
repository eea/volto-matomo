import { createInstance } from '@datapunt/matomo-tracker-react';
import config from '@plone/volto/registry';

/**
 * NOTE: this file exposes just a part of the Matomo React API. If you wish to
 * extend this file or to understand it better, this link may be helpful:
 * https://github.com/Amsterdam/matomo-tracker/tree/master/packages/react
 */

const _matomo = {};

const doWithMatomo = (fn) => {
  if (__CLIENT__) {
    if (!_matomo.instance) {
      const siteId =
        window.env?.RAZZLE_MATOMO_SITE_ID || config.settings.matomoSiteId;

      const urlBase =
        window.env?.RAZZLE_MATOMO_URL ||
        config.settings.matomoUrlBase ||
        'https://matomo.eea.europa.eu/';

      if (siteId) {
        _matomo.instance = createInstance({
          urlBase,
          siteId,
        });
      } else {
        /* eslint-disable-next-line */
        console.warn(
          'Matomo SiteID is not defined, page actions will not be tracked',
        );
      }
    }

    if (_matomo.instance) fn(_matomo.instance);
  }
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
