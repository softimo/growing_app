import Producto from '../../views/configuracion/producto.html'
import { getAll, postBody, getById, updatebyId, deletebyId } from '../../model/APImodel';

export default async () => {
  const productosList = Producto
  const url =  "http://localhost:3000/sku/list"
  const divElement = document.createElement("div");
  divElement.innerHTML = productosList;
  const tbdoyElement = divElement.querySelector("#tableSkuTbody")

  divElement.addEventListener("click", (e)=>{
    console.log(e.target.id)
  })

  const getAllSku = await getAll(url)
  getAllSku.data.forEach(sku => {
    tbdoyElement.innerHTML +=`
    <tr>
      <td> ${sku.codigo}</td>
      <td> ${sku.descripcion}</td>
      <td> ${sku.existencias}</td>
      <td> ${sku.createdAt}</td>
      <td> ${sku.updatedAt}</td>
    </tr>
    `
  });
 
  return divElement;
};
