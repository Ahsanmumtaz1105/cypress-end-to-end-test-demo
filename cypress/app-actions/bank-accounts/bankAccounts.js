/**
 * Creates a Bank Accounts to act on
 * @class
 */
export class bankAccounts {
  /**
   * click the bank account link from the side navigation panel
   * @method
   * @param {param type} param name - description
   */
  goToBankAccounts() {
    cy.get('[href="/bankaccounts"][role="button"] span').contains('Bank Accounts').click();
    return this;
  }

  /**
   * Verify that the given bank name issame as in bank accounts list
   * @method
   * @param {string} bankAccountName bank account name to be asserted
   */
  assertBankAccount(bankAccountName) {
    cy.get('[data-test="bankaccount-list"] li').each(($bankAccount) => {
      cy.wrap($bankAccount).should('contain', bankAccountName);
      return;
    });
    return this;
  }
}
