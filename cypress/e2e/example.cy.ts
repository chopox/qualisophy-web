import { gestionTareas } from "../support/pages/example"

describe('Test con POM de la Web Qualisophy', () => {

    beforeEach(() => {
        gestionTareas.abrirWeb();
    })

    it('Comprobar que se puede crear una tarea', () => {
        gestionTareas.crear('Tarea 1');
    })
    
    it('Comprobar que se puede marcar una tarea como completada', () => {
        gestionTareas.completar();
    })
    
    it('Comprobar que se puede desmarcar una tarea como completada', () => {
        gestionTareas.descompletar();
    })

    it('Comprobar que se puede editar una tarea existente', () => {
        gestionTareas.editar();
    })

    it('Comprobar que se puede borrar una tarea existente', () => {
        gestionTareas.borrar();
    })

    it('Comprobar que funcionan correctamente los filtros', () => {
        gestionTareas.filtrar();
    })
})