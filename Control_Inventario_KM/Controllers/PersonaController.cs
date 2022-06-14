using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Control_Inventario_KM.App_Data;
using Newtonsoft.Json.Linq;

namespace Control_Inventario_KM.Controllers
{
    [RoutePrefix("api/persona")]

    public class PersonaController : ApiController
    {

        // Catalogo de Tipo de Personas
        [HttpPost]
        [Route("catTipoPersona")]

        public object catTipoPersona([FromBody] JObject data)
        {
            using (var conexion = new Control_Inventario_KMEntities())
            {
                var catalogoTipoPersona = conexion.CAT_TipoPersona.Select(p => new { p.intTipoPersonaID, p.vchNombreTipoPersona }).ToList();
                return catalogoTipoPersona;
            }
        }


        // Catalogo de Personas
        [HttpPost]
        [Route("catPersona")]

        public object catPersona([FromBody] JObject data)
        {
            string nombre = data["nombre"].ToObject<string>();
            int tipo = data["tipo"].ToObject<int>();
            using (var conexion = new Control_Inventario_KMEntities())
            {
                var catalogoPersona = conexion.CAT_Personas.Where(p => (tipo == 0 || p.intTipoPersonaID == tipo)
                && (nombre == string.Empty || p.vchNombrePersona.Contains(nombre))
                ).Select(p => new
                {
                    p.intPersonaID,
                    p.intTipoPersonaID,
                    p.vchNombrePersona,
                    p.vchDireccionPersona,
                    p.vchTelefonoPersona,
                    p.vhcEmailPersona
                }).ToList();
                return catalogoPersona;
            }
        }

        // Agregar Persona
        [HttpPost]
        [Route("agregarPersona")]

        public object agregarPersona([FromBody] JObject data)
        {
            CAT_Personas persona = data["persona"].ToObject<CAT_Personas>();
            using (var conexion = new Control_Inventario_KMEntities())
            {
                if(conexion.CAT_Personas.Any(p => p.vchNombrePersona == persona.vchNombrePersona))
                {
                    return new
                    {
                        valido = false,
                        Detalle = "Una persona ya existe con el mismo nombre"
                    };
                }
                else
                {
                    persona.intTipoPersonaID = persona.intTipoPersonaID;
                    persona.vchNombrePersona = persona.vchNombrePersona;
                    persona.vchDireccionPersona = persona.vchDireccionPersona;
                    persona.vchTelefonoPersona = persona.vchTelefonoPersona;
                    conexion.CAT_Personas.Add(persona);
                    conexion.SaveChanges();
                    return new
                    {
                        valido = true,
                        Detalle = "La persona ha sido agregada correctamente"
                    };
                }
            }
        }


        // Actualiza Persona
        [HttpPost]
        [Route("actualizaPersona")]

        public object actualizaPersona([FromBody] JObject data)
        {
            CAT_Personas persona = data["persona"].ToObject<CAT_Personas>();
            using (var conexion = new Control_Inventario_KMEntities())
            {
                if(conexion.CAT_Personas.Any(p => p.intPersonaID == persona.intPersonaID))
                {
                    if(conexion.CAT_Personas.Any(p => p.intPersonaID != persona.intPersonaID
                    && p.vchNombrePersona == persona.vchNombrePersona))
                    {
                        return new
                        {
                            valido = false,
                            Detalle = "La persona no puede actulizarse ya existe con el mismo nombre"
                        };
                    }
                    else
                    {
                        var personaBase = conexion.CAT_Personas.FirstOrDefault(p => p.intPersonaID == persona.intPersonaID);

                        personaBase.intTipoPersonaID = persona.intTipoPersonaID;
                        personaBase.vchNombrePersona = persona.vchNombrePersona;
                        personaBase.vchDireccionPersona = persona.vchNombrePersona;
                        personaBase.vchTelefonoPersona = persona.vchTelefonoPersona;
                        conexion.SaveChanges();
                        return new
                        {
                            valido = true,
                            Detalle = "La persona se ha actualizado correctamente"
                        };
                    }
                }
                else
                {
                    return new
                    {
                        valido = false,
                        Detalle = "La persona no existe"
                    };
                }
            }
        }

    }
}
