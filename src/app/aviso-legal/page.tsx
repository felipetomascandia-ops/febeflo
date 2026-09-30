import LegalDocument from '../../components/LegalDocument';

export default function LegalNoticePage() {
  return <LegalDocument eyebrow="FEBEFLO" title="Aviso legal" sections={[
    { title: 'Titular del sitio', paragraphs: ['Nombre comercial: FEBEFLO.', 'Titular: Andrea Graciela Catalan Silva', 'RUT: 15.360.881-4.', 'Actividad: comercialización de productos de moda y vestuario.', 'Domicilio comercial: Persa Teniente Cruz, segundo bandejón, tercer pasillo, local 788, Pudahuel, Región Metropolitana.', 'Dirección para gestionar productos con fallas: Edison 5042, Quinta Normal, Región Metropolitana.', 'Correo electrónico y teléfono de contacto: agctalans@febeflo.com / +56 9 9123 6666'] },
    { title: 'Propiedad intelectual', paragraphs: ['Los textos, fotografías, logotipos, diseños, elementos gráficos y código del sitio pertenecen a FEBEFLO o se utilizan con autorización. No se permite su reproducción, distribución o uso comercial sin autorización previa, salvo los usos permitidos por la ley.'] },
    { title: 'Información al consumidor', paragraphs: ['La información publicada debe ser veraz, comprobable, clara y oportuna. Las condiciones objetivas anunciadas forman parte de la información de la oferta, conforme a la normativa de protección al consumidor.'] },
    { title: 'Revisión pendiente', paragraphs: ['El abogado responsable debe confirmar que la individualización, el giro declarado y los datos de contacto coincidan con los antecedentes tributarios vigentes antes de publicar.'] },
  ]} />;
}
