using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Control_Inventario_KM.App_Data;

namespace Control_Inventario_KM.Controllers
{
    [RoutePrefix("api/usuario")]

    public class UsuariosController : ApiController
    {

        // Catalogo Rol de Usuarios
        /*
                {
                  "vchNombreRol": ""
                }
         */
        [HttpPost]
        [Route("catRolUsuario")]

        public object catRolUsuario([FromBody] JObject data)
        {
            using (var conexion = new Control_Inventario_KMEntities())
            {
                var catalogoRolUsuario = conexion.CAT_RolUsuario.Select(r => new { r.intRolID, r.vchNombreRol }).ToList();
                return catalogoRolUsuario;
            }
        }

        // Lista Usuarios
        /*
            {
                "nombre": "",
                "rol": 0
            }
         */

        [HttpPost]
        [Route("listaUsuarios")]

        public object listaUsuarios([FromBody] JObject data)
        {
            string nombre = data["nombre"].ToObject<string>();
            int rol = data["rol"].ToObject<int>();
            using (var conexion = new Control_Inventario_KMEntities())
            {
                var catalogoUsuarios = conexion.CAT_Usuarios.Where(u => (rol == 0 || u.intRolID == rol)
                && (nombre == string.Empty || u.vchNombreUsuario.Contains(nombre))
                ).Select(u => new
                {
                    u.intRolID,
                    u.vchNombreUsuario,
                    u.vchApellidoUsuario,
                    u.vchDireccionUsuario,
                    u.vchTelefonoUsuario,
                    u.vchUserUsuario,
                    u.bitEstadoUsuario
                }).ToList();
                return catalogoUsuarios;
            }
        }


        // Agregar Usuario
        /*
            
         */
        [HttpPost]
        [Route("agregarUsuario")]

        public object agregarUsuario([FromBody] JObject data)
        {
            CAT_Usuarios usuario = data["usuario"].ToObject<CAT_Usuarios>();
            using (var conexion = new Control_Inventario_KMEntities())
            {
                if(conexion.CAT_Usuarios.Any(u => u.vchNombreUsuario == usuario.vchNombreUsuario))
                {
                    return new
                    {
                        valido = false,
                        Detalle = "Ya existe un usuario con el mismo nombre"
                    };
                }
                else
                {
                    usuario.intRolID = usuario.intRolID;
                    usuario.vchNombreUsuario = usuario.vchNombreUsuario;
                    usuario.vchApellidoUsuario = usuario.vchApellidoUsuario;
                    usuario.vchDireccionUsuario = usuario.vchDireccionUsuario;
                    usuario.vchTelefonoUsuario = usuario.vchTelefonoUsuario;
                    usuario.vchUserUsuario = usuario.vchUserUsuario;
                    usuario.vchContraseñaUsuario = usuario.vchContraseñaUsuario;
                    usuario.bitEstadoUsuario = true;
                    conexion.CAT_Usuarios.Add(usuario);
                    conexion.SaveChanges();
                    return new
                    {
                        valido = true,
                        Detalle = "Usuario creado correctamente"
                    };
                }
            }
        }


        // Actualiza Usuario
        [HttpPost]
        [Route("actualizaUsuario")]

        public object actualizaUsuario([FromBody] JObject data)
        {
            CAT_Usuarios usuario = data["usuario"].ToObject<CAT_Usuarios>();
            using (var conexion = new Control_Inventario_KMEntities())
            {
                if(conexion.CAT_Usuarios.Any(u => u.intUsuarioID == usuario.intUsuarioID))
                {
                    if(conexion.CAT_Usuarios.Any(u => u.intUsuarioID != usuario.intUsuarioID
                    && u.vchNombreUsuario == usuario.vchNombreUsuario))
                    {
                        return new
                        {
                            valido = false,
                            Detalle = "Un usuario ya existe con el mismo nombre"
                        };
                    }
                    else
                    {
                        var usuarioBase = conexion.CAT_Usuarios.FirstOrDefault(u => u.intUsuarioID == usuario.intUsuarioID);

                        usuarioBase.intRolID = usuario.intRolID;
                        usuarioBase.vchNombreUsuario = usuario.vchNombreUsuario;
                        usuarioBase.vchApellidoUsuario = usuario.vchApellidoUsuario;
                        usuarioBase.vchDireccionUsuario = usuario.vchDireccionUsuario;
                        usuarioBase.vchTelefonoUsuario = usuario.vchTelefonoUsuario;
                        usuarioBase.vchUserUsuario = usuario.vchUserUsuario;
                        // usuarioBase.vchContraseñaUsuario = usuario.vchContraseñaUsuario;
                        usuarioBase.bitEstadoUsuario = usuario.bitEstadoUsuario;
                        conexion.SaveChanges();
                        return new
                        {
                            valido = true,
                            Detalle = "El usuario se ha actualizado correctamente"
                        };
                    }
                }
                else
                {
                    return new
                    {
                        valido = false,
                        Detalle = "El usuario no existe"
                    };
                }
            }
        }


        // Actualiza contraseña

    }
}
