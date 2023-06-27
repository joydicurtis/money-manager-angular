describe('My First Test', () => {
  const mockData =  {
    data: {
      type: {
        value: 'income',
        name: 'Income'
      },
      sum: 100,
      category: {
        id: 1,
        name: 'Freelance',
        icon: 'computer'
      },
      note: 'Note'
    }
  }

  const mockDataEdit =  {
    data: {
      type: {
        value: 'expense',
        name: 'Expense'
      },
      sum: 100,
      category: {
        id: 1,
        name: 'Eating Out',
        icon: 'dining'
      },
      note: 'Note'
    }
  }

  it('Check if adding transaction works', () => {
    cy.visit('/')
    cy.contains('Sign In').click();
    cy.get('[data-cy="transaction-add-btn"]').click();
    cy.get('[data-cy="transaction-type-btn-income"]').click();
    cy.get('[data-cy="transaction-amount-control"]').type('100').should('have.value', '100');
    cy.get('[data-cy="transaction-category-btn-1"]').click();
    cy.get('[data-cy="transaction-note-control"]').type('Note').should('have.value', 'Note');

    cy.intercept({
      method: 'POST',
      url: '*money-manager-angular-9088f*',
    }, {
      statusCode: 200,
      body: { data: {
        type: {
          value: 'income',
          name: 'Income'
        },
        sum: 100,
        category: {
          id: 1,
          name: 'Freelance',
          icon: 'computer'
        },
        note: 'Note'
      } },                         // stub returns above message
      headers: { 'access-control-allow-origin': '*' },
      delayMs: 500,
    }).as('addTransaction')
    cy.get('[data-cy="transaction-submit-btn"]').click()
    cy.wait('@addTransaction').its('response.body').should('deep.equal', mockData);
  });

  it('Check if validation works', () => {
    cy.visit('/')
    cy.contains('Sign In').click();
    cy.get('[data-cy="transaction-add-btn"]').click();
    cy.get('[data-cy="transaction-submit-btn"]').click();
    cy.get('[data-cy="type-control-error"]').should('be.visible').and('contain', 'This field is required');
    cy.get('[data-cy="amount-control-error"]').should('be.visible').and('contain', 'This field is required');
    cy.get('[data-cy="transaction-amount-control"]').type('abc');
    cy.get('[data-cy="amount-control-pattern-error"]').should('be.visible').and('contain', 'Amount should be composed only from numbers, and have only two decimals');
    cy.get('[data-cy="transaction-dialog-close-btn"]').click();
  })

  it('Check if editing transaction works', () => {
    cy.visit('/')
    cy.contains('Sign In').click();
    cy.get('[data-cy="transaction-edit-btn-0"]').click();
    cy.get('[data-cy="transaction-type-btn-expense"]').click();
    cy.get('[data-cy="transaction-amount-control"]').clear().type('100').should('have.value', '100');
    cy.get('[data-cy="transaction-category-btn-1"]').click();
    cy.get('[data-cy="transaction-note-control"]').clear().type('Note').should('have.value', 'Note');

    cy.intercept({
      method: 'POST',
      url: '*money-manager-angular-9088f*',
    }, {
      statusCode: 200,
      body: { data: {
        type: {
          value: 'expense',
          name: 'Expense'
        },
        sum: 100,
        category: {
          id: 1,
          name: 'Eating Out',
          icon: 'dining'
        },
        note: 'Note'
      } },
      headers: { 'access-control-allow-origin': '*' },
      delayMs: 500,
    }).as('editTransaction')
    cy.get('[data-cy="transaction-submit-btn"]').click()
    cy.wait('@editTransaction').its('response.body').should('deep.equal', mockDataEdit);
  });

  it('Check if delete transaction works', () => {
    cy.visit('/')
    cy.contains('Sign In').click();
    cy.get('[data-cy="transaction-delete-btn-0"]').click();
    cy.intercept({
      method: 'POST',
      url: '*money-manager-angular-9088f*',
    }, {
      statusCode: 200,
      body: { data: {
        type: {
          value: 'expense',
          name: 'Expense'
        },
        sum: 100,
        category: {
          id: 1,
          name: 'Eating Out',
          icon: 'dining'
        },
        note: 'Note'
      } },
      headers: { 'access-control-allow-origin': '*' },
      delayMs: 500,
    }).as('deleteTransaction');
    cy.wait('@deleteTransaction').its('response.body').should('deep.equal', mockDataEdit);
  });
});
