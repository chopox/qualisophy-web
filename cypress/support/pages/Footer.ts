export class Footer {

    /// ATRIBUTOS ///
    
    // Enlaces
    webInicio = 'http://localhost:4321/';
    webCorreo = 'mailto:hello@qualisophy.com';
    webTelefono = 'tel:+34951768789';
    webDireccion = 'https://maps.google.com/?q=Calle+Esteban+Salazar+Chapela+11,+M%C3%A1laga';
    webNeurodivergencia = 'http://localhost:4321/neurodivergence';
    webEntornoRural = 'http://localhost:4321/rural-area';
    webTalentoMigrante = 'http://localhost:4321/migrant-talent';
    webRiesgoExclusion = 'http://localhost:4321/social-impact';
    webParticulares = 'http://localhost:4321/cursos';
    webPartnership = 'http://localhost:4321/partnership';
    webEquipo = 'http://localhost:4321/team';
    webBlog = 'http://localhost:4321/blog';
    webContacto = 'http://localhost:4321/contact';
    webInstagram = 'https://www.instagram.com/qualisophy/';
    webTwitter = 'https://x.com/qualisophy';
    webLinkedIn = 'https://www.linkedin.com/company/qualisophy/';
    
    // Bloque Izquierdo: Logo y Eslogan
    logo = '[data-test="footer-link-logo"]';
    eslogan = '[data-test="footer-slogan"]';

    // Bloque Derecho: Datos de Contacto
    correo = '[data-test="footer-link-email"]';
    telefono = '[data-test="footer-link-phone"]';
    direccion = '[data-test="footer-link-address"]';

    // Inclusión
    tituloInclusion = '[data-test="footer-title-inclusion"]';
    neurodivergencia = '[data-test="footer-link-neurodivergence"]';
    entornoRural = '[data-test="footer-link-rural-environment"]';
    talentoMigrante = '[data-test="footer-link-migrant-talent"]';
    riesgoExclusion = '[data-test="footer-link-social-impact"]';

    // Formaciones
    tituloFormaciones = '[data-test="footer-title-formaciones"]';
    particulares = '[data-test="footer-link-particulares"]';    
    empresas = '[data-test="footer-link-empresas"]';

    // ¿Colaboramos?
    tituloColaboramos = '[data-test="footer-title-colaboramos"]';
    partnership = '[data-test="footer-link-partnership"]';

    // Conócenos
    tituloConocenos = '[data-test="footer-title-conocenos"]';
    equipo = '[data-test="footer-link-team"]';
    blog = '[data-test="footer-link-blog"]';
    contacto = '[data-test="footer-link-contact"]';

    // Marca Registada y Redes Sociales
    marcaRegistrada = '[data-test="footer-registered-trademark"]';
    instagram = '[data-test="footer-link-instagram"]';
    twitter = '[data-test="footer-link-twitter"]';
    linkedIn = '[data-test="footer-link-linkedin"]';    


    /// MÉTODOS ///

    // Navegación
    gotoInicio() {
        cy.get(this.logo).click();
        cy.url().should('eq', this.webInicio);
    }

    gotoNeurodivergencia() {
        cy.get(this.neurodivergencia).click();
        cy.url().should('eq', this.webNeurodivergencia);
    }

    gotoEntornoRural() {
        cy.get(this.entornoRural).click();
        cy.url().should('eq', this.webEntornoRural);
    }

    gotoTalentoMigrante() {
        cy.get(this.talentoMigrante).click();
        cy.url().should('eq', this.webTalentoMigrante);
    }

    gotoRiesgoExclusion() {
        cy.get(this.riesgoExclusion).click();
        cy.url().should('eq', this.webRiesgoExclusion);
    }

    gotoParticulares() {
        cy.get(this.particulares).click();
        cy.url().should('eq', this.webParticulares);
    }

    gotoPartnership() {
        cy.get(this.partnership).click();
        cy.url().should('eq', this.webPartnership);
    }

   gotoEquipo() {
        cy.get(this.equipo).click();
        cy.url().should('eq', this.webEquipo);
    }

   gotoBlog() {
        cy.get(this.blog).click();
        cy.url().should('eq', this.webBlog);
    }

    gotoContacto() {
        cy.get(this.contacto).click();
        cy.url().should('eq', this.webContacto);
    }

    gotoInstagram() {
        cy.get(this.instagram)
          .should('have.attr', 'href')
          .and('include', this.webInstagram);
    }

    gotoTwitter() {
        cy.get(this.twitter)
          .should('have.attr', 'href')
          .and('include', this.webTwitter);
    }

    gotoLinkedIn() {
        cy.get(this.linkedIn)
          .should('have.attr', 'href')
          .and('include', this.webLinkedIn);
    }

    // Contacto
    enviarCorreo() {
        cy.get(this.correo)
          .should('have.attr', 'href')
          .and('include', this.webCorreo);
    }

    realizarLlamada() {
        cy.get(this.telefono)
          .should('have.attr', 'href')
          .and('include', this.webTelefono);
    }

    abrirDireccion() {
        cy.get(this.direccion)
          .should('have.attr', 'href')
          .and('include', this.webDireccion);
    }

}

export const footer = new Footer();