export class Pilares {

    /// ATRIBUTOS ///
    
    // Enlaces
    webNeurodivergencia = 'http://localhost:4321/neurodivergence';
    webEntornoRural = 'http://localhost:4321/rural-area';
    webTalentoMigrante = 'http://localhost:4321/migrant-talent';
    webRiesgoExclusion = 'http://localhost:4321/social-impact';
    webReconversionLaboral = 'http://localhost:4321/reskilling';
    
    // Título
    titulo = '[data-test="title-pillars"]';

    // Bloque de Neurodivergencia
    pilarNeurodivergencia = '[data-test="pillar-neurodivergence"]';
    neurodivergenciaIcono = '[data-test="pillar-neurodivergence-icon"]';
    neurodivergenciaCategoria = '[data-test="pillar-neurodivergence-category"]';
    neurodivergenciaTitulo = '[data-test="pillar-neurodivergence-title"]';
    neurodivergenciaDescripcion = '[data-test="pillar-neurodivergence-description"]';
    neurodivergenciaLink = '[data-test="pillar-neurodivergence-link"]';

    // Bloque de Entorno Rural
    pilarEntornoRural = '[data-test="pillar-rural-environment"]';
    entornoRuralIcono = '[data-test="pillar-rural-environment-icon"]';
    entornoRuralCategoria = '[data-test="pillar-rural-environment-category"]';
    entornoRuralTitulo = '[data-test="pillar-rural-environment-title"]';
    entornoRuralDescripcion = '[data-test="pillar-rural-environment-description"]';
    entornoRuralLink = '[data-test="pillar-rural-environment-link"]';

    // Bloque de Talento Migrante
    pilarTalentoMigrante = '[data-test="pillar-migrant-talent"]';
    talentoMigranteIcono = '[data-test="pillar-migrant-talent-icon"]';
    talentoMigranteCategoria = '[data-test="pillar-migrant-talent-category"]';
    talentoMigranteTitulo = '[data-test="pillar-migrant-talent-title"]';
    talentoMigranteDescripcion = '[data-test="pillar-migrant-talent-description"]';
    talentoMigranteLink = '[data-test="pillar-migrant-talent-link"]';

    // Bloque de Riesgo de Exclusión
    pilarRiesgoExclusion = '[data-test="pillar-social-impact"]';
    riesgoExclusionIcono = '[data-test="pillar-social-impact-icon"]';
    riesgoExclusionCategoria = '[data-test="pillar-social-impact-category"]';
    riesgoExclusionTitulo = '[data-test="pillar-social-impact-title"]';
    riesgoExclusionDescripcion = '[data-test="pillar-social-impact-description"]';
    riesgoExclusionLink = '[data-test="pillar-social-impact-link"]';

    // Bloque de Reconversión Laboral
    pilarReconversionLaboral = '[data-test="pillar-reskilling"]';
    reconversionLaboralIcono = '[data-test="pillar-reskilling-icon"]';
    reconversionLaboralCategoria = '[data-test="pillar-reskilling-category"]';
    reconversionLaboralTitulo = '[data-test="pillar-reskilling-title"]';
    reconversionLaboralDescripcion = '[data-test="pillar-reskilling-description"]';
    reconversionLaboralLink = '[data-test="pillar-reskilling-link"]';


    /// MÉTODOS ///

    // Navegación
    gotoNeurodivergencia() {
        cy.get(this.pilarNeurodivergencia).click();
        cy.get(this.neurodivergenciaLink).click();
        cy.url().should('eq', this.webNeurodivergencia);
    }

    gotoEntornoRural() {
        cy.get(this.pilarEntornoRural).click();
        cy.get(this.entornoRuralLink).click();
        cy.url().should('eq', this.webEntornoRural);
    }

    gotoTalentoMigrante() {
        cy.get(this.pilarTalentoMigrante).click();
        cy.get(this.talentoMigranteLink).click();
        cy.url().should('eq', this.webTalentoMigrante);
    }

    gotoRiesgoExclusion() {
        cy.get(this.pilarRiesgoExclusion).click();
        cy.get(this.riesgoExclusionLink).click();
        cy.url().should('eq', this.webRiesgoExclusion);
    }

    gotoReconversionLaboral() {
        cy.get(this.pilarReconversionLaboral).click();
        cy.get(this.reconversionLaboralLink).click();
        cy.url().should('eq', this.webReconversionLaboral);
    }
}

export const pilares = new Pilares();