Feature('RFI history Page');

Before((I) => {
  I.amOnPage('/');
  I.waitForText('Don\'t have an account?', 3);
  I.fillField('.username-input', 'Sdt.Test');
  I.pressKey('Enter');
  I.waitForText('20-321', 10);
});

Scenario('Should be able to navigate to and exit the RFI history page', (I) => {
  I.click('.rfi-history-page-button');
  I.waitForText('Customer Rating');
  I.see('Product');
  I.see('RFI');
  I.click('.back-button');
  I.waitForText('Upload Product');
  I.dontSee('Customer Rating');
});

Scenario('Should display closed RFIs with product names', (I) => {
  I.click('.rfi-history-page-button');
  I.waitForText('Customer Rating');
  I.waitForText('20-327');
  I.see('20-328');
  I.see('20-329');
  I.see('20-330');

  // pause();

  within(locate('.historical-rfi-row').at(2), () => {
    I.see('doc-2.kml');
  });

  within(locate('.historical-rfi-row').at(3), () => {
    I.see('None');
  });
});

Scenario('Should display star ratings and feedback information', (I) => {
  I.amOnPage('/feedback/DGS-1-SDT-2020-00327');

  I.waitForText('RFI: DGS-1-SDT-2020-00327', 10);
  I.waitForElement('.star-container');

  within(locate('.star-container'), () => {
    I.click(locate('.star').at(3));
  });

  I.waitForText('Timeliness', 10);

  I.wait(2);

  I.click('Timeliness');
  I.waitForElement('.timeliness-menu-item', 10);
  I.pressKey('Enter');
  I.waitForText('Next, how was the...');
  I.see('Delivered Early');

  I.wait(1);

  I.click('Quality');
  I.waitForElement('.quality-menu-item', 10);
  I.pressKey('Enter');
  I.waitForText('High Quality', 10);

  I.wait(1);

  I.click('Mission Impact');
  I.waitForElement('.impact-menu-item');
  I.pressKey('Enter');
  I.wait(1);
  I.waitForText('High Impact', 10);
  I.dontSee('Next, how was the...');

  I.waitForText('Thank you for the feedback!');
  I.waitForElement('.comments-input');
  I.waitForElement('.submit-button');
  I.fillField('.comments-input-field', 'It was a pretty good one I suppose');
  I.click('.submit-button');
  I.waitForText('Thank you so much!');


  I.amOnPage('/');
  I.waitForElement('.rfi-history-page-button');
  I.click('.rfi-history-page-button');
  I.waitForText('Customer Rating');
  I.waitForText('20-327');

  within(locate('.historical-rfi-row').at(1), () => {
    I.seeNumberOfElements('.star-filled', 3);
    I.seeNumberOfElements('.star-empty', 2);
    I.dontSeeElement('.star-placeholder');
  });

  within(locate('.historical-rfi-row').at(2), () => {
    I.dontSeeElement('.star-filled');
    I.dontSeeElement('.star-empty');
    I.seeNumberOfElements('.dash', 5);
  });

  I.see('Customer Feedback');
  I.see('It was a pretty good one I suppose');

  I.see('How did we do?');
  I.see('Delivered Early');
  I.see('High Quality');
  I.see('High Impact');

  I.click(locate('.historical-rfi-row').at(2));

  I.waitForText('did not submit written feedback for this RFI.');
  I.see('No timeliness feedback was submitted.');
  I.see('No quality feedback was submitted.');
  I.see('No mission impact feedback was submitted.');
});

Scenario('Should display the RFI description container', (I) => {
  I.click('.rfi-history-page-button');
  I.waitForText('Customer Rating');
  I.waitForText('20-327');

  I.click(locate('.historical-rfi-row').at(2));

  I.waitForElement('.view-rfi-info-button');
  I.click('.view-rfi-info-button');

  I.waitForText('RFI Description');
  I.see('Justification');

  I.click('.view-feedback-button');
  I.waitForText('Customer Rating');
  I.waitForText('20-327');
  I.waitForElement('.view-rfi-info-button');
  I.click('.view-rfi-info-button');

  I.click('.download-button');
  I.waitForElement('.file-download-modal');
  I.click('.close-button');
  I.wait(1);
  I.waitForElement('.navigate-to-tgt-button');
  I.click('.navigate-to-tgt-button');
  I.waitForElement('.tgt-dash-container');
});
