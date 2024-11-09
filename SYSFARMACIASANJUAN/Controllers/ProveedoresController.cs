using SYSFARMACIASANJUAN.Bussines;
using SYSFARMACIASANJUAN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net;
using System.Web;
using System.Web.Http;
using System.Web.UI.Adapters;

namespace SYSFARMACIASANJUAN.Controllers
{
    public class ProveedoresController : ApiController
    {

        private ProveedorServices proveedorServices = new ProveedorServices();
        [HttpPost]
        [Route("api/proveedores")]
        public IHttpActionResult CrearUsuario([FromBody] Proveedor proveedor)
        {
            if (proveedor == null)
            {
                return BadRequest("Proveedor no puede ser nulo");
            }

            try
            {
               proveedorServices.MantenimientoCrearProveedor(proveedor);
                return Ok("Proveedor creado exitosamente");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        //Muestra el listado completo de usuarios
        [HttpGet]
        [Route("api/proveedores")]
        public IHttpActionResult GetUsuarios()
        {
            List<Proveedor> proveedores = proveedorServices.ListarProveedor();

            if (proveedores == null || proveedores.Count == 0)
            {
                return NotFound();
            }

            return Ok(proveedores);
        }


        [HttpGet]
        [Route("api/proveedores/{id}")]
        public IHttpActionResult GetUsuarioID(string id)
        {
            List<Proveedor> proveedores = proveedorServices.ObtenerProveedorPorId(id);

            if (proveedores == null || proveedores.Count == 0)
            {
                return Ok(new List<Usuario>()); // Retornar un array vacío si no hay empleados
            }

            return Ok(proveedores);
        }

        [HttpGet]
        [Route("api/proveedores/un-proveedor/{id}")]
        public IHttpActionResult GetUnUsuarioID(string id)
        {
            Proveedor proveedores = proveedorServices.ObtenerUnProveedorPorId(id);

            if (proveedores == null)
            {
                return Ok(proveedores); // Retornar un array vacío si no hay empleados
            }

            return Ok(proveedores);
        }

        // modificar proveedor
        [HttpPut]
        [Route("api/proveedores/{id}")]
        public IHttpActionResult ModificarProveedor(string id, [FromBody] Proveedor proveedor)
        {
            if (proveedor == null || proveedor.idProveedor != id)
            {
                return BadRequest("Los datos del proveedor no son válidos.");
            }

            try
            {
                // Llamar al servicio para modificar el usuario
                proveedorServices.ModificarProveedor(proveedor);

                return Ok("Proveedor modificado exitosamente.");
            }
            catch (Exception ex)
            {
                // Retornar error en caso de excepción
                return InternalServerError(new Exception("Error al modificar el Proveedor: " + ex.Message));
            }
        }
    }
}