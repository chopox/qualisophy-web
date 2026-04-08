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
    Logo = '[data-test="footer-link-logo"]';
    Eslogan = '[data-test="footer-slogan"]';

    // Bloque Derecho: Datos de Contacto
    Correo = '[data-test="footer-link-email"]';
    Telefono = '[data-test="footer-link-phone"]';
    Direccion = '[data-test="footer-link-address"]';

    // Inclusión
    TituloInclusion = '[data-test="footer-title-inclusion"]';
    Neurodivergencia = '[data-test="footer-link-neurodivergence"]';
    EntornoRural = '[data-test="footer-link-rural-environment"]';
    TalentoMigrante = '[data-test="footer-link-migrant-talent"]';
    RiesgoExclusion = '[data-test="footer-link-social-impact"]';

    // Formaciones
    TituloFormaciones = '[data-test="footer-title-formaciones"]';
    Particulares = '[data-test="footer-link-particulares"]';    
    Empresas = '[data-test="footer-link-empresas"]';

    // ¿Colaboramos?
    TituloColaboramos = '[data-test="footer-title-colaboramos"]';
    Partnership = '[data-test="footer-link-partnership"]';

    // Conócenos
    TituloConocenos = '[data-test="footer-title-conocenos"]';
    Equipo = '[data-test="footer-link-team"]';
    Blog = '[data-test="footer-link-blog"]';
    Contacto = '[data-test="footer-link-contact"]';

    // Marca Registada y Redes Sociales
    MarcaRegistrada = '[data-test="footer-registered-trademark"]';
    Instagram = '[data-test="footer-link-instagram"]';
    Twitter = '[data-test="footer-link-twitter"]';
    LinkedIn = '[data-test="footer-link-linkedin"]';    


    /// MÉTODOS ///

    // Navegación
    gotoInicio() {
        cy.get(this.Logo).click();
        cy.url().should('eq', this.webInicio);
    }

    gotoNeurodivergencia() {
        cy.get(this.Neurodivergencia).click();
        cy.url().should('eq', this.webNeurodivergencia);
    }

    gotoEntornoRural() {
        cy.get(this.EntornoRural).click();
        cy.url().should('eq', this.webEntornoRural);
    }

    gotoTalentoMigrante() {
        cy.get(this.TalentoMigrante).click();
        cy.url().should('eq', this.webTalentoMigrante);
    }

    gotoRiesgoExclusion() {
        cy.get(this.RiesgoExclusion).click();
        cy.url().should('eq', this.webRiesgoExclusion);
    }

    gotoParticulares() {
        cy.get(this.Particulares).click();
        cy.url().should('eq', this.webParticulares);
    }

    gotoPartnership() {
        cy.get(this.Partnership).click();
        cy.url().should('eq', this.webPartnership);
    }

   gotoEquipo() {
        cy.get(this.Equipo).click();
        cy.url().should('eq', this.webEquipo);
    }

   gotoBlog() {
        cy.get(this.Blog).click();
        cy.url().should('eq', this.webBlog);
    }

    gotoContacto() {
        cy.get(this.Contacto).click();
        cy.url().should('eq', this.webContacto);
    }

    gotoInstagram() {
        cy.get(this.Instagram)
          .should('have.attr', 'href')
          .and('include', this.webInstagram);
    }

    gotoTwitter() {
        cy.get(this.Twitter)
          .should('have.attr', 'href')
          .and('include', this.webTwitter);
    }

    gotoLinkedIn() {
        cy.get(this.LinkedIn)
          .should('have.attr', 'href')
          .and('include', this.webLinkedIn);
    }

}

export const footer = new Footer();