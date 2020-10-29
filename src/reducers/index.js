import { createInstance } from '@datapunt/matomo-tracker-react';
import { settings } from '~/config';

const _matomo = {};

export function matomo(state = {}, action = {}) {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
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

        const href = action.payload?.location?.pathname || '';

        _matomo.instance.trackPageView({
          href,
        });
      }
      return state;
    default:
      return state;
  }
}

export default matomo;
