import React from 'react';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';
import { trackPageView, trackSiteSearch } from './utils';
import { useSelector } from 'react-redux';

export const MatomoAppExtra = ({ location, content }) => {
  const title = content?.title;
  const pathname = location.pathname.replace(/\/$/, '');

  const href = flattenToAppURL(content?.['@id'] || '');
  const baseUrl = getBaseUrl(pathname) || '';
  const { search } = useSelector((state) => state.router.location);

  React.useEffect(() => {
    if (href === pathname) {
      // a document (content)
      trackPageView({ href, documentTitle: title });
    }
    if (baseUrl !== pathname) {
      // a route (utility view)
      const action = pathname.split('/')[pathname.split('/').length - 1];
      trackPageView({ href: pathname, documentTitle: action });
    }
    if (search.includes('?SearchableText=')) {
      const value = search.replace('?SearchableText=', '');
      trackSiteSearch({ keyword: value });
    }
  }, [href, pathname, title, baseUrl, search]);

  return <React.Fragment />;
};

export default MatomoAppExtra;
