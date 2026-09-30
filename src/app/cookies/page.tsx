import LegalDocument from '../../components/LegalDocument';

export default function CookiesPage() {
  return <LegalDocument eyebrow="Transparencia" title="Política de cookies y almacenamiento local" sections={[
    { title: '1. Qué utiliza actualmente el sitio', paragraphs: ['La versión actual utiliza almacenamiento local del navegador para mantener la sesión, el carrito, los favoritos y datos de demostración. FEBEFLO prevé utilizar herramientas de publicidad y enviar promociones por correo; las herramientas concretas y sus proveedores deberán identificarse antes de activar campañas o medición publicitaria.'] },
    { title: '2. Tecnologías necesarias', paragraphs: ['El almacenamiento necesario para mantener funciones solicitadas por el usuario puede ser esencial para el funcionamiento de la tienda. El usuario puede borrar estos datos desde la configuración de su navegador, aunque eso puede cerrar su sesión o vaciar preferencias locales.'] },
    { title: '3. Herramientas opcionales', paragraphs: ['Si FEBEFLO incorpora Google Analytics, Meta Pixel, TikTok Pixel, publicidad, mapas, chat u otros servicios de terceros, deberá actualizar esta política, identificar cada proveedor, explicar la finalidad y solicitar el consentimiento que corresponda antes de activar tecnologías no esenciales.'] },
    { title: '4. Control', paragraphs: ['El sitio deberá implementar un mecanismo visible para aceptar, rechazar y modificar preferencias de tecnologías no esenciales antes de su activación.'] },
  ]} />;
}
