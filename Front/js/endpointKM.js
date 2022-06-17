
/* API de la lista de productos */
const APIListaProd = 'https://localhost:44363/api/inventario/listaProductos';

/* Selectores */
const tablaProductos = document.querySelector('#tableBody');
const herramientas = document.querySelector('#herramientas');
const tipoPrenda = document.querySelector('#tipoPrenda');
const selectorTipoProducto = document.querySelector('#filtroTipoProducto');

/* Array de almacenamiento para cambio de estado de productos */
var listProductos = [];


/* Objeto que va a backend para que el servidor mande la lista de productos */
var data = {
    "nombre": "",
    "tipo": 0,
    "talla": 0,
    "color": 0
};

/* Fetch de lista de productos */
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


function imprimirFiltro() {
    const APIFiltroTipoPrenda = 'https://localhost:44363/api/inventario/catTipoPrenda';

    var tipoPrenda = {
        "nombre": "",
        "tipo": 0
    }

    fetch(APIFiltroTipoPrenda, {
        method: 'POST',
        body: JSON.stringify(tipoPrenda),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .catch(error => console.error('Error: ', error))
        .then(response => {
            const listaTipoPrendas = response;

            for (var i = 0; i < listaTipoPrendas.length; i++){
                const { intTipoProductoID,vchNombreTipoProducto } = listaTipoPrendas[i];
                const seleccionTipoPrenda = document.createElement('option');
                const seleccionTipoProBusqueda = document.createElement('option');


                seleccionTipoPrenda.innerHTML = `
                <option onclick="obtenerID(${intTipoProductoID})" value="${intTipoProductoID}">${vchNombreTipoProducto} </option>
                `;
            
                seleccionTipoProBsq.innerHTML = `
                <option onclick="obtenerID(${intTipoProductoID})" value="${intTipoProductoID}">${vchNombreTipoProducto} </option>
                `;

                tipoPrenda.appendChild(seleccionTipoPrenda);
                selectorTipoProducto.appendChild(seleccionTipoProBusqueda);
            }
    })
}


/* Función que imprime la respuesta de servidor, en este caso la de la listas de productos */
function imprimirHtml(resApi) {
    const resListaProd = resApi;
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

/* Funcion de limpiar el html, dejar la tabla vacia */
function limpiarHtml() {
    tablaProductos.innerHTML = '';
}

/* Función para filtro de busqueda */
function inputFiltro() {
    limpiarHtml();
    const inputTerminoBusqueda = document.querySelector('#search').value;
    const idFiltroTipoProducto = document.querySelector('#filtroTipoProducto');
    const id = idFiltroTipoProducto.selectedIndex;

    var filtro = {
        "nombre": inputTerminoBusqueda,
        "tipo" : id
    }

    fetch(API, {
            method: 'POST',
            body: JSON.stringify(filtro),
            headers:{
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .catch(error => console.error('Error: ', error))
        .then(response => {
        imprimirHtml(response);
    });
}

