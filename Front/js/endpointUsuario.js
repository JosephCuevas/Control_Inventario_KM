const usuarioLog = localStorage.getItem("usuario");
const usuarioLogID = localStorage.getItem("usuarioid");
const usuarioLogNombre = localStorage.getItem("usuarionombre");


if (usuarioLogID === 0 || usuarioLogID === null) {
    console.log('comprobado');
    alert("Favor de iniciar sesion");
    window.location.replace("./login.html");
}
else {
    const APIListaUsuarios = 'https://localhost:44363/api/usuario/listaUsuarios';
    const APITipoUsuarios = 'https://localhost:44363/api/usuario/catRolUsuario';

    const saludarUsuario = document.querySelector('#user');
    const tablaUsuarios = document.querySelector('#tableBody');
    const formBusqueda = document.querySelector('#formBusqueda');

    formBusqueda.addEventListener('submit', (e) => {
        e.preventDefault();
        imprimirSelectores();
    });

    var listaUsuarios = [];


    function salirLogout(){
        localStorage.removeItem('usuario');
        localStorage.removeItem('usuarioid');
        localStorage.removeItem('usuarionombre');
        window.location.replace('./login.html');
    }

    const saludoUsuario = document.createElement('p');
    saludoUsuario.innerHTML = 'Hola, ' + usuarioLog;
    saludarUsuario.appendChild(saludoUsuario);

    /* Objeto que va a backend para que el servidor mande la lista de usuarios */
    var data = {
        "nombre": "",
        "rol": 0,
    };

    limpiarHtml();

    /* Fetch de lista de personas */
    fetch(APIListaUsuarios, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            imprimirHtml(response);
            listaUsuarios = response;
            imprimirSeleccion();
            imprimirFiltro();
        });
    
    
    /* Función que imprime la respuesta de servidor, en este caso la de usuarios */
    function imprimirHtml(resApi) {
        const resListaUsuarios = resApi;
        for (let i = 0; i < resListaUsuarios.length; i++) {
            const tr = document.createElement('tr');
            const { intUsuarioID, intRolID, vchNombreUsuario, vchApellidoUsuario, vchDireccionUsuario, vchTelefonoUsuario, vchUserUsuario, bitEstadoUsuario} = resListaUsuarios[i];

            tr.innerHTML = `
                <td class="shadow px-4">
                    <div class="flex justify-center">
                        <div class="block">
                            <div id="ac">
                            ${bitEstadoUsuario === false ? `<input type="checkbox" class="form-checkbox" id="boolEstatus" onclick="cambioEstado(this,${intUsuarioID})"> ` : `<input type="checkbox" class="form-checkbox" id="boolEstatus" onclick="cambioEstado(this,${intUsuarioID})" checked>`}
                                        
                    </div>
                </td>
                <td class="shadow px-4 text-center"><label class="block">
                    ${intRolID}
                </label></td>
                <td class="shadow px-4 text-center"><label class="block">
                    ${vchNombreUsuario}
                </label></td>
                <td class="shadow px-4 text-center"><label class="block">
                    ${vchApellidoUsuario}
                </label></td>
                <td class="shadow px-4 text-center"><label class="block">
                    ${vchDireccionUsuario}
                </label></td>
                <td class="shadow px-4 text-center"><label class="block">
                    ${vchTelefonoUsuario}
                </label></td>
                <td class="shadow px-4 text-center"><label class="block">
                    ${vchUserUsuario}
                </label></td>
                <td class="shadow px-8 inline-flex items-center" id="botones">
                    <button type="button" onclick="editarUsuario(this,${intUsuarioID})"
                                class="flex py-1 px-2 text-xs text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700">
                                Editar</button>
                </td>
        
            `
            tablaUsuarios.appendChild(tr);
        }
    }
    
    
    /* Funcion de limpiar el html, dejar la tabla vacia */
    function limpiarHtml() {
        tablaUsuarios.innerHTML = '';
    }


    /* Imprime la lista de selectores junto al buscador de tipo de usuario */
    function imprimirSeleccion() {
        const filtroTipoUsuario = document.querySelector('#filtroTipoUsuario');

        var tipoU = {
            "vchNombreRol": ""
        }

        /* FETCH DE TIPO DE PRENDA */
        fetch(APITipoUsuarios, {
            method: 'POST',
            body: JSON.stringify(tipoU),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error("Error: ", error))
            .then(response => {

                for (var i = 0; i < response.length; i++) {
                    const { intRolID, vchNombreRol } = response[i];
                    const selectRolUsuario = document.createElement('option');

                    selectRolUsuario.innerHTML = `
                    <option value="${intRolID}">${vchNombreRol} </option>
                `;

                    filtroTipoUsuario.appendChild(selectRolUsuario);
                }
            });
    }


    /* ***************  Función para imprimir los select de la barra lateral izquierda de tipo de usuario **************** */
    function imprimirFiltro() {
        const selectRolUsuario = document.querySelector('#selectRolUsuario');
        var tipoUsuario = {
            "vchNombreRol": ""
        }

        fetch(APITipoUsuarios, {
            method: 'POST',
            body: JSON.stringify(tipoUsuario),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(error => console.error('Error: ', error))
            .then(response => {
                const listaRol = response;

                for (var i = 0; i < listaRol.length; i++) {
                    const { intRolID, vchNombreRol } = listaRol[i];
                    const seleccionRol = document.createElement('option');

                    seleccionRol.innerHTML = `
                <option value="${intRolID}">${vchNombreRol} </option>
                `;

                    selectRolUsuario.appendChild(seleccionRol);
                }
            });
    }


    /* ============= Imprime la lista dependiendo de el filtro ========== */
    function imprimirSelectores() {
        limpiarHtml();

        const textBusqueda = document.querySelector('#search').value;
        const tipoUsuario = document.querySelector('#filtroTipoUsuario');
        const id = tipoUsuario.selectedIndex;

        var busqueda = {
            "nombre": textBusqueda,
            "rol": id,
        }
    
        fetch(APIListaUsuarios, {
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