import { MatomoAppExtra } from './MatomoAppExtra';

const applyConfig = (config) => {
  config.settings.appExtras = [
    ...(config.settings.appExtras || []),
    {
      match: '',
      component: MatomoAppExtra,
    },
  ];

  return config;
};

export default applyConfig;
