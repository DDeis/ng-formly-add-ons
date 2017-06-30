import { FormlyTestPage } from './app.po';

describe('formly-test App', () => {
  let page: FormlyTestPage;

  beforeEach(() => {
    page = new FormlyTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
