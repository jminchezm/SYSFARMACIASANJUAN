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
    public class EmpleadosController : ApiController
    {
        private EmpleadoServices empleadoServices = new EmpleadoServices();


        [HttpGet]
        [Route("api/empleados")]
        public IHttpActionResult GetListaEmpleados(string estado = null)
        {
            // Llama al servicio con el parámetro de estado
            List<Empleado> empleados = empleadoServices.ListarEmpleados(estado);

            if (empleados == null || empleados.Count == 0)
            {
                return NotFound();
            }

            return Ok(empleados);
        }

        //[HttpGet]
        //[Route("api/empleados")]
        //public IHttpActionResult GetListaEmpleados()
        //{
        //    List<Empleado> empleados = empleadoServices.ListarEmpleados();

        //    if (empleados == null || empleados.Count == 0)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(empleados);
        //}

        //Controla el poder listarEmpleados por el id
        [HttpGet]
        [Route("api/empleados/{id}")]
        public IHttpActionResult GetEmpleadoID(string id, string estado=null)
        {
            List<Empleado> empleados = empleadoServices.ObtenerEmpleadosPorId(id, estado);

            if (empleados == null || empleados.Count == 0)
            {
                return Ok(new List<Empleado>()); // Retornar un array vacío si no hay empleados
            }

            return Ok(empleados);
        }

        // Controla el poder obtener un único empleado por id
        [HttpGet]
        [Route("api/empleados/un-empleado/{id}")]
        public IHttpActionResult GetUnEmpleadoID(string id)
        {
            Empleado empleados = empleadoServices.ObtenerUnEmpleadoPorId(id);

            if (empleados == null)
            {
                return Ok(empleados); // Retornar un array vacío si no hay empleados
            }

            return Ok(empleados);
        }

        //Controla el poder agregar empleados
        [HttpPost]
        [Route("api/empleados")]
        public IHttpActionResult AgregarEmpleado([FromBody] Empleado empleado)
        {
            if (empleado == null)
            {
                return BadRequest("Empleado no puede ser nulo");
            }

            try
            {
                empleadoServices.MantenimientoAgregarEmpleado(empleado);
                return Ok("Empleado agregado exitosamente");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Route("api/empleados/{id}")]
        public HttpResponseMessage ModificarEmpleado(string id, [FromBody] Empleado empleado)
        {
            if (empleado == null || empleado.idEmpleado != id)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Datos inválidos.");
            }

            try
            {
                empleadoServices.ModificarEmpleado(empleado);
                return Request.CreateResponse(HttpStatusCode.OK, "Empleado modificado exitosamente.");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Error al modificar el empleado: " + ex.Message);
            }
        }
    }
}