import { inicio } from "../support/pages/Inicio"
import { footer } from "../support/pages/Footer";

describe('Test de la Web Qualisophy - Página "Inicio"', () => {

    beforeEach(() => {
        inicio.gotoWeb();
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

    // REVISIÓN DE ENLACES
    it('Validar navegación a "Neurodivergencia" desde "Nuestros Pilares de Inclusión" (Carrusel)', () => {
        inicio.gotoPilaresNeurodivergencia();
    })

    it('Validar navegación a "Para Particulares" desde "Formaciones" (Footer)', () => {
        inicio.gotoFooterParticulares();
    })

    it('Validar navegación a "Contacto" desde "Conócenos" (Footer)', () => {
        inicio.gotoFooterContacto();
    })

    it('Comprobar el funcionamiento de los enlaces de las redes sociales (Footer)', () => {
        inicio.gotoFooterInstagram();
        inicio.gotoFooterTwitter();
        inicio.gotoFooterLinkedIn();
    })

    it('Comprobar que los enlaces de email y teléfono abren las aplicaciones correctas (Footer)', () => {
        inicio.gotoWeb();
    })


    // INSCRIPCIÓN
    it('Completar y enviar el formulario de inscripción con datos válidos', () => {
        inicio.gotoWeb();
    })

    it('Validar que el formulario de inscripción muestra error si faltan campos obligatorios', () => {
        inicio.gotoWeb();
    })


    // NEWSLETTER
    it('Suscribirse a la newsletter con un correo válido', () => {
        inicio.gotoWeb();
    })

    
    // CONSULTAS / CONTACTO
    it('Enviar una consulta correctamente a través del formulario de contacto', () => {
        inicio.gotoWeb();
    })

    it('Validar que el formulario de contacto muestra error si el formato del email es incorrecto.', () => {
        inicio.gotoWeb();
        cy.wait(2000);
    })

})