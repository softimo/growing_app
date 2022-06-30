import Productos from './controllers/configuracion/productos'

const content =  document.getElementById("windowroot")
export async function router(route) {
    content.innerHTML = ""
  switch (route) {
    case "#/abm_clientes":
        break;   
    case "#/abm_proveedores":
      break;

    case "#/abm_depositos":
      break;

    case "#/abm_facturacion":
      break;
    case "#/abm_productos":
        return content.appendChild(await Productos())
     

    case "#/facturas":
      break;

    case "#/remitos":
      break;

    case "#/notascredito":
      break;

    case "#/notasdebito":
      break;

    case "#/oc":
      break;

    case "#/transito":
      break;

    case "#/inventario":
      break;

    case "#/pedidos":
      break;

    case "#/transporte":
      break;

    case "#/almacenes":
      break;

    case "#/nueva_venta":
      break;

    case "#/cuenta_corriente":
      break;

    case "#/presupuesto":
      break;

    case "#/facturacion":
      break;

    default:
      return "404";
  }
}
