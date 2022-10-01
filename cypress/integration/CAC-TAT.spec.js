/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('input#firstName').type('Nome')
    cy.get('input#lastName').type('Teste')
    cy.get('input#email').type('esteeumemaildetestes@supertesteincrivel.com')
    cy.get('textarea#open-text-area').type(
      'este é um texto muuuiiiiittoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo longoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo', {
      delay: 0,
    })

    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('input#firstName').type('Nome')
    cy.get('input#lastName').type('Teste')
    cy.get('input#email').type('email invalido')
    cy.get('textarea#open-text-area').type('me ajudem', { delay: 0 })

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('campo de telefone não aceita valores que não sejam números', () => {
    cy.get('input#phone').type('não sou um número').should('have.value', '')
    cy.get('input#phone').type('12345').should('have.value', '12345')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('input#firstName').type('Nome')
    cy.get('input#lastName').type('Teste')
    cy.get('input#email').type('esteeumemaildetestes@supertesteincrivel.com')
    cy.get('textarea#open-text-area').type('teste')
    
    cy.get('input#phone-checkbox').click()

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy
      .get('input#firstName')
      .type('Nome')
      .should('have.value', 'Nome')
      .clear()
      .should('have.value', '')

    cy
      .get('input#lastName')
      .type('Teste')
      .should('have.value', 'Teste')
      .clear()
      .should('have.value', '')

    cy
      .get('input#email')
      .type('esteeumemaildetestes@supertesteincrivel.com')
      .should('have.value', 'esteeumemaildetestes@supertesteincrivel.com')
      .clear()
      .should('have.value', '')

    cy
      .get('input#phone')
      .type('12345678')
      .should('have.value', '12345678')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })
})