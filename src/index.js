import { matomo } from './reducers';

const applyConfig = (config) => {
  config.addonReducers.matomo = matomo;

  return config;
};

export default applyConfig;
