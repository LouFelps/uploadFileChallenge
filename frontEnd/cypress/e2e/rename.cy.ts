describe('Renomeia um arquivo', () => {
    it('deve permitir renomear um arquivo e visualizar a alteração, depois excluir', () => {
        cy.visit('http://localhost:5173');
    
        cy.get('input[type="file"]').selectFile('cypress/fixtures/bug.png', {force: true});
        cy.contains('Enviar').click();
    
        cy.contains('bug.png').should('exist');
    
        cy.get('input[placeholder="Novo nome"]').type('renomeado');
        cy.contains('Rename').click();
    
        cy.contains('renomeado.png').should('exist');

        cy.contains('Delete').click();
    
    });
});