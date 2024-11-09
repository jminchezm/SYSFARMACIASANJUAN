using SYSFARMACIASANJUAN.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SYSFARMACIASANJUAN.Bussines
{
    public class VentaServices
    {
        private VentaDataAccess ventaDataAccess = new VentaDataAccess();

        public string MantenimientoVenta(
        ref string ventaId,
        DateTime? ventaFecha,
        string ventaEstado,
        decimal ventaTotal,
        string venta_clienteId,
        string venta_usuarioId,
        string accion)
        {
            if (string.IsNullOrWhiteSpace(ventaId) && accion != "1")
            {
                throw new ArgumentException("El ID del pedido es obligatorio para modificar o eliminar un registro.");
            }

            if (!IsValidAccion(accion))
            {
                throw new ArgumentException("La acción especificada no es válida. Use '1' (insertar), '2' (modificar) o '3' (eliminar).");
            }

            return ventaDataAccess.MantenimientoVenta(
                ref ventaId,
                ventaFecha,
                ventaEstado,
                ventaTotal,
                venta_clienteId,
                venta_usuarioId,
                accion
            );
        }

        private bool IsValidAccion(string accion)
        {
            return accion == "1" || accion == "2" || accion == "3";
        }

    }
}