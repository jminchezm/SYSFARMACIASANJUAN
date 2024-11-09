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
    public class DetalleProductosController : ApiController
    {
        DetallePedidoServices detallePedidoServices = new DetallePedidoServices();

        [HttpGet]
        [Route("api/detallePedidos")]
        public IHttpActionResult GetDetallePedidoFiltro(string detallePedidoId = null, string pedidoId = null, string productoId = null)
        {
            List<DetallePedido> detallePedidos = detallePedidoServices.ObtenerListarDetallePedidoPorFiltro(detallePedidoId, pedidoId, productoId);

            if (detallePedidos == null || detallePedidos.Count == 0)
            {
                return Ok(new List<DetallePedido>()); // Retornar un array vacío si no hay productos
            }

            return Ok(detallePedidos);
        }

        [HttpPost]
        [Route("api/detallePedidos/crear")]
        public IHttpActionResult InsertarDetallePedido(DetallePedido detallePedido)
        {
            try
            {
                if (detallePedido == null)
                {
                    return BadRequest("No se han recibido datos del pedido.");
                }

                // Llamada sincrónica a MantenimientoPedido
                string resultado = detallePedidoServices.MantenimientoDetallePedido(
                    null, // Deja en null si es un nuevo pedido
                    detallePedido.detallePedido_PedidoId,
                    detallePedido.detallePedido_ProductoId,
                    detallePedido.detallePedidoCantidad,
                    detallePedido.detallePedidoPrecioUnitario,
                    detallePedido.detallePedidoSubTotal,
                    "1"
                );

                if (!string.IsNullOrEmpty(resultado))
                {
                    return Ok(new { success = true, message = "Producto agregado al pedido exitosamente." });
                }
                else
                {
                    return BadRequest("No se pudo agregar el producto al pedido.");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(new Exception("Ocurrió un error al procesar la solicitud: " + ex.Message));
            }
        }

        [HttpPut]
        [Route("api/detallePedidos/modificar/{detallePedidoId}")]
        public async Task<IHttpActionResult> ModificarDetallePedido(string detallePedidoId)
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                return BadRequest("Formato de solicitud no soportado.");
            }

            try
            {
                var provider = await Request.Content.ReadAsMultipartAsync();
                var jsonData = await provider.Contents[0].ReadAsStringAsync();
                DetallePedido detallePedido = JsonConvert.DeserializeObject<DetallePedido>(jsonData);

                if (string.IsNullOrEmpty(detallePedidoId) || detallePedido == null)
                {
                    return BadRequest("ID del detalle del pedido y datos válidos son requeridos.");
                }

                string resultado = detallePedidoServices.MantenimientoDetallePedido(
                    detallePedido.detallePedidoId,
                    detallePedido.detallePedido_PedidoId,
                    detallePedido.detallePedido_ProductoId,
                    detallePedido.detallePedidoCantidad,
                    detallePedido.detallePedidoPrecioUnitario,
                    detallePedido.detallePedidoSubTotal,
                    "2" // Código de acción para modificar
                );

                if (!string.IsNullOrEmpty(resultado))
                {
                    return Ok(new { mensaje = "Detalle de producto modificado exitosamente." });
                }
                else
                {
                    return BadRequest("No se pudo modificar el detalle del producto.");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(new Exception("Ocurrió un error al modificar el detalle del producto: " + ex.Message));
            }
        }

        [HttpDelete]
        [Route("api/detallePedidos/eliminar")]
        public IHttpActionResult EliminarDetallePedido(string detallePedidoId)
        {
            try
            {
                if (string.IsNullOrEmpty(detallePedidoId))
                {
                    return BadRequest("El ID del detalle de pedido es requerido para eliminar.");
                }

                // Llamada sincrónica a MantenimientoDetallePedido
                string resultado = detallePedidoServices.MantenimientoDetallePedido(
                    detallePedidoId,
                    null, // No se necesita el PedidoID para eliminar
                    null, // No se necesita el ProductoID para eliminar
                    0, // No se necesita la cantidad para eliminar
                    0, // No se necesita el precio unitario para eliminar
                    0, // No se necesita el subtotal para eliminar
                    "3" // Código de acción para eliminar
                );

                if (!string.IsNullOrEmpty(resultado))
                {
                    return Ok(new { success = true, message = "Detalle de pedido eliminado exitosamente." });
                }
                else
                {
                    return BadRequest("No se pudo eliminar el detalle de pedido.");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(new Exception("Ocurrió un error al procesar la solicitud: " + ex.Message));
            }
        }

        [HttpDelete]
        [Route("api/detallePedidos/eliminar2")]
        public IHttpActionResult EliminarDetallePedido2(string pedidoId)
        {
            try
            {
                if (string.IsNullOrEmpty(pedidoId))
                {
                    return BadRequest("El ID del detalle de pedido es requerido para eliminar.");
                }

                // Llamada sincrónica a MantenimientoDetallePedido
                string resultado = detallePedidoServices.MantenimientoDetallePedido(
                    null,
                    pedidoId, // No se necesita el PedidoID para eliminar
                    null, // No se necesita el ProductoID para eliminar
                    0, // No se necesita la cantidad para eliminar
                    0, // No se necesita el precio unitario para eliminar
                    0, // No se necesita el subtotal para eliminar
                    "4" // Código de acción para eliminar
                );

                if (!string.IsNullOrEmpty(resultado))
                {
                    return Ok(new { success = true, message = "Detalle de pedido eliminado exitosamente." });
                }
                else
                {
                    return BadRequest("No se pudo eliminar el detalle de pedido.");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(new Exception("Ocurrió un error al procesar la solicitud: " + ex.Message));
            }
        }
    }
}