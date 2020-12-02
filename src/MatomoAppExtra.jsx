import React from 'react';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';
import { trackPageView } from './utils';

export const MatomoAppExtra = ({ location, content, ...rest }) => {
  const { pathname } = location;

  const href = flattenToAppURL(content['@id']);
  const title = content?.title;
  const baseUrl = getBaseUrl(pathname) || '/';

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
  }, [href, pathname, title, baseUrl]);

  return <React.Fragment />;
};

export default MatomoAppExtra;
