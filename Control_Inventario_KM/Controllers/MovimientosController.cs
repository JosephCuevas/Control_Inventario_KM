using Control_Inventario_KM.App_Data;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Control_Inventario_KM.Controllers
{
    [RoutePrefix("api/movimientos")]
    public class MovimientoInventarioController : ApiController
    {

        // lista de movimientos de productos o prendas
        [HttpPost]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("listaMovProd")]

        public object listaMovProd([FromBody] JObject data)
        {
            string nombreProd = data["nombreProd"].ToObject<string>();
            using (var conexion = new Control_Inventario_KMEntities())
            {
                try
                {
                    var catalogoProductos = conexion.CAT_Productos.Where(r => (nombreProd == string.Empty || r.vchNombreProducto.Contains(nombreProd))
                    ).Select(r => new
                    {
                        r.intProductoID,
                        r.vchNombreProducto,
                        r.decCostoProducto,
                        r.intStockProducto
                    }).ToList();
                    if(catalogoProductos.Count == 0)
                    {
                        return new
                        {
                            valido = false,
                            Detalle = "Lista vacia"
                        };
                    }
                    else
                    {
                         return catalogoProductos;

                    }
                }
                catch(Exception e)
                {
                    return new
                    {
                        valido = false,
                        Detalle = "Error", e
                    };
                }
            }
        }

        //Agregar nuevo inventario entrante
        [HttpPost]
        [EnableCors(origins:"*", headers:"*", methods:"*")]
        [Route("inventarioEntrante")]

        public object inventarioEntrante([FromBody] JObject data)
        {
            InventarioEntrante inventrante = data["inventrante"].ToObject<InventarioEntrante>();
            using (var conexion = new Control_Inventario_KMEntities())
            {
                inventrante.intPersonaID = inventrante.intPersonaID;
                inventrante.intUsuarioID = inventrante.intUsuarioID;
                inventrante.datFechaInvEnt = DateTime.Now;
                inventrante.vchEstadoInvEnt = "En Espera";
                conexion.InventarioEntrante.Add(inventrante);
                conexion.SaveChanges();
                return new
                {
                    valido = true,
                    Detalle = "Inventario creado correctamente"
                };
            }
        }

        // Detalle de inventario entrante
        [HttpPost]
        [EnableCors(origins:"*", headers:"*", methods:"*")]
        [Route("detInvEntrante")]

        public object detInvEntrante([FromBody] JObject data)
        {
            DetalleInvEnt detinventrante = data["detinventrante"].ToObject<DetalleInvEnt>();
            using (var conexion = new Control_Inventario_KMEntities())
            {
                detinventrante.intInventarioEntID = detinventrante.intInventarioEntID;
                detinventrante.intProductoID = detinventrante.intProductoID;
                detinventrante.intProductoID = detinventrante.intProductoID;
                detinventrante.intCantidadProEnt = detinventrante.intCantidadProEnt;
                detinventrante.decCostoParcial = detinventrante.decCostoParcial;
                conexion.DetalleInvEnt.Add(detinventrante);
                conexion.SaveChanges();
                return new
                {
                    valido = true,
                    Detalle = "Detalle de inventario agregado correctamente"
                };
            }
        }


        //Control de inventario Saliente
        [HttpPost]
        [EnableCors(origins:"*", headers:"*", methods:"*")]
        [Route("inventarioSaliente")]

        public object inventarioSaliente([FromBody] JObject data)
        {
            InventarioSaliente invsaliente = data["invesaliente"].ToObject<InventarioSaliente>();
            using (var conexion = new Control_Inventario_KMEntities())
            {
                invsaliente.intPersonaID = invsaliente.intPersonaID;
                invsaliente.intUsuarioID = invsaliente.intUsuarioID;
                invsaliente.datFechaInvSal = DateTime.Now;
                invsaliente.decTotalInvSal = invsaliente.decTotalInvSal;
                invsaliente.vchEstadoInvSal = invsaliente.vchEstadoInvSal;
                conexion.InventarioSaliente.Add(invsaliente);
                conexion.SaveChanges();
                return new
                {
                    valido = true,
                    Detalle = "Inventario saliente agregado correctamente"
                };
            }
        }

        // Detalle de inventario saliente
        [HttpPost]
        [Route("detInvSaliente")]
        [EnableCors(origins:"*", headers:"*", methods:"*")]

        public object detInvSaliente([FromBody] JObject data)
        {
            DetalleInvSal detinvsaliente = data["detinvsaliente"].ToObject<DetalleInvSal>();
            using (var conexion = new Control_Inventario_KMEntities())
            {
                detinvsaliente.intInventarioSalID = detinvsaliente.intInventarioSalID;
                detinvsaliente.intProductoID = detinvsaliente.intProductoID;
                detinvsaliente.intCantidadProSal = detinvsaliente.intCantidadProSal;
                detinvsaliente.decCostoParcial = detinvsaliente.decCostoParcial;
                detinvsaliente.decDescuento = detinvsaliente.decDescuento;
                conexion.DetalleInvSal.Add(detinvsaliente);
                conexion.SaveChanges();
                return new
                {
                    valido = true,
                    Detalle = "Detalle de inventario saliente agregado correctamente"
                };
            }
        }
    }
}
