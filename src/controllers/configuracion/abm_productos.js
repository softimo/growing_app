import Producto from "../../views/configuracion/producto.html";
import NewProducto from "../../views/configuracion/newProducto_form.html";
import {
  getAll,
  postBody,
  getById,
  updatebyId,
  deletebyId,
} from "../../model/APImodel";
import swal from "sweetalert";
import moment from "moment";

export default async () => {
  const productosList = Producto;
  const urlGetAll = "http://localhost:3000/sku/list";
  const urlDelete = "http://localhost:3000/sku/delete";
  const urlgetById = "http://localhost:3000/sku/getone";
  const updateUrl = "http://localhost:3000/sku/update";

  const divElement = document.createElement("div");
  divElement.innerHTML = productosList;
  const tbdoyElement = divElement.querySelector("#tableSkuTbody");
  const getAllSku = await getAll(urlGetAll);

  getAllSku.data.forEach((sku) => {
    tbdoyElement.innerHTML += `
    <tr>
      <td> ${sku.codigo}</td>
      <td> ${sku.descripcion}</td>
      <td> ${sku.existencias}</td>
      <td> ${sku.precio}</td>
      <td> ${sku.categoria}</td>
      <td> ${moment(sku.createdAt).format("DD/MM/YYYY")}</td>
      <td> ${moment(sku.updatedAt).format("DD/MM/YYYY")}</td>
      <td>  <input name="selection" class="form-check-input" type="checkbox" value="${
        sku.id
      } ">
    </tr>
    `;
  });

  divElement.querySelector("#btnDelete").addEventListener("click", async () => {
    window.location.hash = "/#delete_producto";
    try {
      let checkedCheckbox = divElement.querySelectorAll(
        "input[type=checkbox]:checked"
      );
      for (const element of checkedCheckbox) {
        await deletebyId(urlDelete, element.value);
      }
      swal(
        "",
        "Los productos seleccionados han sido eliminados con exito",
        "success"
      );
      window.location.hash = "#/abm_productos";
    } catch (e) {
      swal("", "La operacion ha fallado", "error");
      throw e;
    }
  });

  divElement.querySelector("#btnUpdate").addEventListener("click", async () => {
    try {
      let checkedCheckbox = divElement.querySelector(
        "input[type=checkbox]:checked"
      );
      const data = await getById(urlgetById, checkedCheckbox.value);
      data.data.forEach((sku) => {
        tbdoyElement.innerHTML = `
        <tr>
        <td>
          <input type="text" name="codigo" class="changedInput" value=  ${
            sku.codigo
          }></input>
        </td>
        <td>
          <input type="text" name="descripcion" class="changedInput" value=${
            sku.descripcion
          } > </input>
          </td>
          <td>  
          <input type="number" name="existencias" class="changedInput" value= ${
            sku.existencias
          }> </input>
          </td>
        <td>
          <input type="number" name="precio" class="changedInput" value=${
            sku.precio
          } > </input>
          </td>
        <td>
          <input type="text" name="categoria" class="changedInput" value=${
            sku.categoria
          } >  </input>
          </td>
        <td>
          <input type="text" disabled value = ${moment(sku.createdAt).format(
            "DD/MM/YYYY"
          )}> </input>
          </td>
        <td>
          <input type="text" disabled value= ${moment(sku.updatedAt).format(
            "DD/MM/YYYY"
          )}> </input>
          </td>
          </tr>
          <button class="btn btn-primary" id="btn_guardarcambios">Guardar</button>
        `;
      });

      let btn_guardarcambios = divElement.querySelector("#btn_guardarcambios");
      btn_guardarcambios.addEventListener("click", async () => {
       window.location.hash = "#/modificar_productos";
       const cambios = divElement.querySelectorAll(".changedInput");
       const changes = [];
       cambios.forEach((element) => {
         changes.push({ field: element.name, value: element.value });
       });
   
       const body = { id: checkedCheckbox.value, changes: changes };
   
       await updatebyId(updateUrl, body);
   
       swal("", "El producto selecionado ha sido modificado con exito", "success");
   
       tbdoyElement.innerHTML = "";
       window.location.hash = "#/abm_productos";
     });



    } catch (e) {
      swal("", "La operacion ha fallado", "error");
      throw e;
    }
  });

 

  return divElement;
};
