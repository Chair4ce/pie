Feature('SCOI Page');

Before((I) => {
  I.amOnPage('/');
  I.waitForText('Don\'t have an account?', 3);
  I.fillField('.username-input', 'Sdt.Test');
  I.pressKey('Enter');
  I.waitForText('20-321', 10);
});

Scenario('Should be able to navigate to and exit the SCOI page', (I) => {
  I.click('.scoi-page-button');
  I.waitForText('SCOI');
  I.see('MGRS');
  I.see('Notes');
  I.click('.back-button');
  I.waitForText('Upload Product');
  I.dontSee('SCOI');
});

Scenario('Should be able see and toggle info', (I) => {
  //  Add an association
  //go to tgt page
  I.click(locate('.rfi-row').at(3));
  I.waitForElement('.navigate-to-tgt-button');
  I.click('.navigate-to-tgt-button');
  I.waitForText('RFI DESCRIPTION:', 3);
  //add date
  I.see('Input or select a coverage date for your targets');
  I.click('.add-date-button');
  I.click('Cancel');
  I.fillField('input', '02012020');
  I.waitForText('TGT ID', 10);
  //add tgt
  I.waitForElement('.add-tgt-button', 5);
  I.click('.add-tgt-button');
  I.waitForElement('.mgrs', 3);
  I.fillField('.mgrs', '12QWE1231231231');
  I.pressKey('Enter');
  //go to ixn page
  I.waitForElement('.exploitation');
  I.click('.exploitation');
  //add segment
  I.fillField('.segment-start', '12');
  I.pressKey('Tab');
  I.fillField('.segment-end', '12304');
  I.pressKey('Enter');
  //add ixn
  I.waitForElement('.exploit-analyst');
  I.fillField('.exploit-analyst', 'Sdt.Test');
  I.pressKey('Tab');
  I.fillField('.time', '121');
  I.pressKey('Tab');
  I.fillField('.activity', 'Person entered SCOI');
  I.pressKey('Enter');
  I.waitForText('12:10:00Z', 3);
  //add track w/ scoi name
  I.waitForElement('.status-wrapper');
  I.moveCursorTo('.status-wrapper');
  I.waitForElement('.in-progress-button');
  I.click('.in-progress-button');
  I.waitForElement('.track-narrative-button');
  I.click('.track-narrative-button');
  I.waitForText('Copy to Clipboard');
  I.fillField('.track-narrative-input',
              'This is the track narrative that references OPN20-S0099');
  I.waitForElement('.mgrs-input');
  I.fillField('.mgrs-input', '99ASD1234567890');
  I.click('.submit-button');
  I.waitForElement('.scoi-chip');

  I.click('.save');
  I.waitForText('Track Narrative Saved');
  I.wait(1);
  I.dontSee('Copy to Clipboard');
  //go to scoi page
  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI DESCRIPTION:', 3);
  I.click('.tgt-dash--header--back-button');
  I.waitForText('Justification', 10);

  I.click('.scoi-page-button');
  I.waitForText('OPN20-S0099');
  I.see('99ASD1234567890');
  I.pressKey('ArrowDown');

  I.waitForText('RFI: 20-335', 10);
  I.see('sunt in culpa qui officia deserunt mollit anim id es laborum');

  //RFI associations toggle
  I.click(locate('.rfi-associations-button').last());
  I.wait(1);
  I.dontSee('RFI: 20-335');
  I.dontSee(
    'sunt in culpa qui officia deserunt mollit anim id es laborum');

  //TGT associations toggle
  I.waitForText('20-000');
  I.see('12QWE1231231231');
  I.see('POC: Sdt.Test@mail.smil.mil');

  I.click(locate('.tgt-associations-button').last());
  I.wait(1);
  I.dontSee('20-000');
  I.dontSee('12QWE1231231231');
  I.dontSee('POC');

  //IXN associations toggle
  within('.callout-associations', () => {
    I.waitForText('Person entered SCOI');
  });

  I.click(locate('.callout-associations-button').last());
  I.wait(1);
  I.dontSeeElement('.callout-associations');

  //Track associations toggle
  I.waitForText('Person entered SCOI');
  I.dontSee('This is the track narrative that references OPN20-S0099');
  I.click('.callout');
  I.waitForText('This is the track narrative that references OPN20-S0099');

  I.click(locate('.track-associations-button').last());
  I.wait(1);
  I.dontSee('Person entered SCOI');
  I.dontSee('This is the track narrative that references OPN20-S0099');
});

Scenario('Should be able to add notes', (I) => {
  I.click('.scoi-page-button');
  I.waitForText('SCOI');
  I.waitForElement('.scoi-row-right');
  I.click('.scoi-row-right');
  I.waitForElement('.note-input');
  I.fillField('.note-input', 'These are some notes');
  I.pressKey('Enter');
  I.wait(1);
  I.dontSeeElement('.note-input');
  I.dontSee('These are some notes');
  I.click('.scoi-row-right');
  I.waitForElement('.note-input');
  I.seeInField('.note-input', 'These are some notes');
});
