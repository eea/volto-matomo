import { createInstance } from '@datapunt/matomo-tracker-react';
import { settings } from '~/config';

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
        window.env?.RAZZLE_MATOMO_SITE_ID || settings.matomoSiteId || 1;

      const urlBase =
        window.env?.RAZZLE_MATOMO_URL ||
        settings.matomoUrlBase ||
        'https://matomo.eea.europa.eu/';

      _matomo.instance = createInstance({
        urlBase,
        siteId,
      });
    }

    fn(_matomo.instance);
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
