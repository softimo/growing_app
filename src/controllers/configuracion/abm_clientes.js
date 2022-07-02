import Cliente from "../../views/configuracion/cliente.html";
import NewProducto from "../../views/configuracion/newProducto_form.html";
import {
  getAll,
  postBody,
  getById,
  updatebyId,
  deletebyId,
} from "../../model/APImodel";
import swal from 'sweetalert'

export default async () => {
  const productosList = Cliente;
  const url = "http://localhost:3000/sku/list";
  const divElement = document.createElement("div");
  divElement.innerHTML = productosList;
  const tbdoyElement = divElement.querySelector("#tableSkuTbody");

  divElement.addEventListener("click", async (e) => {
    switch (e.target.id) {
      case "btnAdd":
        divElement.innerHTML = NewProducto;
        break;
      case "btn_CreateProducto":
        const res = await obteneryEnviarFormData();
        if (res.status === 200) {
          swal("", "Producto creado con exito", "success");
        }
        break;
      case "btn_volver":
        
      default:
        break;
    }
  });

  const getAllSku = await getAll(url);
  getAllSku.data.forEach((sku) => {
    tbdoyElement.innerHTML += `
    <tr>
      <td> ${sku.codigo}</td>
      <td> ${sku.descripcion}</td>
      <td> ${sku.existencias}</td>
      <td> ${sku.precio}</td>
      <td> ${sku.categoria}</td>
      <td> ${sku.createdAt}</td>
      <td> ${sku.updatedAt}</td>
    </tr>
    `;
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

  const response = await postBody("http://localhost:3000/sku/create", body);
  return response;
}
