const apiUrl = Cypress.env('apiUrl');

/**
 * To verify Sign In/Sigup and onboarding features
 * @class
 */
export class auth {
  //#region Actions

  /**
   * A new user signup to the application
   * @method
   * @param {JSON} userInfo userInfo
   * @example 
   * const userInfo =
   * {
      firstName: 'Test',
      lastName: 'user7',
      userName: 'test012',
      password: 's3cret',
    };
   */
  signUp(userInfo) {
    const signUpUrl = apiUrl + '/users';
    cy.intercept('POST', signUpUrl).as('apiSignUp');

    this.gotoSignUpPage()
      .enterFirstName(userInfo.firstName)
      .enterLastName(userInfo.lastName)
      .enterUserName(userInfo.userName)
      .enterPassword(userInfo.password)
      .enterConfirmPassword(userInfo.password)
      .submitSignUp();
    cy.wait('@apiSignUp').should((response) => {
      expect(response.state).to.eq('Complete');
    });
    return this;
  }
  /**
   * Click on the Sigup page link on SigIn Page
   * @method
   */
  gotoSignUpPage() {
    cy.get('[href="/signup"]').click();
    return this;
  }
  /**
   * Registered user SigIn
   * @method
   * @param {JSON} userInfo userInfo
   * @example 
   * const userInfo =
   * {
      firstName: 'Test',
      lastName: 'user7',
      userName: 'test012',
      password: 's3cret',
    };
   */
  signIn(userInfo) {
    const signUpUrl = apiUrl + '/login';
    cy.intercept('POST', signUpUrl).as('apiSignIn');
    cy.location('pathname').should('equal', '/signin');
    this.enterUserName(userInfo.userName).enterPassword(userInfo.password).submitSigIn();
    cy.wait('@apiSignIn').should(($xhr) => {
      expect($xhr.response.statusCode).to.eq(200);
    });
    return this;
  }

  /**
   * Enter username in SignIn or Sigup form
   * @method
   * @param {string} userName username
   */
  enterUserName(userName) {
    cy.get('#username').type(userName);
    return this;
  }

  /**
   * Enter password in SignIn or Sigup form
   * @method
   * @param {string} password user password
   */
  enterPassword(password) {
    cy.get('#password').type(password);
    return this;
  }

  /**
   * Enter firstName in Sign Up form
   * @method
   * @param {string} firstName firstname
   */
  enterFirstName(firstName) {
    cy.get('#firstName').type(firstName);
    return this;
  }

  /**
   * Enter lastName in Sign Up form
   * @method
   * @param {string} lastName lastName
   */
  enterLastName(lastName) {
    cy.get('#lastName').type(lastName);
    return this;
  }

  /**
   * Enter confirmPassword in Sign Up form
   * @method
   * @param {string} confirmPassword confirmPassword
   */
  enterConfirmPassword(confirmPassword) {
    cy.get('#confirmPassword').type(confirmPassword);
    return this;
  }

  /**
   * Click on submit SignUp button on Sign Up form
   * @method
   * @param {string} confirmPassword confirmPassword
   */
  submitSignUp() {
    cy.get('[type="submit"] span').contains('Sign Up').click();
    return this;
  }

  /**
   * Click on submit SignIn button on signin form
   * @method
   * @param {string} confirmPassword confirmPassword
   */
  submitSigIn() {
    cy.get('[type="submit"] span').contains('Sign In').click();
    return this;
  }

  /**
   * A fresh user login first time and add bank account
   * @method
   * @param {JSON} bankAccount confirmPassword
   * @example
   *  const bankAccount = {
      bankName: 'Lloyds Plc',
      bankRoutingNumber: 767676787,
      bankAccountNumber: 56546565656,
    };
   * 
   */
  onboarding(bankAccount) {
    this.assertOnboardingPage()
      .onBoardingNextPage()
      .assertAccountFormHeader()
      .enterBankName(bankAccount.bankName)
      .enterRoutingNumber(bankAccount.bankRoutingNumber)
      .enterAccountNumber(bankAccount.bankAccountNumber)
      .saveAccount()
      .onboardingFinished();
    return this;
  }

  /**
   * Click on Done button to finish onboarding
   * @method
   *
   */
  onboardingFinished() {
    cy.get('[role="presentation"] h2').should('contain', 'Finished');
    cy.get('[type="button"] span').contains('Done').click();
    return this;
  }

  /**
   * Assert that the Onboarding dialog display to the user
   * @method
   *
   */
  assertOnboardingPage() {
    cy.get('[data-test="user-onboarding-dialog-title"]').should('contain', 'Get Started with Real World App');
    return this;
  }

  /**
   * Click the Next button of the onboarding dialog take to the add bank account  page
   * @method
   *
   */
  onBoardingNextPage() {
    cy.get('[type="button"] span').contains('Next').click();
    return this;
  }

  /**
   * Enter bank name in the add bank account form of the onboarding process
   * @method
   * @param {string} bankName bank name to be added
   */
  enterBankName(bankName) {
    cy.get('#bankaccount-bankName-input').type(bankName);
    return this;
  }

  /**
   * Assert the bank account dailog heading
   * @method
   */
  assertAccountFormHeader() {
    cy.get('[role="presentation"]').should('contain', 'Create Bank Account');
    return this;
  }

  /**
   * Enter bank routing Number in the add bank account form of the onboarding process
   * @method
   * @param {string} bankRoutingNumber bank routing number
   */
  enterRoutingNumber(bankRoutingNumber) {
    cy.get('#bankaccount-routingNumber-input').type(bankRoutingNumber);
    return this;
  }
  /**
   * Enter bank account number in the add bank account form of the onboarding process
   * @method
   * @param {string} bankAccountNumber bank account number
   */
  enterAccountNumber(bankAccountNumber) {
    cy.get('#bankaccount-accountNumber-input').type(bankAccountNumber);
    return this;
  }

  /**
   * Click on save to add the bank account in the onboarding process
   * @method
   */
  saveAccount() {
    cy.get('[type="submit"] span').contains('Save').click();
    return this;
  }

  /**
   * logout user from the application
   * @method
   */
  logout() {
    cy.get('[role="button"] span').contains('Logout').click();
    return this;
  }

  //#endregion
}
