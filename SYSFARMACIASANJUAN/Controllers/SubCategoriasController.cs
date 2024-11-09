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
    public class SubCategoriasController : ApiController
    {

        private SubCategoriaServices subCategoriaServices = new SubCategoriaServices();
        [HttpPost]
        [Route("api/subcategorias")]
        public IHttpActionResult CrearSubCategoria([FromBody] SubCategoria subcategoria)
        {
            if (subcategoria == null)
            {
                return BadRequest("SubCategoria no puede ser nulo");
            }

            try
            {
                subCategoriaServices.MantenimientoAgregarSubCategoria(subcategoria);
                return Ok("Categoria creado exitosamente");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/subcategorias")]
        public IHttpActionResult GetUsuarios()
        {
            List<SubCategoria> subcategorias = subCategoriaServices.LiscarSubCategoria();

            if (subcategorias == null || subcategorias.Count == 0)
            {
                return NotFound();
            }

            return Ok(subcategorias);
        }


        [HttpGet]
        [Route("api/subcategorias/{id}")]
        public IHttpActionResult GetUsuarioID(string id)
        {
            List<SubCategoria> subcategorias = subCategoriaServices.ObtenersubCategoriaPorId(id);

            if (subcategorias == null || subcategorias.Count == 0)
            {
                return Ok(new List<Usuario>()); // Retornar un array vacío si no hay empleados
            }

            return Ok(subcategorias);
        }

        [HttpGet]
        [Route("api/subcategorias/un-subcategoria/{id}")]
        public IHttpActionResult GetUnUsuarioID(string id)
        {
            SubCategoria subcategorias = subCategoriaServices.ObtenerUnSubCategoriaPorId(id);

            if (subcategorias == null)
            {
                return Ok(subcategorias); // Retornar un array vacío si no hay empleados
            }

            return Ok(subcategorias);
        }


        //// modificar Categoria
        [HttpPut]
        [Route("api/subcategorias/{id}")]
        public IHttpActionResult ModificarSubCategoria(string id, [FromBody] SubCategoria subcategoria)
        {
            if (subcategoria == null || subcategoria.idCategoria != id)
            {
                return BadRequest("Los datos del Categoria no son válidos.");
            }

            try
            {
                // Llamar al servicio para modificar el usuario
                subCategoriaServices.ModificarSubCategoria(subcategoria);

                return Ok("Categoria modificado exitosamente.");
            }
            catch (Exception ex)
            {
                // Retornar error en caso de excepción
                return InternalServerError(new Exception("Error al modificar la Categoria: " + ex.Message));
            }
        }
    }
}