
const usuarioLog = localStorage.getItem("usuario");
const usuarioLogID = localStorage.getItem("usuarioid");
const usuarioLogNombre = localStorage.getItem("usuarionombre");

if (usuarioLogID === 0 && usuarioLogID === null) {
    alert("Favor de iniciar sesion");
    window.location.replace("./login.html");
}
else {
    /* API de la lista de productos */
    const APIListaProd = 'https://localhost:44363/api/inventario/listaProductos';

    /* Selectores */
    const tablaProductos = document.querySelector('#tableBody');
    const selectorTipoProducto = document.querySelector('#filtroTipoProducto');
    const formBusqueda = document.querySelector('#formBusqueda');
    const formularioNuevoP = document.querySelector('#formularioNuevoP');
    const btnLimpiar = document.querySelector('#btnLimpiar');
    const saludarUsuario = document.querySelector('#user');

    formBusqueda.addEventListener('submit', (e) => {
        e.preventDefault();
        imprimirSelectores();
    });

    formularioNuevoP.addEventListener('submit', (e) => {
        e.preventDefault();
        enviarDatosBD();
    });

    btnLimpiar.addEventListener('click', (e) => {
        e.preventDefault();
        limpiarFormulario();
    });


    /* Array de almacenamiento para cambio de estado de productos */
    var listProductos = [];
    var productoSeleccionado = 0;
    var nuevoInventario = 0;

    function salirLogout(){
        localStorage.removeItem('usuario');
        localStorage.removeItem('usuarioid');
        localStorage.removeItem('usuarionombre');
        window.location.replace('./login.html');
    }

    const saludoUsuario = document.createElement('p');
    saludoUsuario.innerHTML = 'Hola, ' + usuarioLog;
    saludarUsuario.appendChild(saludoUsuario);


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
            listProductos = response;
            imprimirSeleccion();
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

                for (var i = 0; i < listaTipoPrendas.length; i++) {
                    const { intTipoProductoID, vchNombreTipoProducto } = listaTipoPrendas[i];
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
        for (let i = 0; i < resListaProd.length; i++) {
            const tr = document.createElement('tr');
            const { intProductoID, vchSKUProducto, vchNombreProducto, decCostoProducto, intStockProducto, bitEstadoProducto, vchDescripcionProducto } = resListaProd[i];

            tr.innerHTML = `
            <td class="shadow px-4">
                <div class="flex justify-center">
                    <div class="block">
                        <div id="ac">
                        ${bitEstadoProducto === false ? `<input type="checkbox" class="form-checkbox" id="boolEstatus" id="boolEstatus" onclick="cambioEstado(this,${intProductoID})"> ` : `<input type="checkbox" class="form-checkbox" id="boolEstatus" onclick="cambioEstado(this,${intProductoID})" checked>`}
                                    
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
            <td class="shadow px-4 text-center"><label class="block w-30">
                <input class="w-50 text-center bg-gray-800" type="number" id="cantInventarioN" name="${intProductoID}" onchange="editarInventario(this,${intProductoID})" value="${intStockProducto}"></input>
            </label></td>
            <td class="shadow px-4 text-center"><label class="block">
                ${vchDescripcionProducto}
            </label></td>
            <td class="shadow px-8 inline-flex items-center" id="botones">
                <button type="button" onclick="editarProducto(this,${intProductoID})"
                            class="flex py-1 px-2 text-xs text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700">
                            Editar</button>
                <button type="button" onclick="enviarDatosInvDB()"
                            class="flex py-1 px-2 ml-1 text-xs text-center text-white bg-blue-500 rounded-lg hover:bg-gray-700">
                            Guardar</button>
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
            "tipo": id
        }

        fetch(APIListaProd, {
            method: 'POST',
            body: JSON.stringify(filtro),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(error => console.error('Error: ', error))
            .then(response => {
                imprimirHtml(response);
            });
    }

    /* Imprime la lista de selectores */
    function imprimirSeleccion() {

        const APITipoP = 'https://localhost:44363/api/inventario/catTipoPrenda';
        const APITalla = 'https://localhost:44363/api/inventario/catTallas';
        const APIColor = 'https://localhost:44363/api/inventario/catColores';
        const selectFiltroTipo = document.querySelector('#filtroTipoProducto');
        const selectTipoP = document.querySelector('#selectTipoP');
        const selectTallaP = document.querySelector('#selectTallaP');
        const selectColorP = document.querySelector('#selectColorP');

        var tipoP = {
            "nombre": "",
            "tipo": 0,
            "talla": 0,
            "color": 0
        }

        /* FETCH DE TIPO DE PRENDA */
        fetch(APITipoP, {
            method: 'POST',
            body: JSON.stringify(tipoP),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error("Error: ", error))
            .then(response => {

                for (var i = 0; i < response.length; i++) {
                    const { intTipoPrendaID, vchNombreTipoPrenda } = response[i];
                    const selectTipo = document.createElement('option');
                    const selectTipoPrenda = document.createElement('option');

                    selectTipo.innerHTML = `
                    <option onclick="obtenerID(${intTipoPrendaID})" value="${intTipoPrendaID}">${vchNombreTipoPrenda} </option>
                `;
                    selectTipoPrenda.innerHTML = `
                    <option onclick="obtenerID(${intTipoPrendaID})" value="${intTipoPrendaID}">${vchNombreTipoPrenda} </option>
                `;

                    selectFiltroTipo.appendChild(selectTipo);
                    selectTipoP.appendChild(selectTipoPrenda);
                }
            })
    
        /* FETCH DE TALLA */
        fetch(APITalla, {
            method: 'POST',
            body: JSON.stringify(tipoP),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error("Error: ", error))
            .then(response => {

        
                for (var i = 0; i < response.length; i++) {
                    const { intTallaID, vchNombreTalla } = response[i];
                    const selectTalla = document.createElement('option');
                

                    selectTalla.innerHTML = `
                    <option onclick="obtenerID(${intTallaID})" value="${intTallaID}">${vchNombreTalla} </option>
                `;

                    selectTallaP.appendChild(selectTalla);
                }
            })
    
        /* FETCH DE COLOR */
        fetch(APIColor, {
            method: 'POST',
            body: JSON.stringify(tipoP),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error("Error: ", error))
            .then(response => {

                for (var i = 0; i < response.length; i++) {
                    const { intColorID, vchNombreColor } = response[i];
                    const selectColor = document.createElement('option');

                    selectColor.innerHTML = `
                    <option onclick="obtenerID(${intColorID})" value="${intColorID}">${vchNombreColor} </option>
                `;

                    selectColorP.appendChild(selectColor);
                }
            })
    }

    function imprimirSelectores() {
        limpiarHtml();

        const textBusqueda = document.querySelector('#search').value;
        const tipoPrenBusqueda = document.querySelector('#filtroTipoProducto');
        const id = tipoPrenBusqueda.selectedIndex;

        var busqueda = {
            "nombre": textBusqueda,
            "tipo": id,
            "talla": 0,
            "color": 0
        }
    
        fetch(APIListaProd, {
            method: 'POST',
            body: JSON.stringify(busqueda),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                imprimirHtml(response);
            });
    }

    function cambioEstado(check, id) {

        
        if (usuarioLogID > 0) {
            const APICambioEstado = 'https://localhost:44363/api/inventario/actualizaEstadoProducto';
            var idP = {
                "productoID": id,
                "usuarioAlta": usuarioLogID
            }

            fetch(APICambioEstado, {
                method: 'POST',
                body: JSON.stringify(idP),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    if (response.valido) {
                        alert("Cambio de producto correcto");
                    } else {
                        alert("Error, no se realizo el cambio de estado")
                    }
                });
        }
        else {
            window.location.replace("./login.html");
        }
    }


    function enviarDatosBD() {
        const APIAgregar = 'https://localhost:44363/api/inventario/agregarProducto';
        const APIEditar = 'https://localhost:44363/api/inventario/actualizaProducto';

        const selectTipoPrenda = document.querySelector('#selectTipoP').selectedIndex;
        const selectTallaPrenda = document.querySelector('#selectTallaP').selectedIndex;
        const selectColorPrenda = document.querySelector('#selectColorP').selectedIndex;
        const nombreProducto = document.querySelector('#nombreProducto').value;
        const skuProducto = document.querySelector('#skuProducto').value;
        const costoProducto = document.querySelector('#costoProducto').value;
        const inventarioProducto = document.querySelector('#inventarioProducto').value;
        const descripcionProducto = document.querySelector('#descripcionProducto').value;
        const imagenProducto = document.querySelector('#imagenProducto').value;

        /* const id = selectTipoPrenda.options[selectTipoPrenda.selectedIndex].value; */

        var nuevoProducto = {};
        if (productoSeleccionado > 0) {
            nuevoProducto = {
                "producto": {
                    "intProductoID": productoSeleccionado,
                    "intTipoPrendaID": selectTipoPrenda,
                    "intTallaID": selectTallaPrenda,
                    "intColorID": selectColorPrenda,
                    "vchNombreProducto": nombreProducto,
                    "vchSKUProducto": skuProducto,
                    "decCostoProducto": costoProducto,
                    "intStockProducto": inventarioProducto,
                    "vchDescripcionProducto": descripcionProducto,
                    "vchImagenProducto": imagenProducto
                },
                "usuarioAlta": usuarioLogID
            };
            fetch(APIEditar, {
                method: 'POST',
                body: JSON.stringify(nuevoProducto),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    if (response.valido) {
                        alert("Producto actualizado correctamente");
                        window.location.reload();
                        limpiarFormulario();
                    }
                    else {
                        alert("Existe un error al editar el producto.")
                    }
                });
        }
        else {
            nuevoProducto = {
                "producto": {
                    "intTipoPrendaID": selectTipoPrenda,
                    "intTallaID": selectTallaPrenda,
                    "intColorID": selectColorPrenda,
                    "vchNombreProducto": nombreProducto,
                    "vchSKUProducto": skuProducto,
                    "decCostoProducto": costoProducto,
                    "intStockProducto": inventarioProducto,
                    "vchDescripcionProducto": descripcionProducto,
                    "vchImagenProducto": imagenProducto
                },
                "usuarioAlta": usuarioLogID
            };
            fetch(APIAgregar, {
                method: 'POST',
                body: JSON.stringify(nuevoProducto),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    if (response.valido) {
                        alert("Producto creado correctamente");
                        window.location.reload();
                        limpiarFormulario();
                    }
                    else {
                        alert("Existe un error al crear el producto.")
                    }
                });
        }
    }

    function limpiarFormulario() {
        productoSeleccionado = 0;

        const selectTipoPrenda = document.querySelector('#selectTipoP');
        selectTipoPrenda.selectedIndex = 0;
        const selectTallaPrenda = document.querySelector('#selectTallaP');
        selectTallaPrenda.selectedIndex = 0;
        const selectColorPrenda = document.querySelector('#selectColorP');
        selectColorPrenda.selectedIndex = 0;
        const nombreProducto = document.querySelector('#nombreProducto');
        nombreProducto.value = '';
        const skuProducto = document.querySelector('#skuProducto');
        skuProducto.value = '';
        const costoProducto = document.querySelector('#costoProducto');
        costoProducto.value = 0;
        const inventarioProducto = document.querySelector('#inventarioProducto');
        inventarioProducto.value = '';
        const descripcionProducto = document.querySelector('#descripcionProducto');
        descripcionProducto.value = '';
        const imagenProducto = document.querySelector('#imagenProducto');
        imagenProducto.value = '';
    }

    function editarProducto(check, intProductoID) {
        const productos = listProductos.filter(p => p.intProductoID == intProductoID);
        const producto = productos[0];

        const selectTipoPrenda = document.querySelector('#selectTipoP');
        selectTipoPrenda.selectedIndex = producto.intTipoPrendaID;
        const selectTallaPrenda = document.querySelector('#selectTallaP');
        selectTallaPrenda.selectedIndex = producto.intTallaID;
        const selectColorPrenda = document.querySelector('#selectColorP');
        selectColorPrenda.selectedIndex = producto.intColorID;
        const nombreProducto = document.querySelector('#nombreProducto');
        nombreProducto.value = producto.vchNombreProducto;
        const skuProducto = document.querySelector('#skuProducto');
        skuProducto.value = producto.vchSKUProducto;
        const costoProducto = document.querySelector('#costoProducto');
        costoProducto.value = producto.decCostoProducto;
        const inventarioProducto = document.querySelector('#inventarioProducto');
        inventarioProducto.value = producto.intStockProducto;
        const descripcionProducto = document.querySelector('#descripcionProducto');
        descripcionProducto.value = producto.vchDescripcionProducto;
        const imagenProducto = document.querySelector('#imagenProducto');
        imagenProducto.value = producto.vchImagenProducto;

        productoSeleccionado = producto.intProductoID;
    }

    /* Funcion para obtener id y valor de cantidad de nuevo inventario de input */
    function editarInventario(check, intProductoID) {
        const productos = listProductos.filter(p => p.intProductoID == intProductoID);
        const producto = productos[0];

        const inputInventario = document.querySelectorAll('#cantInventarioN');
        for (var i = 0; i < inputInventario.length; i++){
            const inputSeleccionado = Number(inputInventario[i].getAttribute('name'));
            if (inputSeleccionado == intProductoID) {
                nuevoInventario = inputInventario[i].value;
                producto.intStockProducto = nuevoInventario;
            }
        }
        productoSeleccionado = producto.intProductoID;
    }

    /* Función para envíar los datos obtenidos anteriormente en editarInventario() */
    function enviarDatosInvDB() {
        const APIEditInv = 'https://localhost:44363/api/inventario/actualizaInventario';

        if (productoSeleccionado > 0) {
            nuevaCantidad = {
                "producto": {
                    "intProductoID": productoSeleccionado,
                    "intStockProducto": nuevoInventario
                },
                "usuarioAlta": usuarioLogID
            };
            fetch(APIEditInv, {
                method: 'POST',
                body: JSON.stringify(nuevaCantidad),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    if (response.valido) {
                        alert("Inventario de producto actualizado correctamente");
                        window.location.reload();
                    }
                    else {
                        alert("Existe un error al editar el inventario de producto.")
                    }
                });
        }
    }
} // Fin del else