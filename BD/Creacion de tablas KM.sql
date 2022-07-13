create database Control_Inventario_KM;
go
use Control_Inventario_KM;
go

create table CAT_TipoPrendas
(
	intTipoPrendaID int IDENTITY,
	vchNombreTipoPrenda varchar(70) null,
	constraint PK_CAT_TipoPrenda primary key (intTipoPrendaID)
)

go

create table CAT_Tallas
(
	intTallaID int IDENTITY,
	vchNombreTalla varchar(70) null,
	constraint PK_CAT_Tallas primary key (intTallaID)
)

go

create table CAT_Colores
(
	intColorID int IDENTITY,
	vchNombreColor varchar(50) null,
	constraint PK_CAT_Colores primary key (intColorID)
)

go

create table CAT_Productos 
(
	intProductoID int IDENTITY,
	intTipoPrendaID int null,
	intTallaID int null,
	intColorID int null,
	vchSKUProducto varchar(10) null,
	vchNombreProducto varchar(100) null,
	decCostoProducto decimal(6,2) null,
	intStockProducto int null,
	vchDescripcionProducto varchar(100) null,
	vchImagenProducto varchar(250) null,
	bitEstadoProducto bit null,
	datFechaAltaProducto datetime null,
	intUsuarioAltaProducto int null,
	constraint PK_CAT_Productos primary key (intProductoID)
)

alter table CAT_Productos
add constraint FK_Productos_CAT_TipoPrendas foreign key (intTipoPrendaID)
references CAT_TipoPrendas (intTipoPrendaID)

alter table CAT_Productos
add constraint FK_Productos_CAT_Tallas foreign key (intTallaID)
references CAT_Tallas (intTallaID)

alter table CAT_Productos
add constraint FK_Productos_CAT_Colores foreign key (intColorID)
references CAT_Colores (intColorID)

alter table CAT_Productos
add constraint FK_Productos_CAT_Usuarios foreign key (intUsuarioAltaProducto)
references CAT_Usuarios (intUsuarioID)

go

create table CAT_RolUsuario
(
	intRolID int IDENTITY,
	vchNombreRol varchar(50) null,
	vchDescripcionRol varchar(50) null,
	bitEstadoRol bit null,
	constraint PK_CAT_RolUsuario primary key (intRolID)
)

go

create table CAT_Usuarios
(
	intUsuarioID int IDENTITY,
	intRolID int null,
	vchNombreUsuario varchar(50) null,
	vchApellidoUsuario varchar(50) null,
	vchDireccionUsuario varchar(250) null,
	vchTelefonoUsuario varchar(15) null,
	vchUserUsuario varchar(50) null,
	vchContrasenaUsuario varchar(50) null,
	bitEstadoUsuario bit null,
	constraint PK_CAT_Usuarios primary key (intUsuarioId)
)

alter table CAT_Usuarios
add constraint FK_CAT_Usuarios_CAT_RolUsuario foreign key (intRolID)
references CAT_RolUsuario (intRolID)

go


create table CAT_TipoPersona
(
	intTipoPersonaID int IDENTITY,
	vchNombreTipoPersona varchar(50) null,
	constraint PK_CAT_TipoPersona primary key (intTipoPersonaID)
)

go

create table CAT_Personas
(
	intPersonaID int IDENTITY,
	intTipoPersonaID int null,
	vchNombrePersona varchar(50) null,
	vchDireccionPersona varchar(250) null,
	vchTelefonoPersona varchar(15) null,
	vhcEmailPersona varchar(50) null,
	constraint PK_CAT_Personas primary key (intPersonaID)
)

alter table CAT_Personas
add constraint FK_Personas_CAT_TipoPersona foreign key (intTipoPersonaID)
references CAT_TipoPersona (intTipoPersonaID)

go

create table InventarioSaliente
(
	intInventarioSalID int IDENTITY,
	intPersonaID int null,
	intUsuarioID int null,
	datFechaInvSal datetime null,
	decTotalInvSal decimal(15,2) null,
	vchEstadoInvSal varchar(50) null,
	constraint PK_InventarioSaliente primary key (intInventarioSalID)
)

alter table InventarioSaliente
add constraint FK_InventarioSal_CAT_Pertsonas foreign key (intPersonaID)
references CAT_Personas (intPersonaID)

go

create table DetalleInvSal
(
	intDetalleInvSalID int IDENTITY,
	intInventarioSalID int null,
	intProductoID int null,
	intCantidadProSal int null,
	decCostoParcial decimal(15,2) null,
	decDescuento decimal(15,2) null,
	constraint PK_DetalleInvSal primary key (intDetalleInvSalID)
)

alter table DetalleInvSal
add constraint FK_DetalleInvSal_InventarioSaliente foreign key (intInventarioSalID)
references InventarioSaliente (intInventarioSalID)

alter table DetalleInvSal
add constraint FK_DetalleInvSal_CAT_Productos foreign key (intProductoID)
references CAT_Productos (intProductoID)

go

create table InventarioEntrante
(
	intInventarioEntID int IDENTITY,
	intPersonaID int null,
	intUsuarioID int null,
	datFechaInvEnt datetime null,
	decTotalInvEnt decimal(15,2) null,
	vchEstadoInvEnt varchar(50) null,
	constraint PK_InventarioEntrante primary key (intInventarioEntID)
)

alter table InventarioEntrante
add constraint FK_InventarioEntrante_CAT_Personas foreign key (intPersonaID)
references CAT_Personas (intPersonaID)

alter table InventarioEntrante
add constraint FK_InventarioEntrante_CAT_Usuarios foreign key (intUsuarioID)
references CAT_Usuarios (intUsuarioID)

go

create table DetalleInvEnt
(
	intDetalleInvEntID int IDENTITY,
	intInventarioEntID int null,
	intProductoID int null,
	intCantidadProEnt int null,
	decCostoParcial decimal(15,2),
	constraint PK_DetalleInvEnt primary key (intDetalleInvEntID)
)

alter table DetalleInvEnt
add constraint FK_DetalleInvEnt_InventarioEntrante foreign key (intInventarioEntID)
references InventarioEntrante (intInventarioEntID)

alter table DetalleInvEnt
add constraint FK_DetalleInvEnt_CAT_Productos foreign key (intProductoID)
references CAT_Productos (intProductoID)

go

create table CAT_Eventos
(
	intEventoID int IDENTITY,
	vchEvento varchar(30) null
	constraint PK_CAT_Eventos primary key (intEventoID)
)

go

create table Bitacora_Productos
(
	intBitacoraID int IDENTITY,
	intProductoID int null,
	datFechaBitacora datetime null,
	intTipoPrendaID int null,
	intTallaID int null,
	intColorID int null,
	vchSKUProducto varchar(10) null,
	vchNombreProducto varchar(100) null,
	decCostoProducto decimal(6,2) null,
	intStockProducto int null,
	vchDescripcionProducto varchar(100) null,
	vchImagenProducto varchar(250) null,
	bitEstadoProducto bit null,
	datFechaAltaProducto datetime null,
	intUsuarioAltaProducto int null,
	intEventoId int null
	constraint PK_Bitacora_ModificacionProductos primary key(intBitacoraID)
)

alter table Bitacora_Productos
add constraint FK_Bitacora_Productos_CAT_Productos foreign key (intProductoID)
references CAT_Productos (intProductoID)

alter table Bitacora_Productos
add constraint FK_Bitacora_Productos_CAT_Eventos foreign key (intEventoID)
references CAT_Eventos (intEventoID);

