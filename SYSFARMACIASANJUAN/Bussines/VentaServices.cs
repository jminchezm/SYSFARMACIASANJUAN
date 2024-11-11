using SYSFARMACIASANJUAN.DataAccess;
using SYSFARMACIASANJUAN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SYSFARMACIASANJUAN.Bussines
{
    public class VentaServices
    {
        private VentaDataAccess ventaDataAccess = new VentaDataAccess();

        public List<Venta> ObtenerListarVentaPorFiltro(string ventaId = null, DateTime? fechaInicio = null, DateTime? fechaFin = null, string clienteId = null)
        {
            // Obtén la lista completa de productos que coinciden con el ID, nombre, fecha de creación y estado
            var ventas = ventaDataAccess.ListarVentasPorFiltro(ventaId, fechaInicio, fechaFin, clienteId);

            // Devuelve la lista de productos (puede estar vacía si no se encontraron coincidencias)
            return ventas;
        }

        public string MantenimientoVenta(
        ref string ventaId,
        DateTime? ventaFecha,
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

        public string ModificarTotalVenta(Venta venta)
        {
            if (string.IsNullOrWhiteSpace(venta.ventaId))
            {
                throw new ArgumentException("El ID de la venta es obligatorio.");
            }

            return ventaDataAccess.ModificarTotalVenta(venta);
        }

    }
}