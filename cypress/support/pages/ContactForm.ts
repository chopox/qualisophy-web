export class Formulario {

    /// ATRIBUTOS ///
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
    }

    escribirCorreo(email: string) {
        cy.get(this.correoInput).type(email);
    }

    escribirMensaje(message: string) {
        cy.get(this.mensajeInput).type(message);
    }

    enviarMensaje() {
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