using Newtonsoft.Json;
using SYSFARMACIASANJUAN.Bussines;
using SYSFARMACIASANJUAN.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SYSFARMACIASANJUAN.Controllers
{
    public class PedidosController : ApiController
    {
        PedidoServices pedidoServices = new PedidoServices();

        //Retorna una lista de productos
        [HttpGet]
        [Route("api/pedidos")]
        public IHttpActionResult GetPedidoFiltro(string pedidoId = null, DateTime? fechaCreacionPedido = null, string pedidoEstado = null, string pedidoProveedorId = null)
        {
            List<Pedido> pedidos = pedidoServices.ObtenerListarPedidosPorFiltro(pedidoId, fechaCreacionPedido, pedidoEstado, pedidoProveedorId);

            if (pedidos == null || pedidos.Count == 0)
            {
                return Ok(new List<Pedido>()); // Retornar un array vacío si no hay productos
            }

            return Ok(pedidos);
        }

        [HttpPost]
        [Route("api/pedidos/crear")]
        public IHttpActionResult InsertarPedido(Pedido pedido)
        {
            try
            {
                if (pedido == null)
                {
                    return BadRequest("No se han recibido datos del pedido.");
                }

                // Variable para recibir el nuevo ID en caso de inserción
                string pedidoId = null;

                string resultado = pedidoServices.MantenimientoPedido(
                    ref pedidoId,
                    pedido.pedidoFechaCreacion,
                    pedido.pedidoEstado,
                    pedido.pedidoFechaEntregaEstimada,
                    pedido.pedidoObservacion,
                    pedido.pedidoProveedorId,
                    "1"
                );

                if (!string.IsNullOrEmpty(resultado))
                {
                    return Ok(new { success = true, message = resultado, pedidoId });
                }
                else
                {
                    return BadRequest("No se pudo agregar el pedido.");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(new Exception("Ocurrió un error al procesar la solicitud: " + ex.Message));
            }
        }

        [HttpPut]
        [Route("api/pedidos/modificar/{pedidoId}")]
        public async Task<IHttpActionResult> ModificarPedido(string pedidoId)
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                return BadRequest("Formato de solicitud no soportado.");
            }

            try
            {
                var provider = await Request.Content.ReadAsMultipartAsync();
                var jsonData = await provider.Contents[0].ReadAsStringAsync();
                Pedido pedido = JsonConvert.DeserializeObject<Pedido>(jsonData);

                if (string.IsNullOrEmpty(pedidoId) || pedido == null)
                {
                    return BadRequest("ID del detalle del pedido y datos válidos son requeridos.");
                }

                // Crear una variable local para almacenar pedidoId
                string localPedidoId = pedido.pedidoId;

                // Pasar la variable local como ref
                string resultado = pedidoServices.MantenimientoPedido(
                    ref localPedidoId, // Usar la variable local aquí
                    pedido.pedidoFechaCreacion,
                    pedido.pedidoEstado,
                    pedido.pedidoFechaEntregaEstimada,
                    pedido.pedidoObservacion,
                    pedido.pedidoProveedorId,
                    "2" // Código de acción para modificar
                );

                // Actualizar el valor de pedido.pedidoId con la variable local modificada
                pedido.pedidoId = localPedidoId;

                if (!string.IsNullOrEmpty(resultado))
                {
                    return Ok(new { mensaje = "Proveedor del pedido modificado exitosamente." });
                }
                else
                {
                    return BadRequest("No se pudo modificar al proveedor del pedido.");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(new Exception("Ocurrió un error al modificar al proveedor del pedido: " + ex.Message));
            }
        }

        [HttpDelete]
        [Route("api/pedidos/eliminar")]
        public IHttpActionResult EliminarPedido(string pedidoId)
        {
            try
            {
                if (string.IsNullOrEmpty(pedidoId))
                {
                    return BadRequest("El ID del detalle de pedido es requerido para eliminar.");
                }

                // Llamada sincrónica a MantenimientoDetallePedido
                string resultado = pedidoServices.MantenimientoPedido(
                    ref pedidoId,
                    null,
                    null,
                    null, 
                    null,
                    null,
                    "3"
                );

                if (!string.IsNullOrEmpty(resultado))
                {
                    return Ok(new { success = true, message = "Pedido eliminado exitosamente." });
                }
                else
                {
                    return BadRequest("No se pudo eliminar el pedido.");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(new Exception("Ocurrió un error al procesar la solicitud: " + ex.Message));
            }
        }

    }
}