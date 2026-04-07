export class Inicio {
    // ENLACES //
    web = 'http://localhost:4321/'
    webNeurodivergencia = 'http://localhost:4321/pilares-de-inclusion/neurodivergencia';
    webParticulares = 'http://localhost:4321/formaciones/particulares';
    webContacto = 'http://localhost:4321/contacto';
    webInstagram = 'https://www.instagram.com/qualisophy/';
    webTwitter = 'https://x.com/qualisophy';
    webLinkedIn = 'https://www.linkedin.com/company/qualisophy/';
    
    // MENÚ //
    // programas = trigger('mouseover');

    // CARRUSEL //
    pilares = '[data-test="pillars"]';
    pilarNeurodivergencia = '[data-test="pillar-neurodivergence"]';
    pilarEntornoRural = '[data-test="pillar-rural-environment"]';
    pilarTalentoMigrante = '[data-test="pillar-migrant-talent"]';
    pilarRiesgoExclusion = '[data-test="pillar-social-impact"]';
    pilarReconversionLaboral = '[data-test="pillar-reskilling"]';

    // FOOTER //
    // Bloque Izquierdo: Logo y Eslogan
    footerLogoLink = '[data-test="footer-link-logo"]';

    // Bloque Derecho: Datos de Contacto
    footerCorreo = '[data-test="footer-link-email"]';
    footerTelefono = '[data-test="footer-link-phone"]';
    footerDireccion = '[data-test="footer-link-address"]';

    // Inclusión
    footerNeurodivergencia = '[data-test="footer-link-neurodivergence"]';
    footerEntornoRural = '[data-test="footer-link-rural-environment"]';
    footerTalentoMigrante = '[data-test="footer-link-migrant-talent"]';
    footerRiesgoExclusión = '[data-test="footer-link-social-impact"]';

    // Formaciones
    footerParticulares = '[data-test="footer-link-particulares"]';    
    footerEmpresas = '[data-test="footer-link-empresas"]';

    // ¿Colaboramos?
    footerPartnership = '[data-test="footer-link-partnership"]';

    // Conócenos
    footerEquipo = '[data-test="footer-link-team"]';
    footerBlog = '[data-test="footer-link-blog"]';
    footerContacto = '[data-test="footer-link-contact"]';

    // Redes Sociales
    footerInstagram = '[data-test="footer-link-instagram"]';
    footerTwitter = '[data-test="footer-link-twitter"]';
    footerLinkedIn = '[data-test="footer-link-linkedin"]';    


    // MÉTODOS //
    gotoWeb() {
        cy.visit(this.web);
    }

    gotoPilaresNeurodivergencia() {
        // cy.get(this.pilarNeurodivergencia)
        //   .scrollIntoView()
        //   .click();

        // cy.get('[data-test="pillar-neurodivergence"] a', { timeout: 10000 })
        //   .should('be.visible')
        //   .and('not.have.css', 'opacity', '0')
        //   .click();
        cy.get(this.pilarNeurodivergencia).click();
        cy.get(this.pilarNeurodivergencia).find('a').click();
        cy.url().should('eq', this.webNeurodivergencia);
    }

    gotoPilaresEntornoRural() {
        cy.get(this.pilarEntornoRural).click();
        cy.get(this.pilarEntornoRural).find('a').click();
    }

    gotoPilaresTalentoMigrante() {
        cy.get(this.pilarTalentoMigrante).click();
        cy.get(this.pilarTalentoMigrante).find('a').click();
    }

    gotoPilaresRiesgoExclusion() {
        cy.get(this.pilarRiesgoExclusion).click();
        cy.get(this.pilarRiesgoExclusion).find('a').click();
    }

    gotoPilaresReconversionLaboral() {
        cy.get(this.pilarReconversionLaboral).click();
        cy.get(this.pilarReconversionLaboral).find('a').click();
    }

    gotoFooterParticulares() {
        cy.get(this.footerParticulares, { timeout: 10000 })
          .scrollIntoView()
          .should('be.visible')
          .click();
    }

    gotoFooterContacto() {
        cy.get(this.footerContacto).click();
    }

    gotoFooterInstagram() {
        cy.get(this.footerInstagram)
          .should('have.attr', 'href')
          .and('include', 'https://www.instagram.com/qualisophy/');
    }

    gotoFooterTwitter() {
        cy.get(this.footerTwitter)
          .should('have.attr', 'href')
          .and('include', 'https://x.com/qualisophy');
    }

    gotoFooterLinkedIn() {
        cy.get(this.footerLinkedIn)
          .should('have.attr', 'href')
          .and('include', 'https://www.linkedin.com/company/qualisophy/');
    }

}

export const inicio = new Inicio();



// import { Login } from './Login';

// export class Inventory {
    
// crear(nombre: string) {
//         cy.get(this.crearTarea).type(nombre + '{enter}');
//         cy.get(this.nombreTarea).eq(0).should('contain', nombre);
//     }

//     crearMultiple(nombre: string, id: number) {
//         cy.get(this.crearTarea).type(nombre + '{enter}');
//         cy.get(this.nombreTarea).eq(id).should('contain', nombre);
//     }

//     completar() {
//         this.crear('Tarea 1');
//         cy.get(this.indiceTarea).eq(0).should('not.have.class', 'completed');
//         cy.get(this.checkTarea).eq(0).click();
//         cy.get(this.indiceTarea).eq(0).should('have.class', 'completed');
//     }

//     descompletar() {
//         this.completar();
//         cy.get(this.checkTarea).eq(0).click();
//         cy.get(this.indiceTarea).eq(0).should('not.have.class', 'completed');
//     }

//     editar() {
//         this.crear('Tarea 1');
//         cy.get(this.indiceTarea).eq(0).dblclick();
//         cy.get(this.indiceTarea).eq(0).find(this.editarTarea).type('La tarea ha sido modificada{enter}');
//         cy.get(this.nombreTarea).eq(0).should('contain', 'La tarea ha sido modificada');
//     }

//     borrar() {
//         this.crear('Tarea 1');
//         cy.get(this.eliminarTarea).click({ force: true });
//         cy.get(this.nombreTarea).should('not.exist');
//     }

    // filtrar() {
    //     this.crearMultiple('Tarea 1', 0);
    //     this.crearMultiple('Tarea 2', 1);
    //     this.crearMultiple('Tarea 3', 2);
    //     this.crearMultiple('Tarea 4', 3);
    //     cy.get(this.checkTarea).eq(0).click();
    //     cy.get(this.checkTarea).eq(1).click();
    //     cy.get(this.filtroCompletadas).click();
    //     cy.get(this.nombreTarea).eq(0).should('contain', 'Tarea 1');
    //     cy.get(this.nombreTarea).eq(1).should('contain', 'Tarea 2');
    //     cy.get(this.indiceTarea).eq(0).should('have.class', 'completed');
    //     cy.get(this.indiceTarea).eq(1).should('have.class', 'completed');
    //     cy.get(this.indiceTarea).eq(2).should('not.exist');
    //     cy.get(this.indiceTarea).eq(3).should('not.exist');
    //     cy.get(this.filtroActivas).click();
    //     cy.get(this.nombreTarea).eq(0).should('contain', 'Tarea 3');
    //     cy.get(this.nombreTarea).eq(1).should('contain', 'Tarea 4');
    //     cy.get(this.indiceTarea).eq(0).should('not.have.class', 'completed');
    //     cy.get(this.indiceTarea).eq(1).should('not.have.class', 'completed');
    //     cy.get(this.indiceTarea).eq(2).should('not.exist');
    //     cy.get(this.indiceTarea).eq(3).should('not.exist');
    //     cy.get(this.filtroTodas).click();
    // }


//     constructor(page) {
//         // Links
//         this.page = page;
//         this.web = 'https://www.saucedemo.com/inventory.html';
//         this.urlAbout = 'https://www.saucelabs.com';
//         this.urlLogout = 'https://www.saucedemo.com';
        
//         // Sidebar Menu
//         this.btnMenu = page.locator('.react-burger-menu-btn');
//         this.btnMenuClose = page.locator('.react-burger-cross-btn');
//         this.btnMenuAllItems = page.getByTestId('inventory-sidebar-link');
//         this.btnMenuAbout = page.getByTestId('about-sidebar-link');
//         this.btnMenuLogout = page.getByTestId('logout-sidebar-link');
//         this.btnMenuReset = page.getByTestId('reset-sidebar-link');
        
//         // Header
//         this.logo = page.locator('.app_logo');
//         this.btnShoppingCart = page.getByTestId('shopping-cart-link');
//         this.pageTitle = page.getByTestId('title');
//         this.lstFilters = page.getByTestId('product-sort-container');
        
//         // Products List
//         this.inventoryList = page.getByTestId('inventory_list');
//         this.inventoryItem = page.getByTestId('inventory_item');
//         this.itemImage = page.getByTestId('inventory-item-sauce-labs-backpack-img');
//         this.itemName = page.getByTestId('inventory-item-name');
//         this.itemDescription = page.getByTestId('inventory-item-desc');
//         this.itemPrice = page.getByTestId('inventory-item-price');
//         this.btnAddToCart = page.getByTestId(/add-to-cart/);
//         this.btnRemoveFromCart = page.getByTestId(/remove/);
        
//         // Footer
//         this.btnTwitter = page.getByTestId('social-twitter');
//         this.btnFacebook = page.getByTestId('social-facebook');
//         this.btnLinkedin = page.getByTestId('social-linkedin');
//         this.copyright = page.getByTestId('footer-copy');
//     }

//     // Methods
//     async goto() {
//         await this.page.goto(this.web);
//     }

//     async gotoAllItems() {
//         await this.btnMenuAllItems.click();
//         await expect(this.page).toHaveURL(this.web);
//     }

//     async gotoAbout() {
//         await this.btnMenuAbout.click();
//         await expect(this.page).toHaveURL(this.urlAbout);
//     }

//     async logout() {
//         await this.btnMenuLogout.click();
//         await expect(this.page).toHaveURL(this.urlLogout);
//     }

//     async reset() {
//         await this.btnMenuReset.click();
//         await expect(this.btnRemoveFromCart).toHaveCount(0);

//         const count = await this.btnAddToCart.count();
//         for (let i = 0; i < count; i++) {
//             await expect(this.btnAddToCart.nth(i)).toBeVisible();
//         }
//     }

//     async orderByNameAtoZ() {
//         await this.lstFilters.selectOption('az');
//     }

//     async orderByNameZtoA() {
//         await this.lstFilters.selectOption('za');
//     }

//     async orderByPriceLowToHigh() {
//         await this.lstFilters.selectOption('lohi');
//     }

//     async orderByPriceHighToLow() {
//         await this.lstFilters.selectOption('hilo');
//     }

//     async addToCart(i) {
//         await this.btnAddToCart.nth(i).click();
//         await expect(this.btnRemoveFromCart.nth(i)).toBeVisible();
//     }

//     async removeFromCart(i) {
//         await this.addToCart(i);
//         await this.btnRemoveFromCart.nth(i).click();
//         await expect(this.btnAddToCart.nth(i)).toBeVisible();
//     }

//     async testAllAddToCartButtons() {
//         const count = await this.btnAddToCart.count();

//         for (let i = 0; i < count; i++) {
//             await this.btnAddToCart.nth(i).click();
//             await expect(this.btnRemoveFromCart.nth(i)).toBeVisible();
//         }
//     }

//     async testAllRemoveFromCartButtons() {
//         await this.testAllAddToCartButtons();
//         const count = await this.btnRemoveFromCart.count();

//         for (let i = 0; i < count; i++) {
//             await this.btnRemoveFromCart.nth(i).click();
//             await expect(this.btnAddToCart.nth(i)).toBeVisible();
//         }
//     }

// }