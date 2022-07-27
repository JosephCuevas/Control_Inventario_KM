
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
    const APITipoPerso = 'https://localhost:44363/api/persona/catTipoPersona';

    const tablaPersonas = document.querySelector('#tableBody');
    const saludarUsuario = document.querySelector('#user');
    const formulario = document.querySelector('#formularioNuevaP');
    const btnLimpiar = document.querySelector('#btnLimpiar');
    const formBusqueda = document.querySelector('#formBusqueda');
    const btnsalirLogout = document.querySelector('#salirLogout');

    /** Event listeners **/
    formBusqueda.addEventListener('submit', (e) => {
        e.preventDefault();
        imprimirSelectores();
    })
    
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        enviarDatosBD();
    });

    btnLimpiar.addEventListener('click', (e) => {
        e.preventDefault();
        limpiarFormulario();
    });

    btnsalirLogout.addEventListener('click', (e) => {
        e.preventDefault();
        salirLogout();
    })

    /** Array qeu almacena la lista de personas **/
    var listaPersonas = [];
    /* variable para actualizar producto */
    var personaSeleccionada = 0;

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

    limpiarHtml();

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
            listaPersonas = response;
            imprimirSeleccion();
            imprimirFiltro();
        });
    
    
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
                ${vchDireccionPersona}
            </label></td>
            <td class="shadow px-4 text-center"><label class="block">
                ${vchTelefonoPersona}
            </label></td>
            <td class="shadow px-4 text-center"><label class="block">
                ${vchEmailPersona}
            </label></td>
            <td class="shadow px-8 inline-flex items-center" id="botones">
                <button type="button" onclick="editarPersona(this,${intPersonaID})"
                            class="flex py-1 px-2 text-xs text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700">
                            Editar</button>
            </td>
        
            `
            tablaPersonas.appendChild(tr);
        }
    }


    /* Funcion de limpiar el html, dejar la tabla vacia */
    function limpiarHtml() {
        tablaPersonas.innerHTML = '';
    }


    /* Imprime la lista de selectores junto al buscador de tipo de persona */
    function imprimirSeleccion() {
        const filtroTipoPersona = document.querySelector('#filtroTipoPersona');

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

                    filtroTipoPersona.appendChild(selectTipoPerso);
                }
            })
    
    }

    /* ============= Imprime la lista dependiendo de el filtro ========== */
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


    /* ***************  Función para imprimir los select de la barra lateral izquierda de tipo de persona **************** */
    function imprimirFiltro() {
        const selectTipoPersona = document.querySelector('#selectTipoPersona');
        var tipoPersona = {
            "vchNombreTipoPersona": ""
        }

        fetch(APITipoPerso, {
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
                    const { intTipoPersonaID, vchNombreTipoPersona } = listaPersonas[i];
                    const seleccionTipoPersona = document.createElement('option');

                    seleccionTipoPersona.innerHTML = `
                <option value="${intTipoPersonaID}">${vchNombreTipoPersona} </option>
                `;

                    selectTipoPersona.appendChild(seleccionTipoPersona);
                }
            })
    }

    /* ******* Función para la creación o actualización de un producto ********/
    function enviarDatosBD() {
        const APIAgregarPersona = 'https://localhost:44363/api/persona/agregarPersona';
        const APIEditarPersona = 'https://localhost:44363/api/persona/actualizaPersona';

        const selectTipoPersona = document.querySelector('#selectTipoPersona').selectedIndex;
        const nombrePersona = document.querySelector('#nombrePersona').value;
        const direccionPersona = document.querySelector('#direccionPersona').value;
        const telefonoPersona = document.querySelector('#telefonoPersona').value;
        const emailPersona = document.querySelector('#emailPersona').value;

        var nuevaPersona = {};
        if (personaSeleccionada > 0) {
            personaSeleccionada = Number(personaSeleccionada);
            nuevaPersona = {
                "persona": {
                    "intPersonaID": personaSeleccionada,
                    "intTipoPersonaID": selectTipoPersona,
                    "vchNombrePersona": nombrePersona,
                    "vchDireccionPersona": direccionPersona,
                    "vchTelefonoPersona": telefonoPersona,
                    "vchEmailPersona": emailPersona
                }
            };

            fetch(APIEditarPersona, {
                method: 'POST',
                body: JSON.stringify(nuevaPersona),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    if (response.valido) {
                        alert("Persona actualizada correctamente");
                        window.location.reload();
                        limpiarFormulario();
                    }
                    else {
                        alert("Existe un error al editar la persona")
                    }
                });
        } else {
            nuevaPersona = {
                "persona": {
                    "intTipoPersonaID": selectTipoPersona,
                    "vchNombrePersona": nombrePersona,
                    "vchDireccionPersona": direccionPersona,
                    "vchTelefonoPersona": telefonoPersona,
                    "vchEmailPersona": emailPersona
                }
            };

            fetch(APIAgregarPersona, {
                method: 'POST',
                body: JSON.stringify(nuevaPersona),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    if (response.valido) {
                        alert("Persona aagregada correctamente");
                        window.location.reload();
                        limpiarFormulario();
                    }
                    else {
                        alert("Existe un error al agregar la persona")
                    }
                });
        }
    }

    /** Función para limpiar los valores del formulario **/
    function limpiarFormulario() {
        personaSeleccionada = 0;

        const selectTipoPersona = document.querySelector('#selectTipoPersona');
        selectTipoPersona.selectedIndex = 0;
        const nombrePersona = document.querySelector('#nombrePersona');
        nombrePersona.value = '';
        const direccionPersona = document.querySelector('#direccionPersona');
        direccionPersona.value = '';
        const telefonoPersona = document.querySelector('#telefonoPersona');
        telefonoPersona.value = '';
        const emailPersona = document.querySelector('#emailPersona');
        emailPersona.value = '';
    }

    /** Función para editar la persona **/
    function editarPersona(check, intPersonaID) {
        const personas = listaPersonas.filter(p => p.intPersonaID == intPersonaID);
        const persona = personas[0];

        const selectTipoPersona = document.querySelector('#selectTipoPersona');
        selectTipoPersona.selectedIndex = persona.intTipoPersonaID;
        const nombrePersona = document.querySelector('#nombrePersona');
        nombrePersona.value = persona.vchNombrePersona;
        const direccionPersona = document.querySelector('#direccionPersona');
        direccionPersona.value = persona.vchDireccionPersona;
        const telefonoPersona = document.querySelector('#telefonoPersona');
        telefonoPersona.value = persona.vchTelefonoPersona;
        const emailPersona = document.querySelector('#emailPersona');
        emailPersona.value = persona.vchEmailPersona;

        personaSeleccionada = persona.intPersonaID;
    }



} // Fin del else