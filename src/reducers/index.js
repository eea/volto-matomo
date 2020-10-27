import { GET_CONTENT } from '@plone/volto/constants/ActionTypes';
import { createInstance } from '@datapunt/matomo-tracker-react';
import { settings } from '~/config';

export function matomo(state = {}, action = {}) {
  switch (action.type) {
    case `${GET_CONTENT}_SUCCESS`:
      if (__CLIENT__ && settings.matomoSiteId) {
        const matomoInstance = settings.matomoInstance || createInstance({
          urlBase: settings.matomoUrlBase || 'https://matomo.eea.europa.eu/',
          siteId: settings.matomoSiteId, // optional, default value: `1`
          // trackerUrl: 'https://LINK.TO.DOMAIN/tracking.php', // optional, default value: `${urlBase}matomo.php`
          // srcUrl: 'https://LINK.TO.DOMAIN/tracking.js', // optional, default value: `${urlBase}matomo.js`
        });

        const content = action.result;
        const rv = matomoInstance.trackPageView({
          documentTitle: content.title || 'untitled',
          href: content['@id']
            .replace(settings.apiPath, '')
            .replace(settings.internalApiPath, ''),
        });
        console.log('Y', { content, rv });
      }
      return state;
    default:
      return state;
  }
}

export default matomo;
