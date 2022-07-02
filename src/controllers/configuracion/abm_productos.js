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
    window.location.hash  ="/#delete_producto"
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
      window.location.hash  ="#/abm_productos"
      
    } catch (e) {
      swal("", "La operacion ha fallado", "error");
      throw e;
    }
  });

  divElement.querySelector("#btnUpdate").addEventListener("click", async () => {
    window.location.hash  ="/#update_producto"
    try {
      let checkedCheckbox = divElement.querySelector(
        "input[type=checkbox]:checked"
      );
      const data = await getById(urlDelete,checkedCheckbox.value);
      data.data.forEach((sku) => {
        tbdoyElement.innerHTML += `
        <tr>
          <input type="text" name="codigo" class="changedInput"> ${sku.codigo}</input>
          <input type="text" name="descripcion" class="changedInput">> ${sku.descripcion}</input>
          <input type="number" name="existencias" class="changedInput">> ${sku.existencias}</input>
          <input type="number" name="precio" class="changedInput">> ${sku.precio}</input>
          <input type="text" name="categoria" class="changedInput">> ${sku.categoria}</input>
          <input type="text" disabled> ${moment(sku.createdAt).format("DD/MM/YYYY")}</input>
          <input type="text" disabled> ${moment(sku.updatedAt).format("DD/MM/YYYY")}</input>
          </tr>
          <button class="btn btn-primary" id="btn_guardarcambios">Guardar</button>
        `;
      });


      let btn_guardarcambios = divElement.querySelector("#btn_guardarcambios")
      btn_guardarcambios.addEventListener("click",()=>{
        const cambios =  divElement.querySelectorAll(".changedInput")
        let changes = []
        cambios.forEach(element => {
          changes.push({field: element.name, value:element.value})
       });
       let updateUrl = "http://localhost:3000/sku/update"
       const body = [checkedCheckbox.value, changes]
       await updatebyId(updateUrl, body)
       //PROBAR
      })
      
      


      
      swal(
        "",
        "Los productos seleccionados han sido eliminados con exito",
        "success"
      );
      window.location.hash  ="#/abm_productos"
      
    } catch (e) {
      swal("", "La operacion ha fallado", "error");
      throw e;
    }


  })

  return divElement;
};
