/// <reference path="../steps.d.ts" />

Feature('RFI Page');

Before((I) => {
  I.amOnPage('/');
  I.waitForText('Don\'t have an account?', 10);
  I.fillField('.username-input', 'Sdt.Test');
  I.pressKey('Enter');
});

Scenario('Should see the RFI page with clickable GETS buttons', (I) => {
  I.waitForText('20-325', 10);
  I.see('RFI');
  I.see('633d');
  I.see('USA');
  I.see('4 FEB 20');
  I.see('RFI Description');
  I.click('.gets-button');
  I.wait(1);
});

Scenario('Should be able to sort by clicking buttons', (I) => {
  I.waitForText('20-321', 10);

  I.see('-', locate('.region--new').find('.rfi-row').at(1));
  I.click('.header-cell--ltiov');
  I.see('4 FEB 20', locate('.region--new').find('.rfi-row').at(1));

  I.click('.header-cell--country');
  I.see('CAN', locate('.region--new').find('.rfi-row').at(1));
  I.click('.header-cell--country');
  I.see('USA', locate('.region--new').find('.rfi-row').at(1));

  I.click('.header-cell--customerUnit');
  I.see('1 FW', locate('.region--new').find('.rfi-row').at(1));
  I.click('.header-cell--customerUnit');
  I.see('HQ ACC', locate('.region--new').find('.rfi-row').at(1));
});

Scenario('Should be able to select RFIs and see descriptions', (I) => {
  I.waitForText('RFI', 10);
  I.see('RFI Description');
  I.see('Lorem ipsum dolor sit amet');
  I.see('Justification');
  I.see('This is a justification.');
  I.see('Customer Information');
  I.see('Fireman Apprentice Boonty, Thomas');
  I.click(locate('.rfi-row').at(2));
  I.waitForText('in culpa qui officia deserunt mollit anim id es laborum.');
});

Scenario('Should have upload file buttons that allow file upload', (I) => {
  I.waitForText('RFI', 10);
  I.waitForElement('.upload-button');
  I.waitForText('Upload Product');
  I.click('.upload-button');
  I.waitForText('Drag and drop KML file here');
  I.waitForText('Browse');
});

Scenario('Should have a button to copy feedback link to clipboard', (I) => {
  I.waitForText('20-321', 10);
  I.click(locate('.rfi-row').at(14));
  I.waitForElement('.copy-link');
  I.click('.copy-link');
  I.waitForText('Feedback Link Copied to Clipboard');
});

Scenario('Should display file options when file is associated with product', (I) => {
  I.waitForText('20-321', 10);
  I.click(locate('.rfi-row').at(14));
  I.waitForElement('.download-button');
  I.click('.download-button');
  I.waitForText('Download');
});

Scenario('Should display confirmation modal for deletion and test both buttons', (I) => {
  I.waitForText('20-321', 10);
  I.click(locate('.rfi-row').at(14));
  I.waitForElement('.download-button');
  I.click('.download-button');
  I.waitForElement('.delete-button');
  I.click('.delete-button');
  I.waitForText('Delete this file?', 10);

  I.click('.modal-no');
  I.waitForElement('.delete-button');
  I.click('.delete-button');
  I.waitForText('Delete this file?', 10);

  I.click('.modal-yes');
  I.waitForText('doc-1.kml Deleted');
});

