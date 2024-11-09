using SYSFARMACIASANJUAN.DataAccess;
using SYSFARMACIASANJUAN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SYSFARMACIASANJUAN.Bussines
{
    public class InventarioProductoServices
    {

        private InventarioProductoDataAccess inventarioProductoDataAccess = new InventarioProductoDataAccess();

        public List<InventarioProducto> ObtenerListarInventarioProductosPorFiltro(string inventarioId = null, string inventarioProductoId = null, string inventarioProductoNombre = null, int inventarioStock = 0, decimal inventarioPrecioUnitario = 0)
        {
            // Obtén la lista completa de productos que coinciden con el ID, nombre, fecha de creación y estado
            var inventarioProductos = inventarioProductoDataAccess.ListarInventarioProductoPorFiltro(inventarioId, inventarioProductoId, inventarioProductoNombre, inventarioStock, inventarioPrecioUnitario);

            // Devuelve la lista de productos (puede estar vacía si no se encontraron coincidencias)
            return inventarioProductos;
        }

        public string MantenimientoInventarioProducto(
        string inventarioProductoId,
        string inventarioProductoProductoId,
        int inventarioProductoStock,
        decimal inventarioProductoPrecioUnitario,
        string accion)
        {

            if (!IsValidAccion(accion))
            {
                throw new ArgumentException("La acción especificada no es válida. Use '1' (insertar), '2' (modificar) o '3' (eliminar).");
            }

            // Llamada a la capa de datos para ejecutar el procedimiento almacenado
            return inventarioProductoDataAccess.MantenimientoInventarioProducto(
                inventarioProductoId,
                inventarioProductoProductoId,
                inventarioProductoStock,
                inventarioProductoPrecioUnitario,
                accion
            );
        }

        // Método auxiliar para validar la acción
        private bool IsValidAccion(string accion)
        {
            return accion == "1" || accion == "2" || accion == "3";
        }
    }
}