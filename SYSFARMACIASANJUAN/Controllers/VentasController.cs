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
    public class VentasController : ApiController
    {

        VentaServices ventaServices = new VentaServices();

        [HttpGet]
        [Route("api/ventas")]
        public IHttpActionResult GetVentaFiltro(string ventaId = null, DateTime? fechaInicio = null, DateTime? fechaFin = null, string clienteId = null)
        {
            List<Venta> ventas = ventaServices.ObtenerListarVentaPorFiltro(ventaId, fechaInicio, fechaFin, clienteId);

            if (ventas == null || ventas.Count == 0)
            {
                return Ok(new List<Venta>()); // Retornar un array vacío si no hay productos
            }

            return Ok(ventas);
        }

        [HttpPost]
        [Route("api/ventas/crear")]
        public IHttpActionResult InsertarVenta(Venta venta)
        {
            try
            {
                if (venta == null)
                {
                    return BadRequest("No se han recibido datos de la venta.");
                }

                // Variable para recibir el nuevo ID en caso de inserción
                string ventaId = null;

                string resultado = ventaServices.MantenimientoVenta(
                    ref ventaId,
                    venta.ventaFecha,
                    venta.ventaTotal,
                    venta.venta_clienteId,
                    venta.venta_usuarioId,
                    "1"
                );

                if (!string.IsNullOrEmpty(resultado))
                {
                    return Ok(new { success = true, message = resultado, ventaId });
                }
                else
                {
                    return BadRequest("No se pudo agregar la venta.");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(new Exception("Ocurrió un error al procesar la solicitud: " + ex.Message));
            }
        }


        [HttpPut]
        [Route("api/ventas/modificarTotalVenta")]
        public IHttpActionResult ModificarTotalVenta([FromBody] Venta venta)
        {
            try
            {
                if (venta == null)
                {
                    return BadRequest("No se han recibido datos de la venta.");
                }

                if (string.IsNullOrEmpty(venta.ventaId) || venta.ventaTotal <= 0)
                {
                    return BadRequest("Debe proporcionar un ID de venta válido y un total mayor a cero.");
                }

                // Llamamos al servicio para modificar el total de la venta
                string resultado = ventaServices.ModificarTotalVenta(venta);

                if (!string.IsNullOrEmpty(resultado))
                {
                    return Ok(new { success = true, message = resultado });
                }
                else
                {
                    return BadRequest("No se pudo modificar el total de la venta.");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(new Exception("Ocurrió un error al modificar el total de la venta: " + ex.Message));
            }
        }

    }
}