// import { gestionTareas } from "../../support/pages/TodoMVCPage"

describe('Test con POM de la Web Qualisophy', () => {

    it('Comprobar que se puede acceder a la web', () => {
        cy.visit('http://localhost:4321');
    })
})