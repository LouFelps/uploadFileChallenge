describe('Deleta um arquivo', () => {
    it('deve excluir um arquivo da lista', () => {
        cy.visit('http://localhost:5173');
    
        cy.get('input[type="file"]').selectFile('cypress/fixtures/bug.png', {force: true});
        cy.contains('Enviar').click();
    
        cy.contains('bug.png').should('exist');
    
        cy.contains('Delete').click();
    
        cy.contains('bug.png').should('not.exist');
  });
});  