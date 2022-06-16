
const APIListaProd = 'https://localhost:44363/api/inventario/listaProductos';
const tablaProductos = document.querySelector('#tableBody');
const herramientas = document.querySelector('#herramientas');
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

function imprimirHtml(resApi) {
  const resListaProd = resApi
  for (let i = 0; i < resListaProd.length; i++){
    const tr = document.createElement('tr');
    const { intProductoID, vchSKUProducto, vchNombreProducto, decCostoProducto, intStockProducto, bitEstadoProducto, vchDescripcionProducto } = resListaProd[i];

    tr.innerHTML = `
        <td class="shadow px-4">
            <div class="flex justify-center">
                <div class="block">
                    <div id="ac">
                    ${bitEstadoProducto === false ? `<input type="checkbox" class="form-checkbox" id="boolEstatus" id="boolEstatus" onclick="cambioEstado(this,${intProductoID})"> `: `<input type="checkbox" class="form-checkbox" id="boolEstatus" onclick="cambioEstado(this,${intProductoID})" checked>`}
                                
            </div>
        </td>
        <td class="shadow px-4 text-center"><label class="block">
            ${vchSKUProducto}
        </label></td>
        <td class="shadow px-4 text-center"><label class="block">
            ${vchNombreProducto}
        </label></td>
        <td class="shadow px-4 text-center"><label class="block">
            $ ${decCostoProducto}
        </label></td>
        <td class="shadow px-4 text-center"><label class="block">
            ${intStockProducto} pz
        </label></td>
        <td class="shadow px-4 text-center"><label class="block">
            ${vchDescripcionProducto} pz
        </label></td>
        <td class="shadow px-8 inline-flex items-center">
            <button type="button" onclick="editarItem(this,${intProductoID})"
                        class="flex py-1 px-2 text-xs text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700">
                        Editar</button>
        </td>
        
    `
    tablaProductos.appendChild(tr);
  }
}
