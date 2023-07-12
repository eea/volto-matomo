import React from 'react';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';
import { trackPageView, setCustomUrl } from './utils';

export const MatomoAppExtra = ({ location, content }) => {
  const title = content?.title;
  const pathname = location.pathname.replace(/\/$/, '');
  const query = location?.search ?? '';

  const href = flattenToAppURL(content?.['@id'] || '');
  const baseUrl = getBaseUrl(pathname) || '';

  React.useEffect(() => {
    if (href === pathname) {
      // a document (content)
      trackPageView({ href: href + query, documentTitle: title });
      setCustomUrl(window.location.pathname.substr(1) + location.search);
    }
    if (baseUrl !== pathname) {
      // a route (utility view)
      const action = pathname.split('/')[pathname.split('/').length - 1];
      trackPageView({ href: pathname + query, documentTitle: action });
      setCustomUrl(window.location.pathname.substr(1) + location.search);
    }
  }, [href, pathname, title, baseUrl, query, location.search]);

  return <React.Fragment />;
};

export default MatomoAppExtra;
