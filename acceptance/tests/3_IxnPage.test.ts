/// <reference path="../steps.d.ts" />

Feature('Ixn Page');

Before((I) => {
  I.amOnPage('/');
  I.waitForText('Don\'t have an account?', 3);
  I.fillField('.username-input', 'Sdt.Test');
  I.pressKey('Enter');
  I.waitForText('20-321', 10);
  I.click(locate('.rfi-row').at(2));
  I.waitForElement('.navigate-to-tgt-button');
  I.click('.navigate-to-tgt-button');
  I.waitForText('RFI DESCRIPTION:', 3);
});

Scenario('Should be able to navigate to and exit the interactions page', (I) => {
  I.click('.add-date-button');
  I.click('Cancel');

  I.fillField('input', '02012020');

  I.waitForText('TGT ID', 3);

  I.click('.add-tgt-button');
  I.fillField('.mgrs', '12QWE1231231231');
  I.pressKey('Enter');

  I.waitForElement('.exploitation');
  I.click('.exploitation');
  I.waitForText('MGRS: 12QWE1231231231', 3);
  I.waitForText('Date: 02/01/2020', 3);

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI DESCRIPTION:', 3);
});

Scenario('Should be able to add, undo adding, and cancel adding segments', (I) => {
  I.waitForElement('.exploitation');
  I.click('.exploitation');
  I.waitForText('MGRS: 12QWE1231231231', 3);

  //Add
  I.fillField('.segment-start', '12');
  I.pressKey('Tab');
  I.fillField('.segment-end', '12304');
  I.pressKey('Enter');

  //Undo Add
  I.waitForText('Created');
  I.click('.undo-button');
  I.dontSee('12:00:00Z');

  //redo add
  I.fillField('.segment-start', '12');
  I.pressKey('Tab');
  I.fillField('.segment-end', '12304');
  I.pressKey('Enter');
  I.waitForText('Created');
  I.waitForElement('.dismiss-snackbar');
  I.click('.dismiss-snackbar');

  I.waitForText('12:00:00Z');
  I.waitForText('12:30:40Z');
  I.dontSee('.segment-input-container');

  //Cancel add
  I.click('.add-segment-button');
  I.fillField('.segment-start', '13');
  I.pressKey('Tab');
  I.fillField('.segment-end', '133');
  I.click('.cancel-add-segment');

  I.waitForElement('.navigate-modal');
  I.click('.modal-no');
  I.waitForElement('.segment-input-container');

  I.waitForElement('.cancel-add-segment', 3);
  I.click('.cancel-add-segment');

  I.waitForElement('.navigate-modal', 10);
  I.click('.modal-yes');

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI DESCRIPTION:', 3);
  I.click('.exploitation');
  I.waitForText('MGRS: 12QWE1231231231', 3);
  I.dontSee('13:00:00Z');
});

Scenario('Should be able to add ixns', (I) => {
  I.waitForElement('.exploitation');
  I.click('.exploitation');
  I.waitForText('MGRS: 12QWE1231231231', 3);

  I.pressKey('Tab');
  I.fillField('.exploit-analyst', 'Billy Bob Joe');
  I.pressKey('Tab');
  I.fillField('.time', '121');
  I.pressKey('Tab');
  I.fillField('.activity', 'Person entered tgt from right side');
  I.pressKey('Enter');
  I.waitForText('12:10:00Z', 3);
  I.waitForText('Billy Bob Joe', 3);
  I.waitForText('Person entered tgt from right side', 3);

  I.fillField('.time', '1215');
  I.pressKey('Tab');
  I.pressKey('Tab');
  I.pressKey('Tab');
  I.waitForText('12:15:00Z', 3);

  I.fillField('.time', '13');
  I.pressKey('Tab');
  I.waitForText('The time you entered does not fall within the segment timeline', 3);
});

Scenario('Should be able to see Tgt and Ixn counts on the RFI Description page', (I) => {
  I.waitForElement('.tgt-dash--header--back-button');
  I.click('.tgt-dash--header--back-button');

  I.waitForText('TGTs', 3);
  I.see('C/Os');
  within(locate('.rfi-row').at(2), () => {
    I.see('1', locate('.cell--count').at(1));
    I.see('2', locate('.cell--count').at(2));
  });
});

Scenario('Should be able to edit ixns', (I) => {
  I.waitForElement('.exploitation');
  I.click('.exploitation');
  I.waitForText('MGRS: 12QWE1231231231', 3);

  I.doubleClick('.exploit-analyst');
  I.pressKey('Tab');
  I.fillField('.time', '121030');
  I.pressKey('Tab');
  I.pressKey('Tab');
  I.fillField('.track-analyst', 'Giuseppe Alfredo');
  I.pressKey('Enter');

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI DESCRIPTION:', 3);
  I.click('.exploitation');

  I.waitForText('12:10:30Z');
  I.see('Giuseppe Alfredo');
  I.dontSee('12:10:00Z');

  I.doubleClick('.exploit-analyst');
  I.pressKey('Tab');
  I.fillField('.time', '121133');
  I.pressKey('Tab');
  I.click('.cancel-edit-ixn-button');

  I.waitForElement('.navigate-modal');
  I.wait(1);
  I.click('.modal-no');

  I.wait(1);
  I.click('.cancel-edit-ixn-button');

  I.waitForElement('.navigate-modal');
  I.click('.modal-yes');

  I.wait(1);

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI DESCRIPTION:', 3);
  I.click('.exploitation');
  I.waitForText('12:10:30Z');
  I.dontSee('12:11:33Z');
});

Scenario('Should be able to assign status, edit track narratives, and see tracks generate', (I) => {
  I.waitForElement('.exploitation');
  I.click('.exploitation');
  I.waitForText('MGRS: 12QWE1231231231', 3);

  I.moveCursorTo(locate('.status-wrapper').at(2));
  I.waitForElement('.in-progress-button');
  I.click('.in-progress-button');

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI DESCRIPTION:', 3);
  I.click('.exploitation');

  I.waitForText('In Progress', 3);
  I.waitForText('-001');

  I.moveCursorTo(locate('.status-wrapper').at(1));
  I.waitForElement('.completed-button');
  I.click('.completed-button');

  I.waitForElement('.navigate-modal');
  I.waitForElement('.modal-no');
  I.click('.modal-no');

  within(locate('.ixn-row').at(1), () => {
    I.dontSee('Complete');
  });

  I.moveCursorTo(locate('.status-wrapper').at(1));
  I.waitForElement('.completed-button');
  I.click('.completed-button');

  I.waitForElement('.navigate-modal');
  I.waitForElement('.modal-yes');
  I.click('.modal-yes');

  within(locate('.ixn-row').at(1), () => {
    I.waitForText('Complete');
  });

  within(locate('.ixn-row').at(1), () => {
    I.see('Complete', '.status-wrapper');
    I.see('-001', '.track');
  });

  within(locate('.ixn-row').at(2), () => {
    I.see('In Progress', '.status-wrapper');
    I.see('-002', '.track');
  });

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI DESCRIPTION:', 3);
  I.click('.exploitation');

  I.waitForText('Complete', 3);
  I.waitForText('-001');
  I.waitForText('-002');

  I.moveCursorTo(locate('.status-wrapper').at(2));
  I.waitForElement('.does-not-meet-eei-button');
  I.click('.does-not-meet-eei-button');

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI DESCRIPTION:', 3);
  I.click('.exploitation');

  I.waitForText('EEI', 3);
  within(locate('.ixn-row').at(2), () => {
    I.dontSee('Complete');
  });
  I.dontSee('-002');
});

Scenario('Should be able to write and view track narratives', (I) => {
  I.waitForElement('.exploitation');
  I.click('.exploitation');
  I.waitForText('Status', 3);

  I.click('.track-narrative-button');
  I.waitForText('Copy to Clipboard');

  I.fillField('.track-narrative',
              '3 already present PERS were in the CY S of BLDG 1. 2 Pers entered the S entrance of ' +
                'BLDG 1 and 1 PERS entered the W entrance of BLDG 2.');
  I.pressKey('Enter');
  I.fillField('.track-narrative', '02:11Z - 1 PERS entered the N entrance of BLDG 20 (exited S entrance of BLDG 9 at ' +
    '02:10:11).');

  I.pressKey('ArrowDown');
  I.pressKey('ArrowDown');
  I.pressKey('ArrowDown');
  I.pressKey('Enter');
  I.pressKey('Enter');

  I.fillField('.track-narrative', 'Analyst Note: Track stopped due to VEH exiting coverage area.');

  I.click('.save');
  I.waitForText('Track Narrative Saved');
  I.dontSee('Copy to Clipboard');

  I.click('.track-narrative-button');
  I.waitForText('Copy to Clipboard');
  I.seeInField('.track-narrative-input', '2 Pers entered the S entrance of BLDG 1');
  I.seeInField('.track-narrative-input', 'Track stopped due to VEH exiting coverage area');

  I.fillField('.track-narrative', 'DO NOT SAVE THIS');
  I.click('.cancel');

  I.waitForElement('.navigate-modal');
  I.click('.modal-no');

  I.seeInField('.track-narrative-input', 'DO NOT SAVE THIS');

  I.click('.cancel');
  I.waitForElement('.navigate-modal');
  I.click('.modal-yes');

  I.dontSee('Copy to Clipboard');

  I.click('.track-narrative-button');
  I.waitForText('Copy to Clipboard');
  I.dontSeeInField('.track-narrative-input', 'DO NOT SAVE THIS');
});

Scenario('Should indicate SCOIs entered in the track narrative', (I) => {
  I.waitForElement('.exploitation');
  I.click('.exploitation');
  I.waitForText('Status', 3);

  I.click('.track-narrative-button');
  I.waitForText('Copy to Clipboard');

  I.dontSeeElement('.scoi-queue');

  //Enter new SCOI with MGRS
  I.clearField('.track-narrative-input');
  I.fillField('.track-narrative-input',
              'OPN20-S0123');
  I.waitForElement('.mgrs-modal');
  I.waitForText('Type MGRS coordinates below');

  //cancel
  I.click('.cancel-mgrs-input');
  I.wait(1);
  I.dontSee('OPN20-S0123');

  //Add MGRS
  I.clearField('.track-narrative-input');
  I.fillField('.track-narrative-input',
              'OPN20-S0123');
  I.waitForElement('.mgrs-modal');
  I.waitForText('Type MGRS coordinates below');
  I.fillField('.mgrs-input', '12QWE123123123123');
  I.waitForText('Please use the format “##XXX##########” for MGRS');
  I.clearField('.mgrs-input');
  I.fillField('.mgrs-input', '12QWE1234567890');
  I.click('.submit-button');

  I.waitForElement('.scoi-queue');
  within('.scoi-queue', () => {
    I.see('OPN20-S0123');
  });

  I.moveCursorTo('.scoi-chip', 5, 5);
  I.waitForText('12QWE1234567890');

  I.click('.expand-collapse-scois');
  I.wait(1);
  within('.scoi-container', () => {
    I.dontSeeElement('.scoi-queue');
    I.dontSee('OPN20-S0123');
  });
  I.click('.expand-collapse-scois');
  I.waitForElement('.scoi-chip');

  //Don't save
  I.click('.cancel');
  I.waitForElement('.navigate-modal');
  I.click('.modal-yes');

  I.dontSee('Copy to Clipboard');

  //Enter the same SCOI again and see MGRS pull from backend
  I.click('.track-narrative-button');
  I.waitForText('Copy to Clipboard');

  I.dontSeeElement('.scoi-queue');

  I.clearField('.track-narrative-input');
  I.fillField('.track-narrative-input',
              'OPN20-S0123');
  I.waitForElement('.scoi-chip');
  within('.scoi-queue', () => {
    I.see('OPN20-S0123');
  });

  I.moveCursorTo('.scoi-chip', 5, 5);
  I.waitForText('12QWE1234567890');
});

Scenario('Should be able to add, undo add, and view analyst notes', (I) => {
  I.click('.exploitation');
  I.waitForText('MGRS: 12QWE1231231231', 3);

  I.click('.note-button');
  I.waitForElement('.note-input');
  I.fillField('.note-input', 'These are some notes about an ixn');
  I.pressKey('Enter');
  I.waitForText('Analyst Note Saved');

  I.click('.note-button');
  I.waitForElement('.note-input');
  I.seeInField('.note-input', 'These are some notes about an ixn');
  I.click('.undo-button');

  I.click('.note-button');
  I.waitForElement('.note-input');
  I.dontSee('These are some notes about an ixn');
  I.fillField('.note-input', 'These are some notes about an ixn');
  I.pressKey('Enter');
  I.waitForText('Analyst Note Saved');
  I.click('.dismiss-snackbar');
});

Scenario('Should be able to write and view rollups', (I) => {
  I.waitForElement('.exploitation');
  I.click('.exploitation');
  I.waitForText('Status', 3);
  I.click('.rollup-button');

  I.waitForText('Copy to Clipboard');
  I.waitForElement('.rollup-input');
  I.see('Activity Rollup');
  I.see('01FEB20');
  I.seeInField('.rollup-input', 'Note:');
  I.see('12:00:00Z');
  I.see('12:30:40Z');
  I.see('12:10:30Z');
  I.see('Person entered tgt from right side');
  I.see('12:15:00Z');

  I.click(locate('.import-checkbox').at(2));
  I.click('.import-rollup-button');
  I.waitForElement('.rollup-input');
  I.seeInField('.rollup-input', '12:15:00Z -');

  I.click(locate('.import-checkbox').at(1));
  I.click('.import-rollup-button');
  I.waitForElement('.rollup-input');
  I.seeInField('.rollup-input', '12:10:30Z - Person entered tgt from right side\n\n12:15:00Z -');

  I.click('.save');
  I.waitForText('Rollup Saved');
  I.dontSee('Copy to Clipboard');

  I.click('.rollup-button');
  I.waitForText('Copy to Clipboard');
  I.seeInField('.rollup-input', '12:10:30Z - Person entered tgt from right side\n\n12:15:00Z -');

  I.fillField('.rollup', 'DO NOT SAVE THIS');
  I.click('.rollup-close-button');
  I.dontSee('Copy to Clipboard');

  I.click('.rollup-button');
  I.waitForText('Copy to Clipboard');
  I.dontSeeInField('.rollup-input', 'DO NOT SAVE THIS');

  I.click('.rollup-mode-toggle-button');
  I.waitForElement('.rollup-input');

  I.see('Activity Rollup');
  I.see('01FEB20');
  I.seeInField('.rollup-input', '1200Z - 1230Z:');
  I.seeInField('.rollup-input', 'Note:');
  I.dontSeeInField('.rollup-input', '12:10:30Z - Person entered tgt from right side\n\n12:15:00Z -');

  I.fillField('.rollup', 'Some things happened within this half hour block of time');

  I.click('.save');
  I.waitForText('Rollup Saved');
  I.dontSee('Copy to Clipboard');

  I.click('.rollup-button');
  I.waitForText('Copy to Clipboard');
  I.seeInField('.rollup-input', '12:10:30Z - Person entered tgt from right side\n\n12:15:00Z -');

  I.click('.rollup-mode-toggle-button');
  I.waitForElement('.rollup-input');

  I.seeInField('.rollup-input', 'Some things happened within this half hour block of time');

  I.fillField('.rollup', 'DO NOT SAVE THIS');
  I.click('.rollup-close-button');
  I.dontSee('Copy to Clipboard');

  I.click('.rollup-button');
  I.waitForText('Copy to Clipboard');

  I.click('.rollup-mode-toggle-button');
  I.waitForElement('.rollup-input');

  I.dontSeeInField('.rollup-input', 'DO NOT SAVE THIS');
});

Scenario('Should be able to accept and reject tracks', (I) => {
  I.waitForElement('.exploitation');
  I.click('.exploitation');
  I.waitForText('MGRS: 12QWE1231231231', 3);

  I.moveCursorTo(locate('.status-wrapper').at(1));
  I.waitForElement('.completed-button');
  I.click('.completed-button');

  I.waitForElement('.approve-reject-button', 3);
  I.click('.reject-button');
  I.waitForElement('.reject-modal', 3);
  I.click('.cancel-button');
  I.wait(1);
  I.dontSee('.rejected-icon');

  I.click('.reject-button');
  I.waitForElement('.reject-modal', 3);
  I.fillField('.reject-modal', 'This is a bad ixn');
  I.click('.submit-button');

  I.waitForText('Reason saved successfully');
  I.see('Test');

  I.click('.note-button');
  I.waitForElement('.note-input');
  I.seeInField('.note-input', 'This is a bad ixn');
  I.pressKey('Enter');

  I.moveCursorTo(locate('.status-wrapper').at(1));
  I.waitForElement('.completed-button');
  I.click('.completed-button');

  I.waitForElement('.approve-reject-button', 3);
  I.click('.approve-button');
  //last name of the user sdt.test
  I.waitForElement('.accept-icon');
  I.waitForText('Test');
});

Scenario('Should indicate whether RFIs and targets have rejected tracks', (I) => {
  I.waitForElement('.add-tgt-button');
  I.click('.add-tgt-button');
  I.fillField('.mgrs', '12QWE1231231232');
  I.pressKey('Enter');

  I.click('.exploitation');
  I.waitForText('MGRS: 12QWE1231231231', 3);

  I.click('.approved-button');
  I.waitForElement('.reject-modal', 3);
  I.fillField('.reject-modal', 'This is a bad ixn');
  I.click('.submit-button');

  I.waitForText('Reason saved successfully');
  I.see('Test');

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI DESCRIPTION:', 3);
  I.waitForElement('.red-border', 6);

  within(locate('.tgt-row-left').at(1), () => {
    I.seeElement('.reject-arrow');
  });

  within(locate('.tgt-row-left').at(2), () => {
    I.dontSeeElement('.reject-arrow');
  });

  I.click('.tgt-dash--header--back-button');
  I.waitForText('LTIOV', 10);
  I.waitForElement('.red-border', 6);

  within(locate('.rfi-row-container').at(1), () => {
    I.dontSeeElement('.reject-arrow');
  });

  within(locate('.rfi-row-container').at(2), () => {
    I.seeElement('.reject-arrow');
  });
});

Scenario('Should be able to delete ixns and undo an ixn delete', (I) => {
  I.waitForElement('.exploitation');
  I.click('.exploitation');
  I.waitForText('MGRS: 12QWE1231231231', 3);

  //Delete first ixn
  I.moveCursorTo('.smallbord-container');
  I.wait(1);
  I.moveCursorTo('.ixn-row');
  I.waitForElement('.delete-ixn-button');
  I.click('.delete-ixn-button');

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI DESCRIPTION:', 3);
  I.click('.exploitation');

  I.dontSee('Person entered tgt from right side');

  //Delete second ixn and undo
  I.moveCursorTo('.smallbord-container');
  I.wait(1);
  I.moveCursorTo('.ixn-row');
  I.waitForElement('.delete-ixn-button');
  I.click('.delete-ixn-button');

  I.waitForText('Interaction deleted', 3);

  I.click(locate('.undo-button'));

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI DESCRIPTION:', 3);
  I.click('.exploitation');

  I.waitForText('Person entered tgt from right side', 3);

  //Delete second ixn
  I.moveCursorTo('.smallbord-container');
  I.wait(1);
  I.moveCursorTo('.ixn-row');
  I.waitForElement('.delete-ixn-button');
  I.click('.delete-ixn-button');

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI DESCRIPTION:', 3);
  I.click('.exploitation');

  I.dontSee('Person entered tgt from right side');

  //Clear entered data with cancel button on input row
  I.pressKey('Tab');
  I.fillField('.exploit-analyst', 'Billy Bob Joe');
  I.pressKey('Tab');
  I.click('.cancel-edit-ixn-button');

  I.wait(1);

  I.dontSee('Billy Bob Joe');
});

Scenario('Should be able to edit and cancel editing segments', (I) => {
  I.waitForElement('.exploitation');
  I.click('.exploitation');
  I.waitForText('MGRS: 12QWE1231231231', 3);

  I.click('.edit-segment');
  I.fillField('.segment-start', '110000');

  I.click('.cancel-add-segment');
  I.waitForElement('.navigate-modal');
  I.wait(1);
  I.click('.modal-no');

  I.wait(1);

  I.click('.cancel-add-segment');
  I.waitForElement('.navigate-modal');
  I.click('.modal-yes');

  I.dontSee('11:00:00');

  I.click('.edit-segment');
  I.fillField('.segment-start', '110000');
  I.pressKey('Tab');
  I.fillField('.segment-end', '120000');
  I.wait(1);
  I.pressKey('Enter');

  I.wait(1);
  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI DESCRIPTION:', 3);
  I.click('.exploitation');

  I.waitForText('11:00:00Z');
  I.waitForText('12:00:00Z');
});

Scenario('Should be able to delete segments and undo segment delete', (I) => {
  I.waitForElement('.exploitation');
  I.click('.exploitation');
  I.waitForText('MGRS: 12QWE1231231231', 3);

  //Delete segment w/o interactions and undo
  I.click('.delete-segment');

  I.waitForText('You deleted 11:00:00Z-12:00:00Z', 3);

  I.click('.undo-button');

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI DESCRIPTION:', 3);
  I.click('.exploitation');

  //Redo delete
  I.click('.delete-segment');
  I.waitForText('You deleted 11:00:00Z-12:00:00Z', 3);

  //Delete segment with interactions
  I.waitForElement('.segment-start');
  I.fillField('.segment-start', '12');
  I.pressKey('Tab');
  I.fillField('.segment-end', '12304');
  I.pressKey('Enter');
  I.waitForText('12:00:00Z');
  I.waitForText('12:30:40Z');

  I.fillField('.exploit-analyst', 'Billy Bob Joe');
  I.pressKey('Tab');
  I.fillField('.time', '121');
  I.pressKey('Enter');
  I.waitForText('12:10:00Z', 3);
  I.click('.delete-segment');
  I.click('.modal-no');

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI DESCRIPTION:', 3);
  I.click('.exploitation');

  I.waitForText('12:00:00Z');

  I.click('.delete-segment');
  I.click('.modal-yes');

  I.waitForText('You deleted');
});

Scenario('Should display a modal when deleting targets with ixns', (I) => {
  //Add segment
  I.waitForElement('.exploitation');
  I.click('.exploitation');
  I.waitForText('MGRS: 12QWE1231231231', 3);
  I.fillField('.segment-start', '12');
  I.pressKey('Tab');
  I.fillField('.segment-end', '12304');
  I.pressKey('Enter');
  I.waitForText('12:00:00Z');

  //Add Ixn
  I.fillField('.exploit-analyst', 'Bob');
  I.pressKey('Tab');
  I.fillField('.time', '121');
  I.pressKey('Tab');
  I.fillField('.activity', 'thing');
  I.pressKey('Enter');
  I.waitForText('12:10:00Z', 3);

  //Navigate back and try a delete
  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI DESCRIPTION:', 3);
  I.moveCursorTo('.tgt-form-box', 10, 3);
  I.waitForElement('.delete-tgt-button');
  I.click('.delete-tgt-button');
  I.seeElement(locate('div').withText('All associated data will be erased.'));
  I.click('.modal-no');

  I.click('.tgt-dash--header--back-button');
  I.waitForText('PRI');
  I.click(locate('.rfi-row').at(2));
  I.click('.navigate-to-tgt-button');

  I.waitForText('12QWE1231231231', 3);

  I.moveCursorTo('.tgt-form-box', 10, 3);
  I.waitForElement('.delete-tgt-button');
  I.click('.delete-tgt-button');
  I.seeElement(locate('div').withText('All associated data will be erased.'));
  I.click('.modal-yes');

  I.click('.tgt-dash--header--back-button');
  I.click(locate('.rfi-row').at(2));
  I.click('.navigate-to-tgt-button');

  I.waitForText('RFI DESCRIPTION:', 3);
  I.dontSee('12QWE1231231231');
});

Scenario('Should have upload file buttons that allow file upload', (I) => {
  I.waitForElement('.upload-file-button');
  I.click('.upload-file-button');
  I.waitForText('Drag and drop KML file here');
  I.waitForText('Browse');
});
