//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Control_Inventario_KM.App_Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class DetalleInvSal
    {
        public int intDetalleInvSalID { get; set; }
        public Nullable<int> intInventarioSalID { get; set; }
        public Nullable<int> intProductoID { get; set; }
        public Nullable<int> intCantidadProSal { get; set; }
        public Nullable<decimal> decCostoParcial { get; set; }
        public Nullable<decimal> decDescuento { get; set; }
    
        public virtual CAT_Productos CAT_Productos { get; set; }
        public virtual InventarioSaliente InventarioSaliente { get; set; }
    }
}
