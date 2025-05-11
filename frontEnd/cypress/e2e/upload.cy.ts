describe('Faz upload de um arquivo', () => {
    it('deve enviar um arquivo e exibir na lista, depois excluir', () => {
      cy.visit('http://localhost:5173');
  
      cy.get('input[type="file"]').selectFile('cypress/fixtures/bug.png', {force: true});
      cy.contains('Enviar').click();
  
      cy.contains('bug.png');

      cy.contains('Delete').click();
    
    });
  });
  