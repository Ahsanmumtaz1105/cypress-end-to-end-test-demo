const apiUrl = Cypress.env('apiUrl');

//#region Actions

export const signUp = (userInfo) => {
  const signUpUrl = apiUrl + '/users';
  cy.intercept('POST', signUpUrl).as('apiSignUp');

  cy.get('[href="/signup"]').click();
  enterFirstName(userInfo.firstName);
  enterLastName(userInfo.lastName);
  enterUserName(userInfo.userName);
  enterPassword(userInfo.password);
  enterConfirmPassword(userInfo.password);
  submitSignUp();
  cy.wait('@apiSignUp').should((response) => {
    expect(response.state).to.eq('Complete');
  });
};

export const signIn = (userInfo) => {
  const signUpUrl = apiUrl + '/login';
  cy.intercept('POST', signUpUrl).as('apiSignIn');
  cy.location('pathname').should('equal', '/signin');
  enterUserName(userInfo.userName);
  enterPassword(userInfo.password);
  submitSigIn();
  cy.wait('@apiSignIn').should(($xhr) => {
    expect($xhr.response.statusCode).to.eq(200);
  });
};

export const enterUserName = (userName) => {
  cy.get('#username').type(userName);
};

export const enterPassword = (password) => {
  cy.get('#password').type(password);
};

export const enterFirstName = (firstName) => {
  cy.get('#firstName').type(firstName);
};

export const enterLastName = (lastName) => {
  cy.get('#lastName').type(lastName);
};
export const enterConfirmPassword = (userName) => {
  cy.get('#confirmPassword').type(userName);
};

export const submitSignUp = () => {
  cy.get('[type="submit"] span').contains('Sign Up').click();
};

export const submitSigIn = () => {
  cy.get('[type="submit"] span').contains('Sign In').click();
};

export const onboarding = (bankAccount) => {
  assertOnboardingPage();
  onBoardingNextPage();
  assertAccountFormHeader();
  enterBankName(bankAccount.bankName);
  enterRoutingNumber(bankAccount.bankRoutingNumber);
  enterAccountNumber(bankAccount.bankAccountNumber);
  saveAccount();
  onboardingFinished();
};

export const onboardingFinished = () => {
  cy.get('[role="presentation"] h2').should('contain', 'Finished');
  cy.get('[type"button"] span').click();
};
export const assertOnboardingPage = () => {
  cy.get('[data-test="user-onboarding-dialog-title"]').should('contain', 'Get Started with Real World App');
};

export const onBoardingNextPage = () => {
  cy.get('[type="button"] span').contains('Next').click();
};

export const enterBankName = (bankName) => {
  cy.get('#bankaccount-bankName-input').type(bankName);
};

export const assertAccountFormHeader = () => {
  cy.get('[role="presentation"]').should('contain', 'Create Bank Account');
};

export const enterRoutingNumber = (bankRoutingNumber) => {
  cy.get('#bankaccount-routingNumber-input').type(bankRoutingNumber);
};

export const enterAccountNumber = (bankAccountNumber) => {
  cy.get('#bankaccount-accountNumber-input').type(bankAccountNumber);
};

export const saveAccount = () => {
  cy.get('[type="submit"] span').contains('Save').click();
};

//#endregion
