export class Formulario {

    /// ATRIBUTOS ///
    web = 'http://localhost:4321/contact';

    nombreTitulo = '[data-test="contact-title-name"]';
    nombreInput = '[data-test="contact-input-name"]';

    correoTitulo = '[data-test="contact-title-email"]';
    correoInput = '[data-test="contact-input-email"]';

    mensajeTitulo = '[data-test="contact-title-message"]';
    mensajeInput = '[data-test="contact-input-message"]';

    botonEnviar = '[data-test="contact-submit-button"]';

    envioCorrectoMensaje = '[data-test="contact-success-message"]';
    envioFallidoMensaje = '[data-test="contact-error-message"]';


    /// MÉTODOS ///
    escribirNombre(name: string) {
        cy.get(this.nombreInput).type(name);
        cy.get(this.nombreInput).should('have.value', name);
    }

    escribirCorreo(email: string) {
        cy.get(this.correoInput).type(email);
        cy.get(this.correoInput).should('have.value', email);
    }

    escribirMensaje(message: string) {
        cy.get(this.mensajeInput).type(message);
        cy.get(this.mensajeInput).should('have.value', message);
    }

    enviar() {
        cy.intercept('POST', '/api/send-email', {
            statusCode: 200,
            body: { success: true }
            }).as('sendEmail');

        cy.get(this.botonEnviar)
          .should('have.attr', 'type')
          .and('include', 'submit').click();

        cy.wait('@sendEmail');

        cy.get(this.envioCorrectoMensaje)
          .should('be.visible');

        cy.get(this.envioFallidoMensaje)
          .should('not.be.visible');
    
    }

}

export const formulario = new Formulario();