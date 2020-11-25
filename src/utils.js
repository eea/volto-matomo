import { createInstance } from '@datapunt/matomo-tracker-react';
import { settings } from '~/config';

const _matomo = {};

export const trackPageView = (pathname) => {
  if (__CLIENT__) {
    const siteId =
      window.env?.RAZZLE_MATOMO_SITE_ID || settings.matomoSiteId || 1;
    const urlBase =
      window.env?.RAZZLE_MATOMO_URL ||
      settings.matomoUrlBase ||
      'https://matomo.eea.europa.eu/';

    if (!_matomo.instance) {
      _matomo.instance = createInstance({
        urlBase,
        siteId,
      });
    }

    const href = pathname;

    _matomo.instance.trackPageView({
      href,
    });

    // console.log('HREF', href);
  }
};
