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
    public class InventarioProductosController : ApiController
    {
        InventarioProductoServices inventarioProductoServices = new InventarioProductoServices();

        //Retorna una lista de productos
        [HttpGet]
        [Route("api/inventarioProductos")]
        public IHttpActionResult GetInventarioProductosFiltro(string inventarioId = null, string inventarioProductoId = null, string inventarioProductoNombre = null, int inventarioStock = 0, decimal inventarioPrecioUnitario = 0)
        {
            List<InventarioProducto> inventarioProductos = inventarioProductoServices.ObtenerListarInventarioProductosPorFiltro(inventarioId, inventarioProductoId, inventarioProductoNombre, inventarioStock, inventarioPrecioUnitario);

            if (inventarioProductos == null || inventarioProductos.Count == 0)
            {
                return Ok(new List<InventarioProducto>()); // Retornar un array vacío si no hay productos
            }

            return Ok(inventarioProductos);
        }

        [HttpPost]
        [Route("api/inventarioProductos/crear")]
        public IHttpActionResult InsertarInventarioProductos(InventarioProducto inventarioProducto)
        {
            try
            {
                if (inventarioProducto == null)
                {
                    return BadRequest("No se han recibido datos del pedido.");
                }

                // Llamada sincrónica a MantenimientoPedido
                string resultado = inventarioProductoServices.MantenimientoInventarioProducto(
                    null, // Deja en null si es un nuevo pedido
                    inventarioProducto.inventarioProductoProductoId,
                    inventarioProducto.inventarioProductoStock,
                    inventarioProducto.inventarioProductoPrecioUnitario,
                    "1"
                );

                if (!string.IsNullOrEmpty(resultado))
                {
                    return Ok(new { success = true, message = "Producto agregado al inventario exitosamente." });
                }
                else
                {
                    return BadRequest("No se pudo agregar el producto al inventario.");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(new Exception("Ocurrió un error al procesar la solicitud: " + ex.Message));
            }
        }

        [HttpPut]
        [Route("api/inventarioProductos/modificar/{productoId}")]
        public async Task<IHttpActionResult> ModificarInventarioProducto(string productoId)
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                return BadRequest("Formato de solicitud no soportado.");
            }

            try
            {
                var provider = await Request.Content.ReadAsMultipartAsync();
                var jsonData = await provider.Contents[0].ReadAsStringAsync();
                InventarioProducto inventarioProducto = JsonConvert.DeserializeObject<InventarioProducto>(jsonData);

                if (string.IsNullOrEmpty(productoId) || inventarioProducto == null)
                {
                    return BadRequest("ID del detalle del pedido y datos válidos son requeridos.");
                }

                string resultado = inventarioProductoServices.MantenimientoInventarioProducto(
                    inventarioProducto.inventarioProductoId,
                    inventarioProducto.inventarioProductoProductoId,
                    inventarioProducto.inventarioProductoStock,
                    inventarioProducto.inventarioProductoPrecioUnitario,
                    "2" // Código de acción para modificar
                );

                if (!string.IsNullOrEmpty(resultado))
                {
                    return Ok(new { mensaje = "Producto del Inventario modificado exitosamente." });
                }
                else
                {
                    return BadRequest("No se pudo modificar el producto en el inventario.");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(new Exception("Ocurrió un error al modificar el detalle del producto: " + ex.Message));
            }
        }
    }
}