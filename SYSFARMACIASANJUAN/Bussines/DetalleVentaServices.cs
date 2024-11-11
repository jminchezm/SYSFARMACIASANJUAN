using SYSFARMACIASANJUAN.DataAccess;
using SYSFARMACIASANJUAN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SYSFARMACIASANJUAN.Bussines
{
    public class DetalleVentaServices
    {
        private DetalleVentaDataAccess detalleVentaDataAccess = new DetalleVentaDataAccess();

        public List<DetalleVenta> ObtenerListarDetalleVentaPorFiltro(string detalleVentaId = null, string ventaId = null, string productoId = null)
        {
            // Obtén la lista completa de productos que coinciden con el ID, nombre, fecha de creación y estado
            var detalleVentas = detalleVentaDataAccess.ListarDetalleVentaPorFiltro(detalleVentaId, ventaId, productoId);

            // Devuelve la lista de productos (puede estar vacía si no se encontraron coincidencias)
            return detalleVentas;
        }

        public string MantenimientoDetalleVenta(
        string detalleVentaId,
        string ventaId,
        string productoId,
        int detalleVentaCantidad,
        decimal detalleVentaPrecioUnitario,
        string accion)
        {

            if (!IsValidAccion(accion))
            {
                throw new ArgumentException("La acción especificada no es válida. Use '1' (insertar), '2' (modificar), '3' (eliminar) o '4' (eliminar2).");
            }

            // Llamada a la capa de datos para ejecutar el procedimiento almacenado
            return detalleVentaDataAccess.MantenimientoDetalleVenta(
                detalleVentaId,
                ventaId,
                productoId,
                detalleVentaCantidad,
                detalleVentaPrecioUnitario,
                accion
            );
        }

        // Método auxiliar para validar la acción
        private bool IsValidAccion(string accion)
        {
            return accion == "1" || accion == "2" || accion == "3" || accion == "4";
        }

        //public bool DescontarStockInventarioPorVenta(string ventaId, List<(int productoId, int cantidadVendida)> productos)
        //{
        //    if (string.IsNullOrWhiteSpace(ventaId))
        //        throw new ArgumentException("El ID de venta no puede ser nulo o vacío");
        //    if (productos == null || !productos.Any())
        //        throw new ArgumentException("Debe proporcionar al menos un producto para descontar del inventario");

        //    return detalleVentaDataAccess.DescontarStockInventario(ventaId, productos);
        //}

        public bool DescontarStockInventarioPorVenta(string ventaId)
        {
            if (string.IsNullOrWhiteSpace(ventaId))
                throw new ArgumentException("El ID de venta no puede ser nulo o vacío");

            // Llamada al Data Access para descontar el stock de inventario
            var detalleVentaDataAccess = new DetalleVentaDataAccess();
            return detalleVentaDataAccess.DescontarStockInventario(ventaId);
        }

        //public bool DescontarStockInventarioPorVenta(string ventaId)
        //{
        //    if (string.IsNullOrWhiteSpace(ventaId))
        //        throw new ArgumentException("El ID de venta no puede ser nulo o vacío");

        //    return detalleVentaDataAccess.DescontarStockInventario(ventaId);
        //}

    }
}