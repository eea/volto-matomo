import { createInstance } from '@datapunt/matomo-tracker-react';
import { matomo_reducer } from './reducers';

const applyConfig = (config) => {
  if (__CLIENT__ && config.settings.matomoSiteId) {
    const matomo = createInstance({
      urlBase: 'https://matomo.eea.europa.eu/',
      siteId: config.settings.matomoSiteId, // optional, default value: `1`
      // trackerUrl: 'https://LINK.TO.DOMAIN/tracking.php', // optional, default value: `${urlBase}matomo.php`
      // srcUrl: 'https://LINK.TO.DOMAIN/tracking.js', // optional, default value: `${urlBase}matomo.js`
    });

    config.settings.matomoInstance = matomo;
    config.addonReducers.matomo_reducer = matomo_reducer;
  }

  return config;
};

export default applyConfig;
