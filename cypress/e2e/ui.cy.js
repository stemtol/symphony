describe('SauceDemo Sorting Tests', () => {
    const URL = 'https://www.saucedemo.com/';

    it('should verify items are sorted by name (A -> Z)', () => {
        cy.fixture('loginDetails.json').then(loginDetails => {
            cy.visit(URL);
            cy.get('input#user-name').type(loginDetails.username);
            cy.get('input#password').type(loginDetails.password);
            cy.get('input#login-button').click();

            cy.get('.inventory_item_name').then(items => {
                const itemNames = items.map((index, item) => item.innerText).get();
                expect(itemNames).to.deep.equal([...itemNames].sort());
            });
        });
    });

    it('should change sorting to name (Z -> A) and verify items are sorted correctly', () => {
        cy.fixture('loginDetails.json').then(loginDetails => {
            cy.visit(URL);
            cy.get('input#user-name').type(loginDetails.username);
            cy.get('input#password').type(loginDetails.password);
            cy.get('input#login-button').click();

            cy.get('.product_sort_container').select('za');
            cy.wait(2200);
            cy.get('.inventory_item_name').then(items => {
                const itemNames = items.map((index, item) => item.innerText).get();
                expect(itemNames).to.deep.equal([...itemNames].sort().reverse());
            });
        });
    });
});
