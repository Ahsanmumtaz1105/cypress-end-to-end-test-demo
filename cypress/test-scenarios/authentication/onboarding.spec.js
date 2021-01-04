/// <reference types="Cypress" />

import * as auth from '../../app-actions/authentication/auth';

describe('User onboarding', function () {
  it('Given an un-registered user  \
  when signup and login   \
  then should be able to add the bank account', () => {
    /***********
     * Test data
     ***********/
    //#region

    // User info
    const userInfo = {
      firstName: 'Test',
      lastName: 'user2',
      userName: 'test003',
      password: 's3cret',
    };

    // Bank info
    const bankAccount = {
      bankName: 'Lloyds Plc',
      bankRoutingNumber: 767656789,
      bankAccountNumber: 56546565656,
    };
    //#endregion

    cy.visit('/');

    auth.signUp(userInfo);
    auth.signIn(userInfo);
    auth.onboarding(bankAccount);
  });
});
