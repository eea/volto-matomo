import React from 'react';
import { flattenToAppURL } from '@plone/volto/helpers';
import { trackPageView } from './utils';

export const MatomoAppExtra = (props) => {
  const url = React.useMemo(() => {
    return flattenToAppURL(props.content['@id']);
  }, [props.content]);

  React.useEffect(() => {
    trackPageView(url);
  }, [url]);

  return <React.Fragment />;
};

export default MatomoAppExtra;
