const APIL = 'https://localhost:44327/api/acceso/loginacceso';

const formLogin = document.querySelector('#formLogin');

formLogin.addEventListener('submit', logear);

function logear(e){
    e.preventDefault();
    const usuario = document.querySelector('#nombreUsuario').value;
    const password = document.querySelector('#password').value;

    var data = {
    "usuario": usuario,
    "password": password
    }

    fetch(APIL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            if(response.acceso){
                localStorage.setItem("usuario", response.usuario.usuario);
                localStorage.setItem("usuarioid", response.usuario.id);
                localStorage.setItem("usuarionombre", response.usuario.nombre);
                window.location.replace("./index.html");
                console.log("Correcto");
            }
            else{
                alert('Datos inconrectos por favor intente de nuevo')
            }
        });
}