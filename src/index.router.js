import Productos from "./controllers/configuracion/abm_productos";
import Clientes from "./controllers/configuracion/abm_clientes";
import Usuarios from "./controllers/configuracion/abm_usuarios";
import NewProducto from "./controllers/configuracion/a_producto";

const content = document.getElementById("windowroot");
export async function router(route) {
  content.innerHTML = "";
  switch (route) {
    case "#/abm_productos":
      return content.appendChild(await Productos());

    case "#/crear_producto":
        return content.appendChild(await NewProducto());
      
    case "#/abm_clientes":
      return content.appendChild(await Clientes());

    case "#/abm_usuarios":
      return content.appendChild(await Usuarios());
    default:
      return "404";
  }
}
