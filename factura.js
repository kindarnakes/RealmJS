let realm = require("realm");
let clienteModel = require('./cliente');

const FacturaSchema = {
    name: 'Factura',
    primaryKey: 'id',
    properties: {
        id: 'string',
        importe: { type: 'float', default: 0.0 },
        fecha: 'date',
        cliente_dni: 'string'
        //cliente: {type: 'linkingObjects', objectType: 'Cliente', property: 'facturas'}
    }
};

//realm.open({schema: [clienteModel.ClienteSchema, FacturaSchema]})




const createFactura = (request, response) => {
    let name = '';
    let id = '';
    let importe = '';
    let fecha;
    let cliente_dni = '';
    console.log(request.body);
    if (request.body) {
        name = request.body.name;
        id = request.body.id;
        importe = request.body.importe;
        fecha = request.body.fecha;
        cliente_dni = request.body.cliente_dni;

        try {
            realm.open({ schema: [FacturaSchema, clienteModel.ClienteSchema] }).then(realm => {
                try {
                    realm.write(() => {


                        realm.create('Factura', {

                            id: id, importe: importe, fecha: fecha, cliente_dni: cliente_dni

                        });
                        response.status(200).json('done');
                    });
                } catch (err) {
                    console.log(err);
                    response.status(409).json('Not done, key repeat');
                }
            });
        } catch (e) {
            response.status(409).json('Not done');
            console.log("Error on creation");
        }
    }
}

const updateFactura = (request, response) => {
    let name = '';
    let id = '';
    let importe = '';
    let fecha;
    let cliente_dni = '';
    console.log(request.body);
    if (request.body) {
        name = request.body.name;
        id = request.body.id;
        importe = request.body.importe;
        fecha = request.body.fecha;
        cliente_dni = request.body.cliente_dni;

        try {
            realm.open({ schema: [FacturaSchema, clienteModel.ClienteSchema] }).then(realm => {
                try {
                    realm.write(() => {


                        realm.create('Factura', {

                            id: id, importe: importe, fecha: fecha, cliente_dni: cliente_dni

                        }, 'modified');
                        response.status(200).json('done');
                    });
                } catch (err) {
                    console.log(err);
                    response.status(409).json('Not done, key repeat');
                }
            });
        } catch (e) {
            response.status(409).json('Not done');
            console.log("Error on creation");
        }
    }
}
const getFacturas = (request, response) => {

    try {
        realm.open({ schema: [FacturaSchema, clienteModel.ClienteSchema] }).then(realm => {
            let factura = realm.objects('Factura');

            if (factura) {
                response.status(200).json(factura);
            } else {
                console.log('No hay facturas');
            }
        })
    } catch (error) {
        response.status(403).json('No hay facturas');
        console.log('No hay facturas');

    }


}


const getFactura = (request, response) => {
    try {
        realm.open({ schema: [FacturaSchema, clienteModel.ClienteSchema] }).then(realm => {
            let factura = realm.objects('Factura');
            let idFactura = factura.filtered('id = $0', request.params.id);

            if (idFactura) {
                response.status(200).json(idFactura);
            } else {
                response.status(403).json("No existe esa factura con ese ID");
                return;
            }
        })
    } catch (error) {
        response.status(403).json('No hay facturas');
        console.log('No hay facturas');

    }


}
const removeFactura = (request, response) => {

    try {
        realm.open({ schema: [FacturaSchema, clienteModel.ClienteSchema] }).then(realm => {
            console.log(request.params.id);
            let factura = realm.objects('Factura').filtered('id = $0', request.params.id);
            if (factura) {
                realm.write(() => {
                    try {
                        realm.delete(factura);
                        response.status(200).json('removed');
                    } catch (err) {
                        console.log(err);
                        response.status(403).json('Not removed');
                    }
                });
            } else {
                response.status(403).json('Not removed');
            }
        })
    } catch (error) {
        response.status(403).json('Not removed');
        console.log(error)
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
