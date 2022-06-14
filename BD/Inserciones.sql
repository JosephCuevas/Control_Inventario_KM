use Control_Inventario_KM;

go

insert into CAT_Colores(vchNombreColor) 
values ('Negro'),('Blanco'),('Gris Jaspe'),('Rojo')

go

insert into CAT_Tallas(vchNombreTalla) 
values ('Chica'),('Mediana'),('Grande'),('Extra Grande'),('2 Extra Grande'),('3 Extra Grande')

go

insert into CAT_TipoPrendas(vchNombreTipoPrenda) 
values ('Playera Cuello Redondo'),
('Playera Manga Larga'),
('Playera Cuello V'),
('Playera Tank Top'),
('Playera Sin Manga'),
('Playera Polo'),
('Sudadera Cuello Redondo'),
('Sudadera Canguro'),
('Sudadera Cierre'),
('Gorra Plana'),
('Gorra Trucker'),
('Gorra Baseball'),
('Beanie'),
('Bucket')

go

insert into CAT_RolUsuario(vchNombreRol, vchDescripcionRol, bitEstadoRol) 
values ('Administrador','El rol de admin no tiene restriccion',1),
		('Usuario','El rol del user esta restringido',1)

go

insert into CAT_Usuarios(intRolID, vchNombreUsuario, vchApellidoUsuario, vchDireccionUsuario, vchTelefonoUsuario, vchUserUsuario, vchContrasenaUsuario, bitEstadoUsuario)
values (1,'Aministrador','Kingmonster','Vertiz 86','564896535','admin','Vertiz86',1),
		(2,'Josue','Cuevas','Villa de Cortez #27','5618667848','vader','Vader123',1)

go

insert into CAT_Productos(intTipoPrendaID, intTallaID, intColorID, vchSKUProducto, vchNombreProducto, decCostoProducto, intStockProducto, vchDescripcionProducto, vchImagenProducto, bitEstadoProducto, datFechaAltaProducto)
values (2,3,4,'SKU002','Prenda2',90,20,'Descripcion prenda 2','imagenPrenda2',1,'20220508')

go

select * from CAT_Usuarios;
go
select * from CAT_Colores;
go
select * from CAT_Tallas;
go
select * from CAT_TipoPrendas;
go
select * from CAT_RolUsuario;
go
select * from CAT_Productos;
go
select * from CAT_Personas;
go
select * from CAT_TipoPersona;