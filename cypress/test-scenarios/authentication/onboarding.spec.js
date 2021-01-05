/// <reference types="Cypress" />

import { randomString } from '../../shared/utils';
import { auth } from '../../app-actions/authentication/index';
import { bankAccounts } from '../../app-actions/bank-accounts/index';

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
      firstName: randomString(),
      lastName: randomString(),
      userName: randomString(),
      password: 's3cret',
    };

    // Bank Acount info
    const bankAccount = {
      bankName: 'Lloyds Plc',
      bankRoutingNumber: 767656789,
      bankAccountNumber: 56546565656,
    };
    //#endregion

    cy.visit('/');
    const authentication = new auth();
    authentication.signUp(userInfo).signIn(userInfo).onboarding(bankAccount);

    const userBankAccount = new bankAccounts();
    userBankAccount.goToBankAccounts().assertBankAccount(bankAccount.bankName);

    authentication.logout();
  });

  it('Given a user onboarding \
  when enter the incorrect Bank Account Number \
  then app should give error', () => {
    /***********
     * Test data
     ***********/
    //#region
    // User info
    const userInfo = {
      firstName: randomString(),
      lastName: randomString(),
      userName: randomString(),
      password: 's3cret',
    };

    // Bank Acount info
    const bankAccount = {
      bankName: 'Lloyds Plc',
      bankRoutingNumber: 767676787,
      bankAccountNumber: 56546565656,
    };
    //#endregion

    cy.visit('/');
    const authentication = new auth();

    authentication
      .signUp(userInfo)
      .signIn(userInfo)
      .onBoardingNextPage()
      .enterAccountNumber(bankAccount.bankAccountNumber)
      .enterBankName(bankAccount.bankName)
      .enterRoutingNumber(bankAccount.bankRoutingNumber)
      .saveAccount()
      .onboardingFinished();

    // verify added bank account
    const userBankAccount = new bankAccounts();
    userBankAccount.goToBankAccounts().assertBankAccount(bankAccount.bankName);

    authentication.logout();
  });
});
