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
    let name = '';
    let id='';
    let importe='';
    let fecha='';
    let cliente;
    if (request.body) {
        name = request.body.name;
        id=request.body.id;
        importe = request.body.importe;
        fecha = request.body.fecha;
        cliente=request.body.cliente;

        realm.create(name, {id:this.id,importe:this.importe,fecha=this.fecha, cliente=this.cliente});
    
        if (error) {
            console.log(error);
        } else {
            //console.log(result);
            response.status(200).json(result.rows[0].id);
        }
    }
}

const updateFactura = (request, response) =>{
    let name = '';
    let id='';
    let importe='';
    let fecha='';
    let cliente;
    if (request.body) {
        name = request.body.name;
        id=request.body.id;
        importe = request.body.importe;
        fecha = request.body.fecha;
        cliente=request.body.cliente;

        realm.create(name, {id:this.id,importe:this.importe,fecha=this.fecha, cliente=this.cliente});
    
        if (error) {
            console.log(error);
        } else {
            //console.log(result);
            response.status(200).json(`Factura ${id} actualizada`);
        }
    }
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
