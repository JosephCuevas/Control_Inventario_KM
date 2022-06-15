
const APIListaProd = 'https://localhost:44363/api/inventario/listaProductos';
const tablaProductos = document.querySelector('#tableBody');
var listProductos = [];


var data = {
        "nombre": "",
        "tipo": 0,
        "talla": 0,
        "color": 0
};

fetch(APIListaProd, {
  method: 'POST',
  body: JSON.stringify(data),
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => {
    imprimirHtml(response);
    listProductos = response;
    /* imprimirSeleccion(); */
});

function imprimirHtml(resListaProd) {
  console.log(resListaProd);
  for (let i = 0; i < resListaProd.length; i++){
    const tr = document.createElement('tr');
    const { vchSKUProducto, vchNombreProducto } = resListaProd[i];

    tr.innerHTML = `
        <td class="shadow px-4"><label class="block">
            ${vchSKUProducto}
        </label></td>
        <td class="shadow px-4"><label class="block">
            ${vchNombreProducto}
        </label></td>
    `
    tablaProductos.appendChild(tr);
  }
}
