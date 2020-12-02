import React from 'react';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';
import { trackPageView } from './utils';

export const MatomoAppExtra = ({ location, content, ...rest }) => {
  const { pathname } = location;

  const href = flattenToAppURL(content['@id']);
  const title = content?.title;
  const baseUrl = getBaseUrl(pathname);
  // console.log(href, pathname, `-${baseUrl}-`, baseUrl.length);

  React.useEffect(() => {
    if (href === pathname) {
      // a document (content)
      console.log('track doc', { href, documentTitle: title });
      trackPageView({ href, documentTitle: title });
    }
    if (baseUrl && baseUrl !== pathname) {
      // a route (utility view)
      const action = pathname.split('/')[pathname.split('/').length - 1];
      console.log('action', { href: pathname, documentTitle: action });
      trackPageView({ href: pathname, documentTitle: action });
    }
  }, [href, pathname, title, baseUrl]);

  return <React.Fragment />;
};

export default MatomoAppExtra;
