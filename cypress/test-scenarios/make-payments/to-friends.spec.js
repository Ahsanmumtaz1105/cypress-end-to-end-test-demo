/// <reference types="Cypress" />

import { auth } from '../../app-actions/authentication/index';
import { transactions } from '../../app-actions/payments/index';

describe('Make payments', function () {
  it('Given user when make payment to a contact \
then paid amoud should be show in the list', () => {
    /***********
     * Test data
     ***********/
    //#region

    // User info
    const userInfo = {
      userName: 'test_rest',
      password: '12345678',
    };

    // Payment Info
    const payment = {
      payeeName: 'Ahsan mumtaz',
      amount: 50,
      notes: 'hello friend',
    };
    //#endregion

    cy.visit('/');
    const authentication = new auth();
    authentication.signIn(userInfo);
    const payments = new transactions();
    payments.clickCreateTransaction().selectContactFromTheList(payment.payeeName).makePayment(payment);
    authentication.logout();
  });
});
