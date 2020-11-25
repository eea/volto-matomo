import { trackPageView } from '../utils';

export function matomo(state = {}, action = {}) {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      trackPageView({ href: action.payload?.location?.pathname || '' });
      return state;
    default:
      return state;
  }
}

export default matomo;
