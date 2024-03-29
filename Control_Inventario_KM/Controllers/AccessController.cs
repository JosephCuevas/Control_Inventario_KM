﻿using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Control_Inventario_KM.App_Data;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Control_Inventario_KM.Controllers
{
    [RoutePrefix("api/acceso")]

    public class AccesoController : ApiController
    {
        [HttpPost]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("loginAcceso")]

        public object loginAcceso([FromBody] JObject data)
        {
            object respuesta = new
            {
                acceso = false,
                respuesta = "",
                usuario = new
                {
                    id = 0,
                    nombre = "",
                    usuario = ""
                }
            };

            // logica de acceso
            string usuario = data["usuario"].ToObject<string>();
            string password = data["password"].ToObject<string>();
            using (var conexion = new Control_Inventario_KMEntities())
            {
                if (conexion.CAT_Usuarios.Any(x => x.vchUserUsuario == usuario && x.vchContraseñaUsuario == password))
                {
                    var usuarioDB = conexion.CAT_Usuarios.FirstOrDefault(x => x.vchUserUsuario == usuario && x.vchContraseñaUsuario == password);
                    respuesta = new
                    {
                        acceso = true,
                        respuesta = "Login correcto",
                        usuario = new
                        {
                            id = usuarioDB.intUsuarioID,
                            nombre = usuarioDB.vchNombreUsuario,
                            usuario = usuarioDB.vchUserUsuario
                        }
                    };
                }
                else
                {
                    respuesta = new
                    {
                        acceso = false,
                        respuesta = "No existe usuario"
                    };
                }
            }
            return respuesta;
        }
    }
}
