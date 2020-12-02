/// <reference path="../steps.d.ts" />

Feature('Login Page');

Scenario ('Should be able to create an account', (I) => {
  //Try to log in without an account
  I.amOnPage('/');
  I.waitForText('Don\'t have an account?', 10);
  I.fillField('.username-input', 'billy.bob.joe');
  I.pressKey('Enter');
  I.waitForText('Account does not exist');

  //Go to and exit sign up screen
  I.click('.create-account-button');
  I.waitForText('Submit', 10);
  I.click('.cancel-create-account-button');
  I.waitForText('Don\'t have an account?', 10);

  //Sign up
  I.click('.create-account-button');
  I.fillField('.sign-up', 'billy.bob.joe!');
  I.waitForText('Invalid input', 10);
  I.pressKey('Backspace');
  I.pressKey('Enter');
  I.waitForText('Field cannot be empty', 10);
  I.pressKey('Tab');
  I.fillField('.sign-up-verify', 'billy.bob.joey');
  I.pressKey('Enter');
  I.waitForText('Does not match', 10);
  I.pressKey('Backspace');
  I.click('.submit-button');

  I.waitForText('RFI', 10);
});

Scenario('Should not be able to register an existing account', (I) => {
  I.amOnPage('/');
  I.waitForText('Don\'t have an account?', 10);
  I.click('.create-account-button');
  I.fillField('.sign-up', 'billy.bob.joe');
  I.pressKey('Tab');
  I.fillField('.sign-up-verify', 'billy.bob.joe');
  I.pressKey('Enter');
  I.waitForText('Account already exists', 10);
});

Scenario('Should be able to log in to an existing account', (I) =>{
  I.amOnPage('/');
  I.waitForText('Don\'t have an account?', 10);
  I.fillField('.username-input', 'billy.bob.joe');
  I.pressKey('Enter');

  I.waitForText('RFI', 10);
});
