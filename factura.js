let realm = require("realm");
let model = require("./schemas");



const createFactura = (request, response) => {
    let id = '';
    let importe = '';
    let fecha;
    let cliente_dni = '';
    console.log(request.body);
    if (request.body) {
        id = request.body.id;
        importe = request.body.importe;
        fecha = request.body.fecha;
        cliente_dni = request.body.cliente_dni;

        try {
            realm.open({ schema: [model.ClienteSchema, model.FacturaSchema] }).then(realm => {
                try {
                    realm.write(() => {
                        let cliente = realm.objects('Cliente').filtered('dni = $0', cliente_dni);
                        let factura = {
                            id: id, importe: importe, fecha: fecha, cliente: cliente[0]
                        }
                        if (cliente[0]) {
                            //realm.create('Factura', factura);
                            cliente[0].facturas.push(factura);
                            realm.create('Cliente', cliente[0], 'modified');
                            console.log(factura);
                            response.status(200).json('done');
                        }else{
                            response.status(403).json('Client no exists');
                        }
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
    let id = '';
    let importe = '';
    let fecha;
    console.log(request.body);
    if (request.body) {
        name = request.body.name;
        id = request.body.id;
        importe = request.body.importe;
        fecha = request.body.fecha;

        try {
            realm.open({ schema: [model.ClienteSchema, model.FacturaSchema] }).then(realm => {
                try {
                    realm.write(() => {
                        let facturaOrigen = realm.objects('Factura').filtered('id = $0', request.params.id);
                        let cliente = facturaOrigen[0].cliente[0];
                        let factura = {
                            id: id, importe: importe, fecha: fecha, cliente: cliente
                        }
                        if (cliente) {
                            realm.create('Factura', factura, 'modified');
                            console.log(factura);
                            response.status(200).json('done');
                        }
                    });
                } catch (err) {
                    console.log(err);
                    response.status(409).json('Not done');
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
        realm.open({ schema: [model.ClienteSchema, model.FacturaSchema] }).then(realm => {
            let facturasOrigen = realm.objects('Factura');
            let sendFacturas = [];

            for (let facturaOrigen of facturasOrigen) {
                let clientes = realm.objects('Cliente').filtered('dni = $0', facturaOrigen.cliente[0].dni);
                if (clientes) {
                    let sendFactura = {
                        id: facturaOrigen.id,
                        importe: facturaOrigen.importe,
                        fecha: facturaOrigen.fecha,
                        cliente: clientes[0].dni
                    }
                    sendFacturas.push(sendFactura);
                }
            }

            if (sendFacturas.length > 0) {
                console.log(facturasOrigen);
                console.log(sendFacturas);
                response.status(200).json(sendFacturas);
            } else {
                response.status(200).json('Empty');
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
        realm.open({ schema: [model.ClienteSchema, model.FacturaSchema] }).then(realm => {
            let factura = realm.objects('Factura');
            let facturasOrigen = factura.filtered('id = $0', request.params.id);
            let sendFacturas = [];

            for (let facturaOrigen of facturasOrigen) {
                let clientes = realm.objects('Cliente').filtered('dni = $0', facturaOrigen.cliente[0].dni);
                let sendClient;
                if (clientes) {
                    console.log(sendClient);
                    let sendFactura = {
                        id: facturaOrigen.id,
                        importe: facturaOrigen.importe,
                        fecha: facturaOrigen.fecha,
                        cliente: clientes[0].dni
                    }
                    sendFacturas.push(sendFactura);
                }
            }

            if (sendFacturas.length > 0) {
                console.log(facturasOrigen);
                console.log(sendFacturas);
                response.status(200).json(sendFacturas);
            } else {
                response.status(200).json('Don\'t exist');
                console.log('No hay facturas');
            }
        })
    } catch (error) {
        response.status(403).json('No hay facturas');
        console.log('No hay facturas');

    }


}


const removeFactura = (request, response) => {

    try {
        realm.open({ schema: [model.ClienteSchema, model.FacturaSchema] }).then(realm => {
            let factura = realm.objects('Factura').filtered('id = $0', request.params.id);
            if (factura) {
                realm.write(() => {
                    try {
                        realm.delete(factura);
                        response.status(200).json('done');
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
    removeFactura
}
