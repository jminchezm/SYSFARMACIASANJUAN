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
    public class CategoriasController : ApiController
    {

        private CategoriaServices categoriaServices = new CategoriaServices();
        [HttpPost]
        [Route("api/categorias")]
        public IHttpActionResult CrearCategoria([FromBody] Categoria categoria)
        {
            if (categoria == null)
            {
                return BadRequest("Categora no puede ser nulo");
            }

            try
            {
                categoriaServices.MantenimientoAgregarCategoria(categoria);
                return Ok("Categoria creado exitosamente");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/categorias")]
        public IHttpActionResult GetUsuarios()
        {
            List<Categoria> categorias = categoriaServices.LiscarCategoria();

            if (categorias == null || categorias.Count == 0)
            {
                return NotFound();
            }

            return Ok(categorias);
        }


        [HttpGet]
        [Route("api/categorias/{id}")]
        public IHttpActionResult GetUsuarioID(string id)
        {
            List<Categoria> categorias = categoriaServices.ObtenerCategoriaPorId(id);

            if (categorias == null || categorias.Count == 0)
            {
                return Ok(new List<Usuario>()); // Retornar un array vacío si no hay empleados
            }

            return Ok(categorias);
        }

        [HttpGet]
        [Route("api/categorias/un-categoria/{id}")]
        public IHttpActionResult GetUnUsuarioID(string id)
        {
            Categoria categorias = categoriaServices.ObtenerUnCategoriaPorId(id);

            if (categorias == null)
            {
                return Ok(categorias); // Retornar un array vacío si no hay empleados
            }

            return Ok(categorias);
        }


        // modificar Categoria
        [HttpPut]
        [Route("api/categorias/{id}")]
        public IHttpActionResult ModificarCategoria(string id, [FromBody] Categoria categoria)
        {
            if (categoria == null || categoria.idsubCategoria != id)
            {
                return BadRequest("Los datos del Categoria no son válidos.");
            }

            try
            {
                // Llamar al servicio para modificar el usuario
                categoriaServices.ModificarCategoria(categoria);

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