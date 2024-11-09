using SYSFARMACIASANJUAN.DataAccess;
using SYSFARMACIASANJUAN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SYSFARMACIASANJUAN.Bussines
{
    public class PedidoServices
    {
        private PedidoDataAccess pedidoDataAccess = new PedidoDataAccess();

        public List<Pedido> ObtenerListarPedidosPorFiltro(string pedidoId = null, DateTime? fechaCreacionPedido = null, string pedidoEstado = null, string pedidoProveedorId = null)
        {
            // Obtén la lista completa de productos que coinciden con el ID, nombre, fecha de creación y estado
            var pedidos = pedidoDataAccess.ListarPedidosPorFiltro(pedidoId, fechaCreacionPedido, pedidoEstado, pedidoProveedorId);

            // Devuelve la lista de productos (puede estar vacía si no se encontraron coincidencias)
            return pedidos;
        }

        public string MantenimientoPedido(
        ref string pedidoId,
        DateTime ? fechaCreacion,
        string estado,
        DateTime ? fechaEntregaEstimada,
        string observacion,
        string proveedorId,
        string accion)
        {
            if (string.IsNullOrWhiteSpace(pedidoId) && accion != "1")
            {
                throw new ArgumentException("El ID del pedido es obligatorio para modificar o eliminar un registro.");
            }

            if (!IsValidAccion(accion))
            {
                throw new ArgumentException("La acción especificada no es válida. Use '1' (insertar), '2' (modificar) o '3' (eliminar).");
            }

            return pedidoDataAccess.MantenimientoPedido(
                ref pedidoId,
                fechaCreacion,
                estado,
                fechaEntregaEstimada,
                observacion,
                proveedorId,
                accion
            );
        }

        private bool IsValidAccion(string accion)
        {
            return accion == "1" || accion == "2" || accion == "3";
        }


        //public string MantenimientoPedido(
        //string pedidoId,
        //DateTime fechaCreacion,
        //string estado,
        //DateTime fechaEntregaEstimada,
        //string observacion,
        //string proveedorId,
        //string accion)
        //{
        //    // Validaciones adicionales de negocio
        //    if (string.IsNullOrWhiteSpace(pedidoId) && accion != "1")
        //    {
        //        throw new ArgumentException("El ID del producto es obligatorio para modificar o eliminar un registro.");
        //    }

        //    //if (nombre.Length > 100)
        //    //{
        //    //    throw new ArgumentException("El nombre del producto no debe exceder los 100 caracteres.");
        //    //}

        //    if (!IsValidAccion(accion))
        //    {
        //        throw new ArgumentException("La acción especificada no es válida. Use '1' (insertar), '2' (modificar) o '3' (eliminar).");
        //    }

        //    //if (accion == "2" && imagen.Length <= 0)
        //    //{
        //    //    //Console.WriteLine(imagen);
        //    //    Console.WriteLine("Hola Mundo");
        //    //}

        //    // Llamada a la capa de datos para ejecutar el procedimiento almacenado
        //    return pedidoDataAccess.MantenimientoPedido(
        //        pedidoId,
        //        fechaCreacion,
        //        estado,
        //        fechaEntregaEstimada,
        //        observacion,
        //        proveedorId,
        //        accion
        //    );
        //}

        //// Método auxiliar para validar la acción
        //private bool IsValidAccion(string accion)
        //{
        //    return accion == "1" || accion == "2" || accion == "3";
        //}
    }
}