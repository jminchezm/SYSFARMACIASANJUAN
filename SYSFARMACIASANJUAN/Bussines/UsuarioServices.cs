using SYSFARMACIASANJUAN.DataAccess;
using SYSFARMACIASANJUAN.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace SYSFARMACIASANJUAN.Bussines
{
    public class UsuarioServices
    {
        private UsuarioDataAccess usuarioDataAccess = new UsuarioDataAccess();

        public void MantenimientoCrearUsuario(Usuario usuario)
        {
            // Aquí puedes agregar validaciones y lógica adicional si es necesario
            usuarioDataAccess.MantenimientoCrearUsuario(usuario);
        }

        public List<Usuario> ListarUsuarios()
        {
            List<Usuario> usuarios = usuarioDataAccess.ListarUsuarios();

            foreach (var usu in usuarios)
            {
                Debug.WriteLine($"Usuario: {usu.nombreUsuario} - Correo: {usu.correoUsuario}");
            }

            return usuarios;
        }

        public List<Usuario> ObtenerUsuariosPorId(string id)
        {
            // Obtén la lista completa de empleados que coinciden con el ID
            var usuarios = usuarioDataAccess.ListarUsuarioPorId(id);

            // Devuelve la lista de empleados (puede estar vacía si no se encontraron coincidencias)
            return usuarios;
        }

        public Usuario ObtenerUnUsuarioPorId(string id)
        {
            var usuarios = usuarioDataAccess.ListarUsuarioPorId(id);
            return usuarios.FirstOrDefault(); // Devuelve el primer empleado o null si no hay resultados
        }

        public void ModificarUsuario(Usuario usuario)
        {
            usuarioDataAccess.ModificarUsuario(usuario); // Implementa este método en EmpleadoDataAccess
        }

        public bool CambiarContraseña(string usuarioId, string contraseñaAnterior, string nuevaContraseña)
        {
            return usuarioDataAccess.CambiarContraseña(usuarioId, contraseñaAnterior, nuevaContraseña);
        }

        ////Valida el ingreso del usuario al sistema.
        //public bool ValidarUsuario(string usuarioNombre, string usuarioContraseña)
        //{
        //    // Lógica adicional si fuera necesario (encriptar contraseña, etc.)
        //    return usuarioDataAccess.ValidarUsuario(usuarioNombre, usuarioContraseña);
        //}
    }
}