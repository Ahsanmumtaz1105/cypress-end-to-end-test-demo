/// <reference types="Cypress" />

import * as auth from '../../app-actions/authentication/auth';

describe('User Sign-up and Login', function () {
  beforeEach(function () {
    cy.intercept('POST', '/users').as('signup');
  });

  it.skip('Given the user is unauthenticated \
  when visit the link /personal \
  then it should redirect to SignIn Page', () => {
    cy.visit('/personal');
    cy.location('pathname').should('equal', '/signin');
  });

  it.skip('Given user does not exist \
  when visit the signup page \
  then allows to login and onboard', () => {
    /***********
     * Test data
     ***********/
    //#region
    const userInfo = {
      firstName: 'Test',
      lastName: 'user1',
      userName: 'test001',
      password: 's3cret',
    };

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
