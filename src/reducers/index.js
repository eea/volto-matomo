import { GET_CONTENT } from '@plone/volto/constants/ActionTypes';
import { settings } from '~/config';

export function matomo_reducer(state = {}, action = {}) {
  switch (action.type) {
    case `${GET_CONTENT}_SUCCESS`:
      if (__CLIENT__) {
        const content = action.result;
        settings.matomoInstance.trackPageView({
          documentTitle: content.title || 'untitled',
          href: content['@id']
            .replace(settings.apiPath, '')
            .replace(settings.internalApiPath, ''),
        });
      }
      return state;
    default:
      return state;
  }
}

export default matomo_reducer;
