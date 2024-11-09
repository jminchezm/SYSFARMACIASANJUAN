using SYSFARMACIASANJUAN.Bussines;
using SYSFARMACIASANJUAN.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net;
using System.Web.Http;

namespace SYSFARMACIASANJUAN.Controllers
{
    public class ClientesController : ApiController
    {
        private ClienteServices clienteServices = new ClienteServices();

        [HttpGet]
        [Route("api/clientesFiltro")]
        public IHttpActionResult GetClientesFiltro(string clienteId = null, string nombreCliente = null, string clienteNit = null, string clienteCui = null)
        {
            // Llamar al servicio para obtener los clientes filtrados según los parámetros proporcionados
            var clientes = clienteServices.ObtenerListarClientesPorFiltro(clienteId, nombreCliente, clienteNit, clienteCui);

            if (clientes == null || clientes.Count == 0)
            {
                return Ok(new List<Cliente>()); // Retornar un array vacío si no hay clientes
            }

            return Ok(clientes);
        }

        //Muestra el listado completo de clientes
        [HttpGet]
        [Route("api/clientes")]
        public IHttpActionResult GetListaClientes()
        {
            // Llama al servicio con el parámetro de estado
            List<Cliente> clientes = clienteServices.ListarClientes();

            if (clientes == null || clientes.Count == 0)
            {
                return NotFound();
            }

            return Ok(clientes);
        }



        //Controla el poder agregar empleados
        [HttpPost]
        [Route("api/clientes")]
        public IHttpActionResult CrearClientes([FromBody] Cliente cliente)
        {
            if (cliente == null)
            {
                return BadRequest("Cliente no puede ser nulo");
            }

            try
            {
                clienteServices.MantenimientoCrearCliente(cliente);
                return Ok("Cliente agregado exitosamente");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
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
        [Route("api/clientes/{id}")]
        public IHttpActionResult GetClienteID(string id)
        {
            List<Cliente> clientes = clienteServices.ObtenerClientesPorId(id);

            if (clientes == null || clientes.Count == 0)
            {
                return Ok(new List<Cliente>()); // Retornar un array vacío si no hay empleados
            }

            return Ok(clientes);
        }

        //  Controla el poder obtener un único empleado por id
        [HttpGet]
       [Route("api/clientes/un-cliente/{id}")]
        public IHttpActionResult GetUnClienteID(string id)
        {
            Cliente clientes = clienteServices.ObtenerUnClientePorId(id);

            if (clientes == null)
            {
                return Ok(clientes); // Retornar un array vacío si no hay empleados
            }

            return Ok(clientes);
        }



        [HttpPut]
        [Route("api/clientes/{id}")]
        public HttpResponseMessage ModificarCliente(string id, [FromBody] Cliente cliente)
        {
            if (cliente == null || cliente.idCliente != id)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Datos inválidos.");
            }

            try
            {
                clienteServices.ModificarCliente(cliente);
                return Request.CreateResponse(HttpStatusCode.OK, "Cliente modificado exitosamente.");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Error al modificar el cliente: " + ex.Message);
            }
        }
    }
}