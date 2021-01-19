let express = require("express");
let app = express();
let cors = require("cors");
let bodyParser  = require("body-parser");
let port=3000;
//let facturas =  require('./factura');
let clientes =  require('./cliente');

app.use(bodyParser.urlencoded({ limit:'50mb',extended: true }));
app.use(bodyParser.json({ limit:'50mb',extended: true }));
app.use(cors());

let router=express.Router();


router.get('/clientes', clientes.getClientes);
router.get('/cliente/:id', clientes.removeCliente);
router.post('/cliente', clientes.createCliente);
router.put('/cliente/:id', clientes.updateCliente);
router.delete('/cliente/:id', clientes.removeCliente);

/*
router.get('/facturas', facturas.getFacturas);
router.get('/factura/:id', facturas.getFactura);
router.post('/factura/:id', facturas.createFactura);
router.put('/factura/:id', facturas.updateFactura);
router.delete('/factura/:id', facturas.removeFactura);

*/
app.use(router);
app.listen(process.env.PORT || port,()=>{
    console.log("Arrancando en http://localhost:3000");
})