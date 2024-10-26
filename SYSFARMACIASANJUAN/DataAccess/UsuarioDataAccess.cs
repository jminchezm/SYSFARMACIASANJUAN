using SYSFARMACIASANJUAN.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;

namespace SYSFARMACIASANJUAN.DataAccess
{
    public class UsuarioDataAccess
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;

        public void MantenimientoCrearUsuario(Usuario usuario)
        {
            //int edad = edadEmpleado((DateTime)empleado.fechaNacimientoEmpleado);

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                //String accion = "";
                SqlCommand command = new SqlCommand("SP_MANTENIMIENTO_USUARIO", connection);
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@USUARIO_ID", 1);
                command.Parameters.AddWithValue("@USUARIO_NOMBRE", usuario.nombreUsuario);
                command.Parameters.AddWithValue("@USUARIO_CONTRASEÑA", usuario.passwordUsuario);
                command.Parameters.AddWithValue("@USUARIO_CORREO", usuario.correoUsuario);
                command.Parameters.AddWithValue("@ROL_ID", usuario.idRol);
                command.Parameters.AddWithValue("@EMPLEADO_ID", usuario.idEmpleado);
                //command.Parameters.AddWithValue("@EMPLEADO_FOTO", SqlDbType.VarBinary).Value = (object)empleado.foto ?? DBNull.Value;
                command.Parameters.AddWithValue("@ACCION", 1);

                try
                {
                    if (connection.State == ConnectionState.Open) connection.Close();
                    connection.Open();
                    command.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    // Manejar el error
                    throw new Exception("Error al agregar usuario: " + ex.Message);
                }
            }
        }

        public List<Usuario> ListarUsuarios()
        {
            List<Usuario> usuarios = new List<Usuario>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("SP_LISTARUSUARIOS", connection);
                command.CommandType = CommandType.StoredProcedure;

                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        Usuario usuario= new Usuario
                        {
                            idUsuario = reader["USUARIO_ID"].ToString(),
                            nombreUsuario = reader["USUARIO_NOMBRE"].ToString(),
                            correoUsuario = reader["USUARIO_CORREO"].ToString(),
                            nombreRol = reader["ROL_NOMBRE"].ToString(),
                            idEmpleado = reader["EMPLEADO_ID"].ToString(),
                            nombreCompletoEmpleado = reader["NOMBRE_COMPLETO"].ToString()
                        };

                        usuarios.Add(usuario);
                    }
                }
                catch (Exception ex)
                {
                    // Manejar el error
                    throw new Exception("Error al obtener usuarios: " + ex.Message);
                }
            }

            return usuarios;
        }

        public List<Usuario> ListarUsuarioPorId(string id)
        {
            List<Usuario> usuarios = new List<Usuario>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("SP_BUSCARUSUARIOPORID", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@USUARIO_ID", id); // Corregido: El parámetro debe agregarse antes de ejecutar el comando

                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        //byte[] fotoEmpleado = reader["EMPLEADO_FOTO"] != DBNull.Value ? (byte[])reader["EMPLEADO_FOTO"] : null;
                        Usuario usuario = new Usuario
                        {
                            idUsuario = reader["USUARIO_ID"] != DBNull.Value ? reader["USUARIO_ID"].ToString() : string.Empty,
                            nombreUsuario = reader["USUARIO_NOMBRE"] != DBNull.Value ? reader["USUARIO_NOMBRE"].ToString() : string.Empty,
                            correoUsuario = reader["USUARIO_CORREO"] != DBNull.Value ? reader["USUARIO_CORREO"].ToString() : string.Empty,
                            idRol = reader["ROL_ID"] != DBNull.Value ? reader["ROL_ID"].ToString() : string.Empty,
                            nombreRol = reader["ROL_NOMBRE"] != DBNull.Value ? reader["ROL_NOMBRE"].ToString() : string.Empty,
                            idEmpleado = reader["EMPLEADO_ID"] != DBNull.Value ? reader["EMPLEADO_ID"].ToString() : string.Empty,
                            nombreCompletoEmpleado = reader["NOMBRE_COMPLETO"] != DBNull.Value ? reader["NOMBRE_COMPLETO"].ToString() : string.Empty
                            //foto = (byte[])reader["EMPLEADO_FOTO"]
                            //foto = reader["EMPLEADO_FOTO"] != DBNull.Value ? (byte[])reader["EMPLEADO_FOTO"] : null // Conversión explícita
                            //FotoBase64 = reader["EMPLEADO_FOTO"] != DBNull.Value ? Convert.ToBase64String((byte[])reader["EMPLEADO_FOTO"]) : null

                        };
                        usuarios.Add(usuario);
                    }
                }
                catch (Exception ex)
                {
                    // Manejar el error
                    throw new Exception("Error al obtener usuarios: " + ex.Message);
                }
            }

            return usuarios;
        }

        // Método para modificar un usuario existente
        public void ModificarUsuario(Usuario usuario)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                // Crear el comando para el procedimiento almacenado
                SqlCommand command = new SqlCommand("SP_MODIFICARDATOSUSUARIO", connection);
                command.CommandType = CommandType.StoredProcedure;

                // Agregar los parámetros requeridos por el procedimiento almacenado
                command.Parameters.AddWithValue("@USUARIO_ID", usuario.idUsuario);
                command.Parameters.AddWithValue("@USUARIO_NOMBRE", usuario.nombreUsuario);
                command.Parameters.AddWithValue("@USUARIO_CORREO", usuario.correoUsuario ?? (object)DBNull.Value); // Permitir valores nulos
                command.Parameters.AddWithValue("@ROL_ID", usuario.idRol);

                try
                {
                    // Abrir conexión y ejecutar el procedimiento almacenado
                    connection.Open();
                    command.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    // Capturar detalles del error y lanzar la excepción
                    throw new Exception("Error al modificar usuario: " + ex.Message);
                }
            }
        }

        public bool CambiarContraseña(string usuarioId, string contraseñaAnterior, string nuevaContraseña)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("SP_CAMBIARCONTRASEÑA", connection);
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@USUARIO_ID", usuarioId);
                command.Parameters.AddWithValue("@CONTRASEÑA_ANTERIOR", contraseñaAnterior);
                command.Parameters.AddWithValue("@NUEVA_CONTRASEÑA", nuevaContraseña);

                connection.Open();
                try
                {
                    command.ExecuteNonQuery();
                    return true;
                }
                catch (SqlException)
                {
                    return false;
                }
            }
        }

        //Validar el ingreso del usuario al sistema
        //public bool ValidarUsuario(string usuarioNombre, string usuarioContraseña)
        //{
        //    using (SqlConnection conn = new SqlConnection(connectionString))
        //    {
        //        SqlCommand command = new SqlCommand("SP_LOGINOUSUARIO", conn);
        //        command.CommandType = CommandType.StoredProcedure;

        //        command.Parameters.AddWithValue("@USUARIO_NOMBRE", usuarioNombre);
        //        command.Parameters.AddWithValue("@USUARIO_CONTRASEÑA", usuarioContraseña);

        //        conn.Open();

        //        // Ejecutar y devolver TRUE o FALSE
        //        var resultado = command.ExecuteScalar();
        //        return Convert.ToBoolean(resultado);
        //    }
        //}
    }
}