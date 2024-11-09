using SYSFARMACIASANJUAN.DataAccess;
using SYSFARMACIASANJUAN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SYSFARMACIASANJUAN.Bussines
{
    public class DetallePedidoServices
    {

        private DetallePedidoDataAccess detallePedidoDataAccess = new DetallePedidoDataAccess();

        public List<DetallePedido> ObtenerListarDetallePedidoPorFiltro(string detallePedidoId = null, string pedidoId = null, string productoId = null)
        {
            // Obtén la lista completa de productos que coinciden con el ID, nombre, fecha de creación y estado
            var detallePedidos = detallePedidoDataAccess.ListarDetallePedidoPorFiltro(detallePedidoId, pedidoId, productoId);

            // Devuelve la lista de productos (puede estar vacía si no se encontraron coincidencias)
            return detallePedidos;
        }

        public string MantenimientoDetallePedido(
        string detallePedidoId,
        string detallePedido_PedidoId,
        string detallePedido_ProductoId,
        int detallePedidoCantidad,
        decimal detallePedidoPrecioUnitario,
        decimal detallePedidoSubTotal,
        string accion)
        {  

            if (!IsValidAccion(accion))
            {
                throw new ArgumentException("La acción especificada no es válida. Use '1' (insertar), '2' (modificar), '3' (eliminar) o '4' (eliminar2).");
            }

            // Llamada a la capa de datos para ejecutar el procedimiento almacenado
            return detallePedidoDataAccess.MantenimientoDetallePedido(
                detallePedidoId,
                detallePedido_PedidoId,
                detallePedido_ProductoId,
                detallePedidoCantidad,
                detallePedidoPrecioUnitario,
                detallePedidoSubTotal,
                accion
            );
        }

        // Método auxiliar para validar la acción
        private bool IsValidAccion(string accion)
        {
            return accion == "1" || accion == "2" || accion == "3" || accion == "4";
        }
    }
}