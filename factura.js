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
    
    try {
        let factura = realm.objects('Factura');
        
        if(factura){
            response.status(200).json(factura);
          }else{
            console.log('No hay facturas');
        }
    } catch (error) {
        
    }
    
    
   
    

}
const getFactura = (request, response) =>{
    try {
        let factura = realm.objects('Factura');
        let idFactura = factura.filtered('id = "id"');
        
        if(factura){
            response.status(200).json(idfactura);
          }else{
            response.status(403).json("No existe esa factura con ese ID");
            return;
        }
    } catch (error) {
        
    }


}
const removeFactura = (request, response) =>{

    try {
        let factura = realm.objects('Factura');
        let idFactura = factura.filtered('id = "id"');
        
        if(factura){
            realm.delete(idFactura);
          }else{
            response.status(403).json("No existe esa factura con ese ID");
            return;
        }
    } catch (error) {
        
    }
}





module.exports = {
    createFactura,
    updateFactura,
    getFacturas,
    getFactura,
    removeFactura,
    FacturaSchema
}
