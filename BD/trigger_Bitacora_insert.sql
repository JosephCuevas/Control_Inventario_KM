use Control_Inventario_KM
go
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE TRIGGER trigger_Bitacora_insert
   ON  CAT_Productos
   AFTER INSERT
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	INSERT INTO Bitacora_Productos (intProductoID,
	datFechaBitacora,
	intTipoPrendaID,
	intTallaID,
	intColorID,
	vchSKUProducto,
	vchNombreProducto,
	decCostoProducto,
	intStockProducto,
	vchDescripcionProducto,
	vchImagenProducto,
	bitEstadoProducto,
	datFechaAltaProducto,
	intEventoID,
	intUsuarioAltaProducto)
    select intProductoID,
	GETDATE(),
	intTipoPrendaID,
	intTallaID,
	intColorID,
	vchSKUProducto,
	vchNombreProducto,
	decCostoProducto,
	intStockProducto,
	vchDescripcionProducto,
	vchImagenProducto,
	bitEstadoProducto,
	datFechaAltaProducto,
	1,
	intUsuarioAltaProducto
	FROM inserted;

END
GO