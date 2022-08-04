const usuarioLog = localStorage.getItem("usuario");
const usuarioLogID = localStorage.getItem("usuarioid");
const usuarioLogNombre = localStorage.getItem("usuarionombre");


if (usuarioLogID === 0 || usuarioLogID === null) {
    console.log('comprobado');
    alert("Favor de iniciar sesion");
    window.location.replace("./login.html");
}
else {
    const APIListaProd = 'https://localhost:44363/api/inventario/listaProductos';

    const tablaProductos = document.querySelector('#tableProducts');
    const tablaInventario = document.querySelector('#tableAddInv');
    const saludarUsuario = document.querySelector('#user');
    const formBusqueda = document.querySelector('#formBusqueda');
    const btn_menu = document.querySelector('#menu');
    const side_menu = document.querySelector('#side_menu');
    const saludoUsuario = document.createElement('p');

    var listProductos = [];
    
    saludoUsuario.innerHTML = 'Hola, ' + usuarioLog;
    saludarUsuario.appendChild(saludoUsuario);
    
    btn_menu.addEventListener('click', (e) => {
        e.preventDefault();
        side_menu.classList.toggle('hidden');
    });
    
    formBusqueda.addEventListener('submit', (e) => {
        e.preventDefault();
        imprimirSelectores();
    });

    /* Funcion de limpiar el html, dejar la tabla vacia */
    function limpiarHtml() {
        tablaProductos.innerHTML = '';
        tablaInventario.innerHTML = '';
    }

    function salirLogout(){
        localStorage.removeItem('usuario');
        localStorage.removeItem('usuarioid');
        localStorage.removeItem('usuarionombre');
        window.location.replace('./login.html');
    }

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
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            imprimirHtml(response);
            console.log(response);
            listProductos = response;
            /* imprimirSeleccion(); */
        });
    
    /* Función que imprime la respuesta de servidor, en este caso la de la listas de productos */
    function imprimirHtml(resApi) {
        const resListaProd = resApi;
        for (let i = 0; i < resListaProd.length; i++) {
            const tr = document.createElement('tr');
            const { intProductoID, vchNombreProducto, intStockProducto} = resListaProd[i];

            tr.innerHTML = `
                <td class="shadow px-4 text-center"><label class="block">
                    ${vchNombreProducto}
                </label></td>
                <td class="shadow px-4 text-center"><label class="block w-30">
                    ${intStockProducto}
                </label></td>
                <td class="shadow px-8 inline-flex items-center" id="botones">
                    <button type="button" onclick="imprimirHtmlAdd(this,${intProductoID})"
                                class="flex py-1 px-2 text-xs text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700">
                                <i class="fa-solid fa-angles-right"></i></button>
                </td>
        
            `
            tableProducts.appendChild(tr);
        }
    }

    function imprimirHtmlAdd(check, id) {
        const idPass = Number(id);
        for (var i = 0; i < listProductos.length; i++){
            const { intProductoID, vchNombreProducto, intStockProducto} = listProductos[i];
            if (idPass == intProductoID) {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td class="shadow px-4 text-center"><label class="block">
                        ${vchNombreProducto}
                    </label></td>
                    <td class="shadow px-4 text-center"><label class="block w-30">
                        <input class="w-50 text-center bg-gray-800" type="number" name="${intProductoID}" value="${intStockProducto}"></input>
                    </label></td>
                    <td class="shadow px-8 inline-flex items-center" id="botones">
                        <button type="button" onclick="enviarDatosInvDB()"
                                    class="flex py-1 px-2 ml-1 text-xs text-center text-white bg-blue-500 rounded-lg hover:bg-gray-700">
                                    Guardar</button>
                    </td>
                    `;
                tablaInventario.appendChild(tr);
            }
        }
        
    }
}