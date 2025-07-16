import React from 'react';
import config from '@plone/volto/registry';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';
import { trackPageView } from './utils';

export const MatomoAppExtra = ({ location, content }) => {
  const title = content?.title;
  const pathname = location.pathname.replace(/\/$/, '');
  const query = location?.search ?? '';

  const href = flattenToAppURL(content?.['@id'] || '');
  const baseUrl = getBaseUrl(pathname) || '';

  const matomoTrackerId = config.settings.matomoTrackerIdFn
    ? config.settings.matomoTrackerIdFn(pathname)
    : undefined;

  React.useEffect(() => {
    if (href === pathname) {
      // a document (content)
      trackPageView({
        href: href + query,
        documentTitle: title,
        matomoTrackerId,
      });
    }
    if (baseUrl !== pathname) {
      // a route (utility view)
      const action = pathname.split('/')[pathname.split('/').length - 1];
      trackPageView({
        href: pathname + query,
        documentTitle: action,
        matomoTrackerId,
      });
    }
  }, [href, pathname, title, baseUrl, query, matomoTrackerId]);

  return <React.Fragment />;
};

export default MatomoAppExtra;
