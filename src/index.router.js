import Productos from "./controllers/configuracion/abm_productos";
import Clientes from "./controllers/configuracion/abm_clientes";

const content = document.getElementById("windowroot");
export async function router(route) {
  content.innerHTML = "";
  switch (route) {
    case "#/abm_productos":
      return content.appendChild(await Productos());

    case "#/abm_clientes":
        return content.appendChild(await Clientes());
     
     default:
      return "404";
  }
}
