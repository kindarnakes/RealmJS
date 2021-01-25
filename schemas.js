
const FacturaSchema = {
    name: 'Factura',
    primaryKey: 'id',
    properties:{
        id: 'string',
        importe: {type: 'float', default: 0.0},
        fecha: 'date',
        //cliente_dni: 'string'
        cliente: {type: 'linkingObjects', objectType: 'Cliente', property: 'facturas'}
    }
};


const ClienteSchema = {
    name: 'Cliente',
    primaryKey: 'dni',
    properties: {
      nombre: 'string',
      dni: 'string',
      telefono: { type: 'int', default: 0 },
      facturas: 'Factura[]',
      fecha_nacimiento: 'date?'
    }
  };


  
  module.exports = {
      ClienteSchema,
      FacturaSchema
  }