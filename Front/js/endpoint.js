const usuarioLog = localStorage.getItem("usuario");
const usuarioLogID = localStorage.getItem("usuarioid");
const usuarioLogNombre =  localStorage.getItem("usuarionombre");

if(usuarioLogID === 0 && usuarioLogID === null){
    alert("Favor de iniciar sesion");
    window.location.replace("./login.html");
} else {
var listProductos = [];
var productoSeleccionado = 0;
const API = 'https://localhost:44363/api/inventario/listaProductos';

const tbody = document.querySelector('#tableBody');
const formBusqueda = document.querySelector('#formBusqueda');
const terminoBusqueda = document.querySelector('#search');
const saludarUsuario = document.querySelector('#user');
const tipoProducto = document.querySelector('#tipoProducto');
const formularioC = document.querySelector('#formulario');
const limpiar = document.querySelector('#btnLimpiar');
const busquedatipoProducto = document.querySelector('#filtroTipoProducto');


formularioC.addEventListener('submit', enviarDatosBD); 
terminoBusqueda.addEventListener("submit", validarTermino);
formBusqueda.addEventListener('submit', filtrarBusqueda);
limpiar.addEventListener("click", limpiarFormulario);

const saludoUsuario = document.createElement('p');
saludoUsuario.innerHTML = 'Hola, ' + usuarioLog;
saludarUsuario.appendChild(saludoUsuario);

var data = {
        "nombre": "",
        "tipo": 0,
        "talla": 0,
        "color": 0
};


limpiarHtml();

fetch(API, {
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
    imprimirSeleccion();
});


function salirLogout(){
        localStorage.removeItem('usuario');
        localStorage.removeItem('usuarioid');
        localStorage.removeItem('usuarionombre');
        window.location.replace('./login.html');
}


function imprimirSeleccion(){
    const APIT = 'https://localhost:44363/api/inventario/catTipoPrenda';

    var tipoP = {
        "nombre": "",
        "tipo": 0,
        "talla": 0,
        "color": 0
    }

    fetch(APIT, {
    method: 'POST',
    body: JSON.stringify(tipoP),
    headers:{
        'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        
        for(var i = 0;i < response.length; i++){
            const seleccionTipoPro = document.createElement('option');
            const seleccionTipoProBsq = document.createElement('option');
            
            seleccionTipoPro.innerHTML = `
                <option onclick="obtenerID(${response[i].intTipoProductoID})" value="${response[i].intTipoProductoID}">${response[i].vchNombreTipoProducto} </option>
            `;
            
            seleccionTipoProBsq.innerHTML = `
                <option onclick="obtenerID(${response[i].intTipoProductoID})" value="${response[i].intTipoProductoID}">${response[i].vchNombreTipoProducto} </option>
            `;
            tipoProducto.appendChild(seleccionTipoPro);
            busquedatipoProducto.appendChild(seleccionTipoProBsq);
        }
    });

        
}

function imprimirHtml(res) {

    for (let i=0; i < res.length ; i++){
        const tr = document.createElement('tr');
            
        tr.innerHTML = `
                <td class="shadow px-4"><label class="block">
                        ${res[i].vchNombreTipoProducto}
                    </label></td>
                <td class="shadow px-4"><label class="block">
                        ${res[i].vchNombreProducto}
                    </label></td>
                <td class="shadow px-4"><label class="block">
                        ${res[i].decPrecioProducto}
                    </label></td>
                <td class="shadow px-4"><label class="block">
                        ${res[i].datFechaAltaProducto}
                    </label></td>
                <td class="shadow px-4"><label class="block">
                        ${res[i].vchNombreUsuario}
                    </label></td>
                <td class="shadow px-4">
                    <div class="flex justify-center">
                        <div class="block">
                            <div id="ac">
                                ${res[i].boolEstatusProducto === false ? `<input type="checkbox" class="form-checkbox" id="boolEstatus" id="boolEstatus" onclick="cambioEstado(this,${res[i].intProductoID})"> `: `<input type="checkbox" class="form-checkbox" id="boolEstatus" onclick="cambioEstado(this,${res[i].intProductoID})" checked>`}
                                
                            </div>
                </td>
                <td class="shadow px-8 inline-flex items-center">
                    <button type="button" onclick="editarItem(this,${res[i].intProductoID})"
                        class="flex py-1 px-2 text-xs text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700">
                        Editar</button>
                </td>
        `
        tbody.appendChild(tr);
    }
}

function cambioEstado(check, id){
    if(usuarioLogID > 0){
        
        const APIB = 'https://localhost:44327/api/inventario/ActualizarEstatusProducto';
        
        var data = {
            "productoID":id,
            "usuarioAlta": usuarioLogID
        }

    fetch(APIB, {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
        'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
    if(response.valido){
        alert("Cambio de producto correcto");
    } else {
        alert("Error, no se realizo el cambio de estado")
    }
});

    } else {
        window.location.replace("./login.html");
    }
} 

function validarTermino(){
        envioDatos();
}

function filtrarBusqueda(e){
    e.preventDefault();
}

function envioDatos(){
    limpiarHtml();
        var textbusqueda = document.getElementById("search").value;
        var tipoProdBusqueda = document.getElementById("filtroTipoProducto");
        var id = tipoProdBusqueda.selectedIndex;
        
        var busqueda = {
        "nombre": textbusqueda,
        "tipo": id    
        }
         fetch(API, {
            method: 'POST',
            body: JSON.stringify(busqueda),
            headers:{
                'Content-Type': 'application/json'
            }
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                imprimirHtml(response);
        });      
}


function enviarDatosBD(e){
    e.preventDefault();
    const APIC = 'https://localhost:44363/api/inventario/AgregarProducto'
    const APIEdit = 'https://localhost:44363/api/inventario/ActualizarProducto'

    const tipoProducto = document.getElementById('tipoProducto');
    const precioProducto = document.querySelector('#precioProducto').value;
    const nombreProducto = document.querySelector('#nombreProducto').value;

        const tipoProducto1 = tipoProducto.selectedIndex;
        var id = tipoProducto.options[tipoProducto.selectedIndex].value;

        var nuevoProducto = {};
        if(productoSeleccionado > 0){ nuevoProducto = {"producto":  {
                    "intProductoID": productoSeleccionado,
                    "vchNombreProducto": nombreProducto,
                    "decPrecioProducto":  precioProducto,
                    "intTipoProductoID": tipoProducto1 
                } ,
               "usuarioAlta": usuarioLogID
        }; 
        fetch(APIEdit, {
            method: 'POST',
            body: JSON.stringify(nuevoProducto),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if(response.valido){
                    alert("Producto actualizado correctamente");
                    window.location.reload();
                    limpiarFormulario();
                }
                else{
                    alert("Existe un error al editar el producto.")
                }
        });
    }
        else{
            nuevoProducto = {"producto":  {
                    "vchNombreProducto": nombreProducto,
                    "decPrecioProducto":  precioProducto,
                    "intTipoProductoID": tipoProducto1 
                } ,
               "usuarioAlta": usuarioLogID
        };
        fetch(APIC, {
            method: 'POST',
            body: JSON.stringify(nuevoProducto),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if(response.valido){
                    alert("Producto creado correctamente");
                    window.location.reload();
                    limpiarFormulario();
                }
                else{
                    alert("Existe un error al crear el producto.")
                }
        });
    }   
}

function updateValue(e) {
  log.textContent = e.target.value;
}

function limpiarFormulario(){
    productoSeleccionado = 0;
    var inputNombre= document.getElementById("nombreProducto");
    inputNombre.value = "";
    var selectTipo = document.getElementById("tipoProducto");
    selectTipo.selectedIndex = 0;
    var precio = document.getElementById("precioProducto");
    precio.value = 0;
}

function onlyNumberKey(evt) {
          
        var ASCIICode = (evt.which) ? evt.which : evt.keyCode
        if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
            return false;
        return true;
    }


function limpiarHtml() {
    tbody.innerHTML = "";
}

function editarItem(ev, intProductoID){
    var items = listProductos.filter(r => r.intProductoID == intProductoID);
    var item = items[0];
    var inputNombre= document.getElementById("nombreProducto");
    inputNombre.value = item.vchNombreProducto;
    var selectTipo = document.getElementById("tipoProducto");
    selectTipo.selectedIndex = item.intTipoProductoID;
    var precio = document.getElementById("precioProducto");
    precio.value = item.decPrecioProducto;
    productoSeleccionado = item.intProductoID;
}

} //fin del else