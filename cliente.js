let realm = require("realm");
let model = require('./schemas');


const createCliente = (request, response) => {
  if (request.body) {
    console.log(request.body);
    try {
      realm.open({ schema: [model.ClienteSchema, model.FacturaSchema] }).then(realm => {
        try {
          realm.write(() => {
            let cliente = {
              nombre: request.body.nombre, dni: request.body.dni, telefono: parseInt(request.body.telefono),
              facturas: request.body.facturas, fecha_nacimiento: request.body.fecha_nacimiento
            }

            for (let factura of cliente.facturas) {
              factura.cliente = cliente;
            }
            console.log(cliente);
            realm.create('Cliente', cliente);
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
const updateCliente = (request, response) => {
  if (request.body) {
    console.log(request.body);
    try {
      realm.open({ schema: [model.ClienteSchema, model.FacturaSchema] }).then(realm => {
        try {
          let cliente = {
            nombre: request.body.nombre, dni: request.body.dni, telefono: parseInt(request.body.telefono),
            facturas: request.body.facturas, fecha_nacimiento: request.body.fecha_nacimiento
          }

          for (let factura of cliente.facturas) {
            factura.cliente = cliente;
          }
          realm.write(() => {
            realm.create('Cliente', cliente, 'modified');
            console.log(cliente);
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
const getClientes = (request, response) => {
  try {
    let clientes;
    let sendClients = [];

    realm.open({ schema: [model.ClienteSchema, model.FacturaSchema] }).then(realm => {
      clientes = realm.objects('Cliente');

      if (clientes) {
        for (let cliente of clientes) {
          let facturas = [];
          for (let factura of cliente.facturas) {
            facturas.push(factura.id);
          }
          let sendClient = {
            nombre: cliente.nombre,
            dni: cliente.dni,
            telefono: cliente.telefono,
            facturas: facturas,
            fecha_nacimiento: cliente.fecha_nacimiento
          }
          sendClients.push(sendClient);
        }
        console.log(clientes);
        console.log(sendClients);
        response.status(200).json(sendClients);
      } else {
        response.status(403).json('No hay clientes');
        console.log('No hay Clientes');
      }
    });

  } catch (error) {
    console.log(error)
  }

}
const getCliente = (request, response) => {
  try {
    realm.open({ schema: [model.ClienteSchema, model.FacturaSchema] }).then(realm => {
      console.log(request.params.id);
      let clientes = realm.objects('Cliente').filtered('dni = $0', request.params.id);
      let sendClients = [];
      if (clientes) {
        for (let cliente of clientes) {
          let facturas = [];
          for (let factura of cliente.facturas) {
            facturas.push(factura.id);
          }
          let sendClient = {
            nombre: cliente.nombre,
            dni: cliente.dni,
            telefono: cliente.telefono,
            facturas: facturas,
            fecha_nacimiento: cliente.fecha_nacimiento
          }
          sendClients.push(sendClient);
        }

        console.log(clientes);
        console.log(sendClients);
        response.status(200).json(sendClients);
      } else {
        response.status(403).json('No hay clientes');
        console.log('No hay Clientes');
      }

    })
  } catch (error) {
    console.log(error)
  }

}

const removeCliente = (request, response) => {

  try {
    realm.open({ schema: [model.ClienteSchema, model.FacturaSchema] }).then(realm => {
      console.log(request.params.id);
      let cliente = realm.objects('Cliente').filtered('dni = $0', request.params.id);
      if (cliente) {
        realm.write(() => {
          try {
            for(let client of cliente){
            for (let factura of client.facturas) {
              realm.delete(factura);
            }}
            realm.delete(cliente);
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
  createCliente,
  updateCliente,
  getCliente,
  getClientes,
  removeCliente
}
