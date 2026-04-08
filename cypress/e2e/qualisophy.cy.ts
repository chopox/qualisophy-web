import { pilares } from "../support/pages/InclusionPillars";
import { footer } from "../support/pages/Footer";

describe('Test de la Web Qualisophy - Página "Inicio"', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4321/');
    })

    // REVISIÓN DE ENLACES
    it('Validar navegación a "Neurodivergencia" desde "Nuestros Pilares de Inclusión" (Carrusel)', () => {
        pilares.gotoNeurodivergencia();
    })

    it('Validar navegación a "Para Particulares" desde "Formaciones" (Footer)', () => {
        footer.gotoParticulares();
    })

    it('Validar navegación a "Contacto" desde "Conócenos" (Footer)', () => {
        footer.gotoContacto();
    })

    it('Comprobar el funcionamiento de los enlaces de las redes sociales (Footer)', () => {
        footer.gotoInstagram();
        footer.gotoTwitter();
        footer.gotoLinkedIn();
    })

    it('Comprobar que los enlaces de email y teléfono abren las aplicaciones correctas (Footer)', () => {
        footer.enviarCorreo();
        footer.realizarLlamada();
    })


    // INSCRIPCIÓN
    it('Completar y enviar el formulario de inscripción con datos válidos', () => {
        footer.gotoInicio();
    })

    it('Validar que el formulario de inscripción muestra error si faltan campos obligatorios', () => {
        footer.gotoInicio();
    })


    // NEWSLETTER
    it('Suscribirse a la newsletter con un correo válido', () => {
        footer.gotoInicio();
    })

    
    // CONSULTAS / CONTACTO
    it('Enviar una consulta correctamente a través del formulario de contacto', () => {
        footer.gotoInicio();
    })

    it('Validar que el formulario de contacto muestra error si el formato del email es incorrecto.', () => {
        footer.gotoInicio();
        cy.wait(2000);
    })

    it('TEST DE FUNCIONES DE PILARES', () => {
        pilares.gotoNeurodivergencia();
        pilares.gotoEntornoRural();
        pilares.gotoTalentoMigrante();
        pilares.gotoRiesgoExclusion();
        pilares.gotoReconversionLaboral();
    })

    it('TEST DE FUNCIONES DEL FOOTER', () => {
        footer.gotoInicio();
        footer.gotoNeurodivergencia();
        footer.gotoEntornoRural();
        footer.gotoTalentoMigrante();
        footer.gotoRiesgoExclusion();
        footer.gotoParticulares();
        footer.gotoPartnership();
        footer.gotoEquipo();
        footer.gotoBlog();
        footer.gotoContacto();
        footer.gotoInstagram();
        footer.gotoTwitter();
        footer.gotoLinkedIn();
    })

})

/*     it('TEST DE FUNCIONES DE PILARES', () => {
        pilares.gotoNeurodivergencia();
        pilares.gotoEntornoRural();
        pilares.gotoTalentoMigrante();
        pilares.gotoRiesgoExclusion();
        pilares.gotoReconversionLaboral();
    }) */


/*     it('TEST DE FUNCIONES DEL FOOTER', () => {
        footer.gotoInicio();
        footer.gotoNeurodivergencia();
        footer.gotoEntornoRural();
        footer.gotoTalentoMigrante();
        footer.gotoRiesgoExclusion();
        footer.gotoParticulares();
        footer.gotoPartnership();
        footer.gotoEquipo();
        footer.gotoBlog();
        footer.gotoContacto();
        footer.gotoInstagram();
        footer.gotoTwitter();
        footer.gotoLinkedIn();
    }) */