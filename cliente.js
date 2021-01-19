let realm = require("realm");
//let facturaModel =  require('./factura');

const ClienteSchema = {
    name: 'Cliente',
    primaryKey: 'dni',
    properties:{
        nombre: 'string',
        dni: 'string',
        telefono: {type: 'int', default: 0},
        //facturas: 'Factura[]',
        fecha_nacimiento: 'date?'
    }
};


realm.open({schema: [ClienteSchema/*, facturaModel.FacturaSchema*/]})




const createCliente = (request, response) =>{
    if(request.body){
    try {
        realm.write(() => {
          realm.create('Cliente', {nombre: request.body.nombre, dni: request.dni, telefono: request.body.telefono, 
            facturas: request.body.facturas, fecha_nacimiento: request.body.fecha_nacimiento});
        });
        response.status(200);
      } catch (e) {
          response.status(409);
        console.log("Error on creation");
      }}

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
    removeCliente,
    ClienteSchema
}
