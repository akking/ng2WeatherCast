import { FinalProjectCSC436Page } from './app.po';

describe('final-project-csc436 App', function() {
  let page: FinalProjectCSC436Page;

  beforeEach(() => {
    page = new FinalProjectCSC436Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
