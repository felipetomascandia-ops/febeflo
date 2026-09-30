import LegalDocument from '../../components/LegalDocument';

export default function ShippingPage() {
  return <LegalDocument eyebrow="Compra informada" title="Política de envíos" sections={[
    { title: '1. Cobertura', paragraphs: ['FEBEFLO realiza despachos únicamente dentro del territorio de Chile. Las comunas, regiones extremas y zonas con cobertura especial estarán sujetas a la disponibilidad del transportista.'] },
    { title: '2. Transportista, costos y plazos', paragraphs: ['El transportista encargado es Starken. El costo del despacho será de cargo del comprador y corresponderá a la tarifa que Starken cobre para el destino informado, la que deberá mostrarse antes de confirmar el pago. El plazo estimado de entrega es de 1 a 7 días hábiles.'] },
    { title: '3. Preparación y despacho', paragraphs: ['El pedido se preparará una vez confirmado el pago y se enviará a la dirección proporcionada por el consumidor. FEBEFLO comunicará la confirmación y, cuando exista, el número de seguimiento de Starken.'] },
    { title: '4. Dirección incorrecta y ausencia', paragraphs: ['El consumidor debe revisar la dirección antes de pagar. Las consecuencias de una dirección incompleta o incorrecta, los reintentos y los costos asociados deben informarse de forma clara y no pueden afectar los derechos que la ley reconozca al consumidor.'] },
    { title: '5. Retrasos, pérdida o daño', paragraphs: ['Ante retrasos, pérdida o daño del despacho, el consumidor podrá contactar a FEBEFLO en agctalans@febeflo.com o al +56 9 9123 6666. FEBEFLO gestionará el caso con Starken sin trasladar al consumidor obligaciones que legalmente correspondan al proveedor.'] },
    { title: '6. Productos con fallas', paragraphs: ['La dirección indicada para gestionar productos con fallas es Edison 5042, Quinta Normal, Región Metropolitana. Los costos y la logística asociados a una solicitud de garantía se gestionarán conforme a la Ley N° 19.496 y no se entenderán limitados por la regla del despacho ordinario.'] },
  ]} />;
}
