let realm = require("realm");
let facturaModel = require('./factura');

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



const createCliente = (request, response) => {
  if (request.body) {
    console.log(request.body);
    try {
      realm.open({ schema: [ClienteSchema, facturaModel.FacturaSchema] }).then(realm => {
        try {
          realm.write(() => {
            realm.create('Cliente', {
              nombre: request.body.nombre, dni: request.body.dni, telefono: parseInt(request.body.telefono),
              facturas: request.body.facturas, fecha_nacimiento: request.body.fecha_nacimiento
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
const updateCliente = (request, response) => {
  if (request.body) {
    console.log(request.body);
    try {
      realm.open({ schema: [ClienteSchema, facturaModel.FacturaSchema] }).then(realm => {
        try {
          realm.write(() => {
            realm.create('Cliente', {
              nombre: request.body.nombre, dni: request.body.dni, telefono: parseInt(request.body.telefono),
              facturas: request.body.facturas, fecha_nacimiento: request.body.fecha_nacimiento
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
const getClientes = (request, response) => {
  try {
    realm.open({ schema: [ClienteSchema, facturaModel.FacturaSchema] }).then(realm => {
      let clientes = realm.objects('Cliente');

      if (clientes) {
        let cache = []; 
        response.status(200).json(clientes);
        /*let message = JSON.stringify(clientes, (key, value) => {
          if (typeof value === 'object' && value !== null) {
            // Duplicate reference found, discard key
            if (cache.includes(value)) return;
        
            // Store value in our collection
            cache.push(value);
          }
          return value;
        });
        console.log(message);
        response.end(JSON.parse(message));//devuelve como string*/
      } else {
        response.status(403).json('No hay clientes');
        console.log('No hay Clientes');
      }

    })
  } catch (error) {
    console.log(error)
  }

}
const getCliente = (request, response) => {
  try {
    realm.open({ schema: [ClienteSchema, facturaModel.FacturaSchema] }).then(realm => {
      console.log(request.params.id);
      let cliente = realm.objects('Cliente').filtered('dni = $0', request.params.id);
      if (cliente) {
        response.status(200).json(cliente);
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
    realm.open({ schema: [ClienteSchema, facturaModel.FacturaSchema] }).then(realm => {
      console.log(request.params.id);
      let cliente = realm.objects('Cliente').filtered('dni = $0', request.params.id);
      if (cliente) {
        realm.write(() => {
          try {
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
  removeCliente,
  ClienteSchema
}
