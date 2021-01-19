let realm = require("realm");
let facturaModel =  require('./factura');


const ClienteSchema = {
    name: 'Cliente',
    propierties:{
        nombre: 'string',
        dni: 'string',
        telefono: {type: 'int', default: 0},
        facturas: 'Factura[]',
        fecha_nacimiento: 'date?'
    }
};



const createCliente = (request, response) =>{

}
const updateCliente = (request, response) =>{

}
const getClientes = (request, response) =>{

}
const getCliente = (request, response) =>{

}

const removeCliente = (request, response) =>{

}



module.exports = {
    createCliente,
    updateCliente,
    getCliente,
    getClientes,
    removeCliente
}
