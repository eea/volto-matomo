import React from 'react';
import { flattenToAppURL } from '@plone/volto/helpers';
import { trackPageView } from './utils';

export const MatomoAppExtra = (props) => {
  const href = React.useMemo(() => {
    return flattenToAppURL(props.content['@id']);
  }, [props.content]);

  React.useEffect(() => {
    trackPageView({ href });
  }, [href]);

  return <React.Fragment />;
};

export default MatomoAppExtra;
