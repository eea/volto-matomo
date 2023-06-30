import React from 'react';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';
import { trackPageView, trackSiteSearch } from './utils';
import { useSelector } from 'react-redux';

export const MatomoAppExtra = ({ location, content }) => {
  const title = content?.title;

  const href = flattenToAppURL(content?.['@id'] || '');
  const { search, query, pathname } = useSelector(
    (state) => state.router.location,
  );
  const baseUrl = getBaseUrl(pathname) || '';

  const extractSearchableText = (query) => {
    // Handle catalog-querystring-like queries, which are
    // send in a JSON object
    if (query?.query) {
      let parsed = JSON.parse(unescape(query.query));
      let items = parsed.filter((item) => item.i === 'SearchableText');
      if (items.length === 1) {
        return items[0].v;
      }
    }

    // check if there is an explicit SearchableText parameter
    // in the querystring
    if (query?.SearchableText) {
      return query.SearchableText;
    }

    return '';
  };
  React.useEffect(() => {
    const searchableText = extractSearchableText(query);
    if (href === pathname) {
      // a document (content)
      trackPageView({ href, documentTitle: title });
    }
    if (baseUrl !== pathname) {
      // a route (utility view)
      const action = pathname.split('/')[pathname.split('/').length - 1];
      trackPageView({ href: pathname, documentTitle: action });
    }
    if (search.includes('SearchableText') && searchableText) {
      trackSiteSearch({ keyword: searchableText });
    }
  }, [href, pathname, title, baseUrl, search, query]);

  return <React.Fragment />;
};

export default MatomoAppExtra;
