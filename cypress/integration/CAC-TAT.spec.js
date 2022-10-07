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
    
    cy.get('input#phone-checkbox').check()

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

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy
      .get('select#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy
      .get('select#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy
      .get('select#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check()
      .should('have.value', 'feedback')
    
    cy.get('input[name="atendimento-tat"]:checked').should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each((radio) => {
        cy.wrap(radio).check()
        cy.wrap(radio).should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy
      .get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy
      .get('input#file-upload')
      .selectFile('./cypress/fixtures/example.json')
      .should(($input) => {
        expect($input[0].files[0].name).to.eq('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy
      .get('input#file-upload')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
      .then(($input) => {
        expect($input[0].files[0].name).to.eq('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    
    cy
      .get('input#file-upload')
      .selectFile('@sampleFile', { action: 'drag-drop' })
      .then(($input) => {
        expect($input[0].files[0].name).to.eq('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy
      .get('a')
      .should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy
      .get('a')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('Talking About Testing').should('be.visible')
  })
})