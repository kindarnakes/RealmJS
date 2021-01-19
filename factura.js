let realm = require("realm");
let clienteModel =  require('./cliente');


realm.open({schema: [clienteModel.ClienteSchema, FacturaSchema]})

const FacturaSchema = {
    name: 'Factura',
    primaryKey: 'id',
    propierties:{
        id: 'string',
        importe: {type: 'float', default: 0.0},
        fecha: 'date',
        cliente: {type: 'linkingObjects', objectType: 'Cliente', property: 'facturas'}
    }
};



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
