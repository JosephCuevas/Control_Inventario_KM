const usuarioLog = localStorage.getItem("usuario");
const usuarioLogID = localStorage.getItem("usuarioid");
const usuarioLogNombre = localStorage.getItem("usuarionombre");


if (usuarioLogID === 0 || usuarioLogID === null) {
    console.log('comprobado');
    alert("Favor de iniciar sesion");
    window.location.replace("./login.html");
}
else {
    const APIListaPerso = 'https://localhost:44363/api/persona/catPersona';

    const tablaPersonas = document.querySelector('#tableBody');

    function salirLogout(){
        localStorage.removeItem('usuario');
        localStorage.removeItem('usuarioid');
        localStorage.removeItem('usuarionombre');
        window.location.replace('./login.html');
    }

    const saludoUsuario = document.createElement('p');
    saludoUsuario.innerHTML = 'Hola, ' + usuarioLog;
    saludarUsuario.appendChild(saludoUsuario);

    /* Objeto que va a backend para que el servidor mande la lista de personas */
    var data = {
        "nombre": "",
        "tipo": 0,
    };

    /* Fetch de lista de personas */
    fetch(APIListaPerso, {
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
        const APIFiltroTipoPersona = 'https://localhost:44363/api/persona/catTipoPersona';

        var tipoPersona = {
            "vchNombreTipoPersona": ""
        }

        fetch(APIFiltroTipoPersona, {
            method: 'POST',
            body: JSON.stringify(tipoPersona),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(error => console.error('Error: ', error))
            .then(response => {
                const listaPersonas = response;

                for (var i = 0; i < listaPersonas.length; i++) {
                    const { vchNombreTipoPersona } = listaPersonas[i];
                    const seleccionTipoPersona = document.createElement('option');

                    seleccionTipoPersona.innerHTML = `
                <option onclick="obtenerID(${intTipoPersonaID})" value="${intTipoPersonaID}">${vchNombreTipoPersona} </option>
                `;

                    tipoPersona.appendChild(seleccionTipoPersona);
                }
            })
    }


    /* Función que imprime la respuesta de servidor, en este caso la de la listas de personas */
    function imprimirHtml(resApi) {
        const resListaPersonas = resApi;
        for (let i = 0; i < resListaPersonas.length; i++) {
            const tr = document.createElement('tr');
            const { intPersonaID, intTipoPersonaID, vchNombrePersona, vchDireccionPersona, vchTelefonoPersona, vchEmailPersona} = resListaPersonas[i];

            tr.innerHTML = `
            <td class="shadow px-4 text-center"><label class="block">
                ${intTipoPersonaID}
            </label></td>
            <td class="shadow px-4 text-center"><label class="block">
                ${vchNombrePersona}
            </label></td>
            <td class="shadow px-4 text-center"><label class="block">
                $ ${vchDireccionPersona}
            </label></td>
            <td class="shadow px-4 text-center"><label class="block">
                ${vchTelefonoPersona}
            </label></td>
            <td class="shadow px-4 text-center"><label class="block">
                ${vchEmailPersona}
            </label></td>
            <td class="shadow px-8 inline-flex items-center" id="botones">
                <button type="button" onclick="editarProducto(this,${intPersonaID})"
                            class="flex py-1 px-2 text-xs text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700">
                            Editar</button>
                <button type="button" onclick="enviarDatosInvDB()"
                            class="flex py-1 px-2 ml-1 text-xs text-center text-white bg-blue-500 rounded-lg hover:bg-gray-700">
                            Guardar</button>
            </td>
        
            `
            tablaPersonas.appendChild(tr);
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
        const idFiltroTipoPersona = document.querySelector('#filtroTipoPersona');
        const id = idFiltroTipoPersona.selectedIndex;

        var filtro = {
            "nombre": inputTerminoBusqueda,
            "tipo": id
        }

        fetch(APIListaPerso, {
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

        const APITipoPerso = 'https://localhost:44363/api/persona/catTipoPersona';
        const selectFiltroTipoPersona = document.querySelector('#filtroTipoPersona');

        var tipoP = {
            "nombre": "",
            "tipo": 0,
        }

        /* FETCH DE TIPO DE PRENDA */
        fetch(APITipoPerso, {
            method: 'POST',
            body: JSON.stringify(tipoP),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error("Error: ", error))
            .then(response => {

                for (var i = 0; i < response.length; i++) {
                    const { intTipoPersonaID, vchNombreTipoPersona } = response[i];
                    const selectTipoPerso = document.createElement('option');

                    selectTipoPerso.innerHTML = `
                    <option onclick="obtenerID(${intTipoPersonaID})" value="${intTipoPersonaID}">${vchNombreTipoPersona} </option>
                `;

                    selectFiltroTipoPersona.appendChild(selectTipoPerso);
                }
            })
    
    }

    function imprimirSelectores() {
        limpiarHtml();

        const textBusqueda = document.querySelector('#search').value;
        const tipoPersona = document.querySelector('#filtroTipoPersona');
        const id = tipoPersona.selectedIndex;

        var busqueda = {
            "nombre": textBusqueda,
            "tipo": id,
        }
    
        fetch(APIListaPerso, {
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
    

}