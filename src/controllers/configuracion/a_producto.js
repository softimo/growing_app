import NewProducto from "../../views/configuracion/newProducto_form.html";
import {
  getAll,
  postBody,
  getById,
  updatebyId,
  deletebyId,
} from "../../model/APImodel";
import swal from 'sweetalert';
import moment from 'moment';

export default async () => {
  const productoForm = NewProducto;
  const divElement = document.createElement("div");
  
  divElement.innerHTML = productoForm;
  
  divElement.addEventListener("click", async (e) => {
    switch (e.target.id) {
      case "btn_CreateProducto":
        const res = await obteneryEnviarFormData();
        if (res.status === 200) {
          swal("", "Producto creado con exito", "success");
          window.location.hash = "#/abm_productos"
        }
        break;
     default:
        break;
    }
  });

   return divElement;
};

async function obteneryEnviarFormData() {
  const codigo_nuevo_producto = document.getElementById(
    "codigo_nuevo_producto"
  ).value;
  const descripcion_nuevo_producto = document.getElementById(
    "descripcion_nuevo_producto"
  ).value;
  const existencias_nuevo_producto = document.getElementById(
    "existencias_nuevo_producto"
  ).value;
  const precio_nuevo_producto = document.getElementById(
    "precio_nuevo_producto"
  ).value;
  const categoria_nuevo_producto = document.getElementById(
    "categoria_nuevo_producto"
  ).value;

  const body = {
    codigo: codigo_nuevo_producto,
    descripcion: descripcion_nuevo_producto,
    existencias: existencias_nuevo_producto,
    precio: precio_nuevo_producto,
    categoria: categoria_nuevo_producto,
  };
  const urlPost  ="http://localhost:3000/sku/create"
  const response = await postBody(urlPost, body);
  return response;
}
