import * as matomoUtils from './utils';
import { createInstance } from '@datapunt/matomo-tracker-react';
import config from '@plone/volto/registry';

jest.mock('@datapunt/matomo-tracker-react', () => ({
  createInstance: jest.fn(),
}));

const mockInstance = {
  trackPageView: jest.fn(),
  trackEvent: jest.fn(),
  trackSiteSearch: jest.fn(),
  trackLink: jest.fn(),
  pushInstruction: jest.fn(),
};

global.__SERVER__ = false;

describe('Matomo module', () => {
  const originalConfig = JSON.parse(JSON.stringify(config));

  beforeEach(() => {
    jest.clearAllMocks();
    createInstance.mockReturnValue(mockInstance);
  });

  afterEach(() => {
    config.settings.matomoSiteId = originalConfig.settings?.matomoSiteId;
    config.settings.matomoSecondSiteId =
      originalConfig.settings?.matomoSecondSiteId;
  });

  it('should not create an instance or track a page view if siteId is not present', () => {
    config.settings.matomoSiteId = null;
    global.console = { warn: jest.fn() };

    matomoUtils.trackPageView({ href: '/test' });
    expect(createInstance).not.toHaveBeenCalled();
    expect(mockInstance.trackPageView).not.toHaveBeenCalled();
    // eslint-disable-next-line no-console
    expect(console.warn).toHaveBeenCalled();
  });

  it('should add a tracker if secondSiteId is present', () => {
    config.settings.matomoSiteId = 'siteeeeId';
    config.settings.matomoSecondSiteId = 'secondSiteId';
    matomoUtils.trackPageView({ href: '/test' });
    expect(createInstance).toHaveBeenCalled();

    expect(mockInstance.pushInstruction).toHaveBeenCalledWith(
      'addTracker',
      expect.any(String),
      'secondSiteId',
    );
  });

  it('should create an instance and track a page view if siteId is present', () => {
    config.settings.matomoSiteId = 'siteId';
    matomoUtils.trackPageView({ href: '/test' });
    expect(mockInstance.trackPageView).toHaveBeenCalledWith({
      href: '/test',
    });
  });

  it('should call trackEvent with the provided options', () => {
    const options = { category: 'category', action: 'action' };
    matomoUtils.trackEvent(options);
    expect(mockInstance.trackEvent).toHaveBeenCalledWith(options);
  });

  it('should call trackSiteSearch with the provided options', () => {
    const options = { keyword: 'keyword', category: 'category', count: 10 };
    matomoUtils.trackSiteSearch(options);
    expect(mockInstance.trackSiteSearch).toHaveBeenCalledWith(options);
  });

  it('should call trackLink with the provided options', () => {
    const options = { href: 'https://example.com' };
    matomoUtils.trackLink(options);
    expect(mockInstance.trackLink).toHaveBeenCalledWith(options);
  });

  it('should call pushInstruction with the provided name and args', () => {
    const name = 'addTracker';
    const args = ['url', 'siteId'];
    matomoUtils.pushInstruction(name, 123, ...args);
    expect(mockInstance.pushInstruction).toHaveBeenCalledWith(name, ...args);
  });

  it('should not do anything if __SERVER__ is true', () => {
    global.__SERVER__ = true;

    matomoUtils.trackPageView({ href: '/test' });
    expect(createInstance).not.toHaveBeenCalled();
  });
});
