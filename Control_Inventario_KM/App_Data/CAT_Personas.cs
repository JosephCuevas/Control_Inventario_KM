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
    
    public partial class CAT_Personas
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public CAT_Personas()
        {
            this.InventarioEntrante = new HashSet<InventarioEntrante>();
            this.InventarioSaliente = new HashSet<InventarioSaliente>();
        }
    
        public int intPersonaID { get; set; }
        public Nullable<int> intTipoPersonaID { get; set; }
        public string vchNombrePersona { get; set; }
        public string vchDireccionPersona { get; set; }
        public string vchTelefonoPersona { get; set; }
        public string vchEmailPersona { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<InventarioEntrante> InventarioEntrante { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<InventarioSaliente> InventarioSaliente { get; set; }
        public virtual CAT_TipoPersona CAT_TipoPersona { get; set; }
    }
}
