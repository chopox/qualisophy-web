export class Tareas {
    
    web = 'https://www.todomvc.com/examples/react/dist/';
    nombreTarea = '[data-testid="todo-item-label"]';
    indiceTarea = '.todo-list li';
    crearTarea = '.new-todo';
    editarTarea = '[data-testid="text-input"]';
    eliminarTarea = ':nth-child(1) > .view > .destroy';
    checkTarea = '[data-testid="todo-item-toggle"]';
    filtroTodas = '[data-testid="footer-navigation"] a:contains("All")';
    filtroActivas = '[data-testid="footer-navigation"] a:contains("Active")';
    filtroCompletadas = '[data-testid="footer-navigation"] a:contains("Completed")';cr

    abrirWeb() {
        cy.visit(this.web);
    }

    crear(nombre: string) {
        cy.get(this.crearTarea).type(nombre + '{enter}');
        cy.get(this.nombreTarea).eq(0).should('contain', nombre);
    }

    crearMultiple(nombre: string, id: number) {
        cy.get(this.crearTarea).type(nombre + '{enter}');
        cy.get(this.nombreTarea).eq(id).should('contain', nombre);
    }

    completar() {
        this.crear('Tarea 1');
        cy.get(this.indiceTarea).eq(0).should('not.have.class', 'completed');
        cy.get(this.checkTarea).eq(0).click();
        cy.get(this.indiceTarea).eq(0).should('have.class', 'completed');
    }

    descompletar() {
        this.completar();
        cy.get(this.checkTarea).eq(0).click();
        cy.get(this.indiceTarea).eq(0).should('not.have.class', 'completed');
    }

    editar() {
        this.crear('Tarea 1');
        cy.get(this.indiceTarea).eq(0).dblclick();
        cy.get(this.indiceTarea).eq(0).find(this.editarTarea).type('La tarea ha sido modificada{enter}');
        cy.get(this.nombreTarea).eq(0).should('contain', 'La tarea ha sido modificada');
    }

    borrar() {
        this.crear('Tarea 1');
        cy.get(this.eliminarTarea).click({ force: true });
        cy.get(this.nombreTarea).should('not.exist');
    }

    filtrar() {
        this.crearMultiple('Tarea 1', 0);
        this.crearMultiple('Tarea 2', 1);
        this.crearMultiple('Tarea 3', 2);
        this.crearMultiple('Tarea 4', 3);
        cy.get(this.checkTarea).eq(0).click();
        cy.get(this.checkTarea).eq(1).click();
        cy.get(this.filtroCompletadas).click();
        cy.get(this.nombreTarea).eq(0).should('contain', 'Tarea 1');
        cy.get(this.nombreTarea).eq(1).should('contain', 'Tarea 2');
        cy.get(this.indiceTarea).eq(0).should('have.class', 'completed');
        cy.get(this.indiceTarea).eq(1).should('have.class', 'completed');
        cy.get(this.indiceTarea).eq(2).should('not.exist');
        cy.get(this.indiceTarea).eq(3).should('not.exist');
        cy.get(this.filtroActivas).click();
        cy.get(this.nombreTarea).eq(0).should('contain', 'Tarea 3');
        cy.get(this.nombreTarea).eq(1).should('contain', 'Tarea 4');
        cy.get(this.indiceTarea).eq(0).should('not.have.class', 'completed');
        cy.get(this.indiceTarea).eq(1).should('not.have.class', 'completed');
        cy.get(this.indiceTarea).eq(2).should('not.exist');
        cy.get(this.indiceTarea).eq(3).should('not.exist');
        cy.get(this.filtroTodas).click();
    }

}

export const gestionTareas = new Tareas();