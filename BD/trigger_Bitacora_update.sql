USE [Control_Inventario_KM]
GO
/****** Object:  Trigger [dbo].[trigger_Bitacora_update]    Script Date: 07/07/2022 11:50:43 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER TRIGGER [dbo].[trigger_Bitacora_update]
   ON  [dbo].[CAT_Productos]
   AFTER UPDATE
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
	2,
	intUsuarioAltaProducto
	FROM deleted;

END
