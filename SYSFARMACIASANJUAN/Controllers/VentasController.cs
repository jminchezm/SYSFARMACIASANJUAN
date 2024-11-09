using SYSFARMACIASANJUAN.Bussines;
using SYSFARMACIASANJUAN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace SYSFARMACIASANJUAN.Controllers
{
    public class VentasController : ApiController
    {

        VentaServices ventaServices = new VentaServices();

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
                    venta.ventaEstado,
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

    }
}