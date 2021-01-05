/**
 * To verify
 * @class
 */
export class transactions {
  //#region Actions

  /**
   * Click on the Sigup page link on SigIn Page
   * @method
   */
  clickCreateTransaction() {
    cy.get('.MuiGrid-container [href="/transaction/new"] span').first().contains('Create A Transaction').click();
    return this;
  }

  /**
   * Enter contact name in the search box
   * @method
   * @param {String} contactName contact name
   */
  searchContact(contactName) {
    cy.get('#user-list-search-input[type="text"]').type(contactName, { force: true });
    return this;
  }

  /**
   * select the given contact name
   * @method
   * @param {String} contactName contact name
   */
  selectContactFromTheList(contactName) {
    this.searchContact(contactName);
    cy.get('[data-test="users-list"] li').within(() => {
      cy.get('span').contains(contactName).click();
    });
    return this;
  }

  /**
   * Make payment to the contact
   * @method
   * @param {JSON} payment object
   * @example
    const payment = {
      payeeName: 'Ahsan mumtaz',
      amount: 50,
      notes: 'hello friend',
    }
   */
  makePayment(payment) {
    this.verifyPayeeName(payment.payeeName)
      .enterAmount(payment.amount)
      .enterNotes(payment.notes)
      .clickPay()
      .assertPaymentConfirmationMessage(payment);
    return this;
  }

  /**
   * Verify payee name
   * @method
   * @param {String} contactName contact name
   */
  verifyPayeeName(payeeName) {
    cy.get('h2').contains(payeeName);
    return this;
  }

  /**
   * Enter the payment amount
   * @method
   * @param {String} amount payment amount
   */
  enterAmount(amount) {
    cy.get('#amount[type="text"]').type(amount);
    return this;
  }

  /**
   * Enter the payment notes
   * @method
   * @param {String} notes payment notes
   */
  enterNotes(notes) {
    cy.get('input#transaction-create-description-input').type(notes);
    return this;
  }

  /**
   * click Pay
   * @method
   */
  clickPay() {
    cy.get('button[type="submit"] span').contains('Pay').click();
    return this;
  }

  /**
   * Verify payment confirmation message
   * @method
   * @param {JSON} payment object
   * @example
    const payment = {
      payeeName: 'Ahsan mumtaz',
      amount: 50,
      notes: 'hello friend',
    }
   */
  assertPaymentConfirmationMessage(payment) {
    cy.get('div h2').last().should('contain.text', `Paid $${payment.amount}.00 for ${payment.notes}`);
  }
  //#endregion
}
