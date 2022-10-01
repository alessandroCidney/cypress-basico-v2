Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('input#firstName').type('Nome')
  cy.get('input#lastName').type('Teste')
  cy.get('input#email').type('esteeumemaildetestes@supertesteincrivel.com')
  cy.get('textarea#open-text-area').type('teste')

  cy.contains('button', 'Enviar').click()
})