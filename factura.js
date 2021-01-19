let realm = require("realm");
let clienteModel =  require('./cliente');

const FacturaSchema = {
    name: 'Factura',
    primaryKey: 'id',
    properties:{
        id: 'string',
        importe: {type: 'float', default: 0.0},
        fecha: 'date',
        cliente: {type: 'linkingObjects', objectType: 'Cliente', property: 'facturas'}
    }
};

realm.open({schema: [clienteModel.ClienteSchema, FacturaSchema]})




const createFactura = (request, response) =>{

}
const updateFactura = (request, response) =>{

}
const getFacturas = (request, response) =>{

}
const getFactura = (request, response) =>{


}
const removeFactura = (request, response) =>{

}





module.exports = {
    createFactura,
    updateFactura,
    getFacturas,
    getFactura,
    removeFactura,
    FacturaSchema
}
