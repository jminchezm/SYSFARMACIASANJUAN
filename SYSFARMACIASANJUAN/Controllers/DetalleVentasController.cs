using Newtonsoft.Json;
using SYSFARMACIASANJUAN.Bussines;
using SYSFARMACIASANJUAN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SYSFARMACIASANJUAN.Controllers
{
    public class DetalleVentasController : ApiController
    {
        DetalleVentaServices detalleVentaServices = new DetalleVentaServices();

        [HttpGet]
        [Route("api/detalleVentas")]
        public IHttpActionResult GetDetalleVentaFiltro(string detalleVentaId = null, string ventaId = null, string productoId = null)
        {
            List<DetalleVenta> detalleVentas = detalleVentaServices.ObtenerListarDetalleVentaPorFiltro(detalleVentaId, ventaId, productoId);

            if (detalleVentas == null || detalleVentas.Count == 0)
            {
                return Ok(new List<DetallePedido>()); // Retornar un array vacío si no hay productos
            }

            return Ok(detalleVentas);
        }

        [HttpPost]
        [Route("api/detalleVentas/crear")]
        public IHttpActionResult InsertarDetalleVenta(DetalleVenta detalleVenta)
        {
            try
            {
                if (detalleVenta == null)
                {
                    return BadRequest("No se han recibido datos del pedido.");
                }

                // Llamada sincrónica a MantenimientoPedido
                string resultado = detalleVentaServices.MantenimientoDetalleVenta(
                    null, // Deja en null si es un nuevo pedido
                    detalleVenta.ventaId,
                    detalleVenta.productoId,
                    detalleVenta.detalleVentaCantidad,
                    detalleVenta.detalleVentaPrecioUnitario,
                    "1"
                );

                if (!string.IsNullOrEmpty(resultado))
                {
                    return Ok(new { success = true, message = "Producto agregado a la venta exitosamente." });
                }
                else
                {
                    return BadRequest("No se pudo agregar el producto a la venta.");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(new Exception("Ocurrió un error al procesar la solicitud: " + ex.Message));
            }
        }

        [HttpPut]
        [Route("api/detalleVentas/modificar/{detalleVentaId}")]
        public async Task<IHttpActionResult> ModificarDetalleVenta(string detalleVentaId)
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                return BadRequest("Formato de solicitud no soportado.");
            }

            try
            {
                var provider = await Request.Content.ReadAsMultipartAsync();
                var jsonData = await provider.Contents[0].ReadAsStringAsync();
                DetalleVenta detalleVenta = JsonConvert.DeserializeObject<DetalleVenta>(jsonData);

                if (string.IsNullOrEmpty(detalleVentaId) || detalleVenta == null)
                {
                    return BadRequest("ID del detalle de venta y datos válidos son requeridos.");
                }

                string resultado = detalleVentaServices.MantenimientoDetalleVenta(
                    detalleVenta.detalleVentaId,
                    detalleVenta.ventaId,
                    detalleVenta.productoId,
                    detalleVenta.detalleVentaCantidad,
                    detalleVenta.detalleVentaPrecioUnitario,
                    "2" // Código de acción para modificar
                );

                if (!string.IsNullOrEmpty(resultado))
                {
                    return Ok(new { mensaje = "Detalle de venta modificado exitosamente." });
                }
                else
                {
                    return BadRequest("No se pudo modificar el detalle de venta.");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(new Exception("Ocurrió un error al modificar el detalle de venta: " + ex.Message));
            }
        }

        [HttpDelete]
        [Route("api/detalleVentas/eliminar")]
        public IHttpActionResult EliminarDetalleVenta(string detalleVentaId)
        {
            try
            {
                if (string.IsNullOrEmpty(detalleVentaId))
                {
                    return BadRequest("El ID del detalle de pedido es requerido para eliminar.");
                }

                // Llamada sincrónica a MantenimientoDetallePedido
                string resultado = detalleVentaServices.MantenimientoDetalleVenta(
                    detalleVentaId,
                    null, // No se necesita el PedidoID para eliminar
                    null, // No se necesita el ProductoID para eliminar
                    0, // No se necesita la cantidad para eliminar
                    0, // No se necesita el precio unitario para eliminar
                    "3" // Código de acción para eliminar
                );

                if (!string.IsNullOrEmpty(resultado))
                {
                    return Ok(new { success = true, message = "Detalle de venta eliminado exitosamente." });
                }
                else
                {
                    return BadRequest("No se pudo eliminar el detalle de venta.");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(new Exception("Ocurrió un error al procesar la solicitud: " + ex.Message));
            }
        }

        [HttpPost]
        [Route("api/detalleVentas/descontarInventario")]
        public IHttpActionResult DescontarStockInventarioPorVenta([FromBody] string ventaId)
        {
            if (string.IsNullOrWhiteSpace(ventaId))
            {
                return BadRequest("El ID de la venta es obligatorio.");
            }

            try
            {
                var detalleVentaServices = new DetalleVentaServices();
                bool resultado = detalleVentaServices.DescontarStockInventarioPorVenta(ventaId);

                if (resultado)
                {
                    return Ok(new { success = true, message = "Inventario descontado correctamente." });
                }
                else
                {
                    return InternalServerError(new Exception("Hubo un problema al descontar el inventario."));
                }
            }
            catch (Exception ex)
            {
                // Aquí se maneja cualquier error que ocurra en la operación
                return InternalServerError(ex);
            }
        }


        //[HttpPost]
        //[Route("api/detalleVentas/descontar-stock")]
        //public IHttpActionResult DescontarStockInventario([FromBody] dynamic data)
        //{
        //    var ventaId = data?.ventaId?.ToString(); // Extrae el 'ventaId' del objeto JSON

        //    if (string.IsNullOrEmpty(ventaId))
        //        return BadRequest("El ID de venta es requerido.");

        //    try
        //    {
        //        // Llamar al procedimiento almacenado para descontar el stock
        //        var resultado = detalleVentaServices.DescontarStockInventarioPorVenta(ventaId);

        //        // Si la transacción fue exitosa, el procedimiento retorna 1
        //        if (resultado == 1)
        //            return Ok(new { message = "Stock descontado correctamente." });
        //        else
        //            return InternalServerError(new Exception("No se pudo descontar el stock."));
        //    }
        //    catch (Exception ex)
        //    {
        //        // Captura cualquier excepción y retorna el error con un mensaje personalizado
        //        var customException = new Exception("Error al descontar el stock: " + ex.Message, ex);
        //        return InternalServerError(customException);  // Pasa una Exception
        //    }
        //}



        //[HttpPost]
        //[Route("api/detalleVentas/descontar-stock")]
        //public IHttpActionResult DescontarStockInventario([FromBody] dynamic data)
        //{
        //    var ventaId = data?.ventaId?.ToString(); // Extrae el 'ventaId' del objeto JSON

        //    if (string.IsNullOrEmpty(ventaId))
        //        return BadRequest("El ID de venta es requerido.");

        //    try
        //    {
        //        bool resultado = detalleVentaServices.DescontarStockInventarioPorVenta(ventaId);
        //        if (resultado)
        //            return Ok("Stock descontado correctamente.");  // Respuesta de éxito
        //        else
        //            return InternalServerError(new Exception("No se pudo descontar el stock."));  // Error si no se pudo descontar
        //    }
        //    catch (Exception ex)
        //    {
        //        // Podrías registrar el error aquí
        //        return InternalServerError(ex);  // Captura y retorna el error
        //    }
        //}


        //[HttpPost]
        //[Route("api/detalleVentas/descontar-stock")]
        //public IHttpActionResult DescontarStockInventario([FromBody] dynamic data)
        //{
        //    var ventaId = data?.ventaId?.ToString(); // Extrae el 'ventaId' del objeto JSON

        //    if (string.IsNullOrEmpty(ventaId))
        //        return BadRequest("El ID de venta es requerido.");

        //    try
        //    {
        //        bool resultado = detalleVentaServices.DescontarStockInventarioPorVenta(ventaId);
        //        if (resultado)
        //            return Ok("Stock descontado correctamente.");
        //        else
        //            return InternalServerError(new Exception("No se pudo descontar el stock."));
        //    }
        //    catch (Exception ex)
        //    {
        //        // Podrías registrar el error aquí
        //        return InternalServerError(ex);
        //    }
        //}


        //[HttpPost]
        //[Route("api/detalleVentas/descontar-stock")]
        //public IHttpActionResult DescontarStockInventario([FromBody] string ventaId)
        //{
        //    if (string.IsNullOrEmpty(ventaId))
        //        return BadRequest("El ID de venta es requerido.");

        //    try
        //    {
        //        bool resultado = detalleVentaServices.DescontarStockInventarioPorVenta(ventaId);
        //        if (resultado)
        //        {
        //            Console.WriteLine("Stock descontado correctamente."); // Agrega un log para verificar
        //            return Ok("Stock descontado correctamente.");
        //        }
        //        else
        //        {
        //            Console.WriteLine("No se pudo descontar el stock."); // Agrega un log para verificar
        //            return InternalServerError(new Exception("No se pudo descontar el stock."));
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine($"Error en el controlador: {ex.Message}"); // Agrega un log para errores
        //        return InternalServerError(ex);
        //    }
        //}


        //[HttpPost]
        //[Route("api/detalleVentas/descontar-stock")]
        //public IHttpActionResult DescontarStockInventario([FromBody] string ventaId)
        //{
        //    if (string.IsNullOrEmpty(ventaId))
        //        return BadRequest("El ID de venta es requerido.");

        //    try
        //    {
        //        bool resultado = detalleVentaServices.DescontarStockInventarioPorVenta(ventaId);
        //        if (resultado)
        //            return Ok("Stock descontado correctamente.");
        //        else
        //            return InternalServerError(new Exception("No se pudo descontar el stock."));
        //    }
        //    catch (Exception ex)
        //    {
        //        // Podrías registrar el error aquí
        //        return InternalServerError(ex);
        //    }
        //}
    }
}