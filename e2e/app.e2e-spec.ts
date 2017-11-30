import { LassDriverPage } from './app.po';

describe('lass-driver App', () => {
  let page: LassDriverPage;

  beforeEach(() => {
    page = new LassDriverPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
