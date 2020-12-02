Feature('Feedback Page');

Scenario('Should display the feedback page and star submittal reaction', (I) => {
  I.amOnPage('/feedback/DGS-1-SDT-2020-00321');

  I.waitForText('RFI: DGS-1-SDT-2020-00321', 10);
  I.waitForText('How did we do?');
  I.waitForText('RFI Description');
  I.waitForText('hello rfi');

  within(locate('.star-container'), () => {
    I.click(locate('.star').at(4));
  });

  I.waitForText('Thank You!');

  I.waitForText('If you have time, how was the...', 10);
  I.waitForText('Timeliness', 10);
  I.waitForText('Quality', 10);
  I.waitForText('Mission Impact', 10);

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

  I.waitForText('Thank you for the feedback!')
  I.seeElement('.comments-input');
  I.seeElement('.submit-button');

  I.click('.submit-button');
  I.waitForText('Thank you so much!');
});
