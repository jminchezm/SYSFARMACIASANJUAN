using SYSFARMACIASANJUAN.Bussines;
using SYSFARMACIASANJUAN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net;
using System.Web;
using System.Web.Http;

namespace SYSFARMACIASANJUAN.Controllers
{
    public class UsuariosController : ApiController
    {
        private UsuarioServices usuarioServices = new UsuarioServices();

        //Muestra el listado completo de usuarios
        [HttpGet]
        [Route("api/usuarios")]
        public IHttpActionResult GetUsuarios()
        {
            List<Usuario> usuarios = usuarioServices.ListarUsuarios();

            if (usuarios == null || usuarios.Count == 0)
            {
                return NotFound();
            }

            return Ok(usuarios);
        }

        //Controla el poder listarEmpleados por el id
        [HttpGet]
        [Route("api/usuarios/{id}")]
        public IHttpActionResult GetUsuarioID(string id)
        {
            List<Usuario> usuarios = usuarioServices.ObtenerUsuariosPorId(id);

            if (usuarios == null || usuarios.Count == 0)
            {
                return Ok(new List<Usuario>()); // Retornar un array vacío si no hay empleados
            }

            return Ok(usuarios);
        }

        //Controla el poder listarEmpleados un unico empleado por el id
        [HttpGet]
        [Route("api/usuarios/un-usuario/{id}")]
        public IHttpActionResult GetUnUsuarioID(string id)
        {
            Usuario usuarios = usuarioServices.ObtenerUnUsuarioPorId(id);

            if (usuarios == null)
            {
                return Ok(usuarios); // Retornar un array vacío si no hay empleados
            }

            return Ok(usuarios);
        }

        //Controla el poder agregar empleados
        [HttpPost]
        [Route("api/usuarios")]
        public IHttpActionResult CrearUsuario([FromBody] Usuario usuario)
        {
            if (usuario == null)
            {
                return BadRequest("Usuario no puede ser nulo");
            }

            try
            {
                usuarioServices.MantenimientoCrearUsuario(usuario);
                return Ok("Usuario creado exitosamente");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Route("api/usuarios/{id}")]
        public IHttpActionResult ModificarUsuario(string id, [FromBody] Usuario usuario)
        {
            if (usuario == null || usuario.idUsuario != id)
            {
                return BadRequest("Los datos del usuario no son válidos.");
            }

            try
            {
                // Llamar al servicio para modificar el usuario
                usuarioServices.ModificarUsuario(usuario);

                return Ok("Usuario modificado exitosamente.");
            }
            catch (Exception ex)
            {
                // Retornar error en caso de excepción
                return InternalServerError(new Exception("Error al modificar el usuario: " + ex.Message));
            }
        }

        //[HttpPut]
        //[Route("api/usuarios/{id}")]
        //public IHttpActionResult ModificarUsuario(int id, [FromBody] Usuario usuario)
        //{
        //    if (usuario == null || usuario.idUsuario != id)
        //    {
        //        return BadRequest("Los datos del usuario no son válidos.");
        //    }

        //    try
        //    {
        //        // Llama al servicio para actualizar el usuario en la base de datos
        //        bool resultado = usuarioServices.ModificarUsuario(usuario);

        //        if (!resultado)
        //        {
        //            return InternalServerError(new Exception("No se pudo modificar el usuario."));
        //        }

        //        return Ok("Usuario modificado exitosamente.");
        //    }
        //    catch (Exception ex)
        //    {
        //        // Retorna una respuesta de error en caso de alguna excepción
        //        return InternalServerError(ex);
        //    }
        //}

        //[HttpPost]
        //[Route("api/usuarios/login")]
        //public IHttpActionResult Login([FromBody] Dictionary<string, string> credentials)
        //{
        //    if (!credentials.ContainsKey("UsuarioNombre") || !credentials.ContainsKey("UsuarioContraseña"))
        //    {
        //        return BadRequest("Faltan las credenciales.");
        //    }

        //    string usuarioNombre = credentials["UsuarioNombre"];
        //    string usuarioContraseña = credentials["UsuarioContraseña"];

        //    bool loginExitoso = usuarioServices.ValidarUsuario(usuarioNombre, usuarioContraseña);

        //    if (loginExitoso)
        //    {
        //        return Ok(new { success = true, message = "Login exitoso" });
        //    }
        //    else
        //    {
        //        return Ok(new { success = false, message = "Credenciales incorrectas" });
        //    }
        //}
    }
}