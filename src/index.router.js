import Productos from "./controllers/configuracion/abm_productos";

const content = document.getElementById("windowroot");
export async function router(route) {
  content.innerHTML = "";
  switch (route) {
    case "#/abm_proveedores":
      break;

    case "#/abm_clientes":
      break;

    case "#/abm_depositos":
      break;

    case " #/abm_afip":
      break;

    case "#/abm_productos":
      return content.appendChild(await Productos());
  
    case "#/distribucion":
      break;

    case "#/pedidos":
      break;

    case "#/stock":
      break;

    case "#/oc":
      break;

    case "#/facturacion":
      break;
    case "#/cuenta_corriente":
      break;

    case "#/presupuesto":
      break;
    case "#/caja":
      break;

    default:
      return "404";
  }
}
