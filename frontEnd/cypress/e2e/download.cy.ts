describe('Deve fazer download de um arquivo', () => {
  it('deve iniciar o download ao clicar no botão e depois excluir', () => {
    cy.visit('http://localhost:5173');
  
    cy.intercept('GET', '/api/download/**').as('downloadRequest');
  
    cy.get('input[type="file"]').selectFile('cypress/fixtures/bug.png', {force: true});
    cy.contains('Enviar').click();
  
    cy.contains('Download').click();
  
    cy.wait('@downloadRequest').its('response.statusCode').should('eq', 200);
    cy.contains('Delete').click();
    
  });
    
})
