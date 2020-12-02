/// <reference path="../steps.d.ts" />

Feature('Metrics Page');

Scenario('Should log and display GETS click metrics', (I) => {
  I.amOnPage('/metrics');

  I.waitForText('GETS Clicks');
  within('.gets-clicks', () => {
    I.see('Open');
    I.see('New');
    I.see('1');
  });
});

Scenario('Should display RFI status metrics', (I) => {
  I.waitForText('Avg RFI Spent in Status', 10);
  within('.workflow-time', () => {
    I.see('Open');
    I.see('New');
    I.see('0 d');
  });
});

Scenario('Should display deletion metrics', (I) => {
  I.waitForText('Avg Deletions');
  within('.deletions', () => {
    I.see('Dates');
    I.see('Targets');
    I.see('Segments');
    I.see('Interactions');
    I.see('6', locate('.card-row').at(1));
    I.see('4', locate('.card-row').at(2));
    I.see('4', locate('.card-row').at(3));
    I.see('3', locate('.card-row').at(4));
  });
});

Scenario('Should display undo metrics', (I) => {
  I.waitForText('Avg Undo Actions');
  within('.undos', () => {
    I.see('Dates');
    I.see('Targets');
    I.see('Segments');
    I.see('Interactions');
    I.see('1', locate('.card-row').at(1));
    I.see('1', locate('.card-row').at(2));
    I.see('1', locate('.card-row').at(3));
    I.see('1', locate('.card-row').at(4));
  });
});

Scenario('Should display edit metrics', (I) => {
  I.waitForText('Avg Edits');
  within('.edits', () => {
    I.see('Dates');
    I.see('Targets');
    I.see('Segments');
    I.see('Interactions');
    I.see('1', locate('.card-row').at(1));
    I.see('3', locate('.card-row').at(2));
    I.see('1', locate('.card-row').at(3));
    I.see('12', locate('.card-row').at(4));
  });
});

Scenario('Should display other metrics', (I) => {
  I.amOnPage('/metrics');

  I.waitForText('Avg Targets Created', 3);
  I.see('11', '.tgts-created');

  I.waitForText('Avg Interactions Created', 3);
  I.see('4', '.ixns-created');

  I.waitForText('Avg Tracks Completed', 3);
  I.see('2', '.ixns-completed')

  I.waitForText('Avg Logins');
  I.see('2', '.logins');

  I.waitForText('Avg Prioritization Actions');
  I.see('0', '.prioritizations');

  I.waitForText('LTIOVs Met');
  I.see('0%', '.ltiovs-met');
});

Scenario('Should display percent RFIs that are unworked', (I) => {
  I.amOnPage('/metrics');

  I.waitForText('Unworked RFIs');
  I.see('0%', '.unworked-rfis');
})
