﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class Control_Inventario_KMEntities : DbContext
    {
        public Control_Inventario_KMEntities()
            : base("name=Control_Inventario_KMEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<CAT_Colores> CAT_Colores { get; set; }
        public virtual DbSet<CAT_Personas> CAT_Personas { get; set; }
        public virtual DbSet<CAT_Productos> CAT_Productos { get; set; }
        public virtual DbSet<CAT_RolUsuario> CAT_RolUsuario { get; set; }
        public virtual DbSet<CAT_Tallas> CAT_Tallas { get; set; }
        public virtual DbSet<CAT_TipoPersona> CAT_TipoPersona { get; set; }
        public virtual DbSet<CAT_TipoPrendas> CAT_TipoPrendas { get; set; }
        public virtual DbSet<CAT_Usuarios> CAT_Usuarios { get; set; }
        public virtual DbSet<DetalleInvEnt> DetalleInvEnt { get; set; }
        public virtual DbSet<DetalleInvSal> DetalleInvSal { get; set; }
        public virtual DbSet<InventarioEntrante> InventarioEntrante { get; set; }
        public virtual DbSet<InventarioSaliente> InventarioSaliente { get; set; }
    }
}
