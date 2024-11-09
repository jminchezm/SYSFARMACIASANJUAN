using SYSFARMACIASANJUAN.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using Antlr.Runtime.Misc;
using System.Text;
using System.IO;
using System.Drawing.Imaging;

namespace SYSFARMACIASANJUAN.DataAccess
{
    public class ProveedorDataAcces
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;

        public void MantenimientoCrearProveedor(Proveedor proveedor)
        {
            //int edad = edadEmpleado((DateTime)empleado.fechaNacimientoEmpleado);

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                //String accion = "";
                SqlCommand command = new SqlCommand("SP_MANTENIMIENTO_PROVEEDOR", connection);
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@PROVEEDOR_ID", 1);
                command.Parameters.AddWithValue("@PROVEEDOR_NOMBRE", proveedor.nombre);
                command.Parameters.AddWithValue("@PROVEEDOR_TELEFONO", proveedor.telefono);
                command.Parameters.AddWithValue("@PROVEEDOR_CELULAR", proveedor.celular);
                command.Parameters.AddWithValue("@PROVEEDOR_DIRECCION", proveedor.direccion);
                command.Parameters.AddWithValue("@PROVEEDOR_CORREO", proveedor.correo);
                command.Parameters.AddWithValue("MUNICIPIO_ID", proveedor.municipio_id);
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
                    throw new Exception("Error al agregar Proveedor: " + ex.Message);
                }
            }
        }
        public List<Proveedor> ListarProveedor()
        {
            List<Proveedor> proveedores = new List<Proveedor>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("SP_LISTARPROVEEDORES", connection);
                command.CommandType = CommandType.StoredProcedure;

                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        Proveedor proveedor = new Proveedor
                        {
                            idProveedor = reader["PROVEEDOR_ID"].ToString(),
                            nombre = reader["PROVEEDOR_NOMBRE"].ToString(),
                            telefono = reader["PROVEEDOR_TELEFONO"].ToString(),
                            celular = reader["PROVEEDOR_CELULAR"].ToString(),
                            direccion = reader["PROVEEDOR_DIRECCION"].ToString(),
                            correo = reader["PROVEEDOR_CORREO"].ToString(),
                            municipio_id = reader["MUNICIPIO_NOMBRE"].ToString()
                        };

                        proveedores.Add(proveedor);
                    }
                }
                catch (Exception ex)
                {
                    // Manejar el error
                    throw new Exception("Error al obtener usuarios: " + ex.Message);
                }
            }

            return proveedores;
        }



        public List<Proveedor> ListarProveedorPorId(string id)
        {
            List<Proveedor> proveedores = new List<Proveedor>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("SP_BUSCARPROVEEDORPORID", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@PROVEEDOR_ID", id);

                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        Proveedor proveedor = new Proveedor
                        {
                            idProveedor = reader["PROVEEDOR_ID"] != DBNull.Value ? reader["PROVEEDOR_ID"].ToString() : string.Empty,
                            nombre = reader["PROVEEDOR_NOMBRE"] != DBNull.Value ? reader["PROVEEDOR_NOMBRE"].ToString() : string.Empty,
                            telefono = reader["PROVEEDOR_TELEFONO"] != DBNull.Value ? reader["PROVEEDOR_TELEFONO"].ToString() : string.Empty,
                            celular = reader["PROVEEDOR_CELULAR"] != DBNull.Value ? reader["PROVEEDOR_CELULAR"].ToString() : string.Empty,
                            direccion = reader["PROVEEDOR_DIRECCION"] != DBNull.Value ? reader["PROVEEDOR_DIRECCION"].ToString() : string.Empty,
                            correo = reader["PROVEEDOR_CORREO"] != DBNull.Value ? reader["PROVEEDOR_CORREO"].ToString() : string.Empty,
                            municipio_id = reader["MUNICIPIO_ID"] != DBNull.Value ? reader["MUNICIPIO_ID"].ToString() : string.Empty,
                            municipioNombre = reader["MUNICIPIO_NOMBRE"] != DBNull.Value ? reader["MUNICIPIO_NOMBRE"].ToString() : string.Empty
                        };
                        proveedores.Add(proveedor);
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception("Error al obtener Proveedor: " + ex.Message);
                }
            }

            return proveedores;
        }

        public void ModificarProveedor(Proveedor proveedor)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                // Crear el comando para el procedimiento almacenado
                SqlCommand command = new SqlCommand("SP_MODIFICARDATOSPROVEEDOR", connection);
                command.CommandType = CommandType.StoredProcedure;

                // Agregar los parámetros requeridos por el procedimiento almacenado
                command.Parameters.AddWithValue("@PROVEEDOR_ID", proveedor.idProveedor);
                command.Parameters.AddWithValue("@PROVEEDOR_NOMBRE", proveedor.nombre);
                command.Parameters.AddWithValue("@PROVEEDOR_TELEFONO", proveedor.telefono);// ?? (object)DBNull.Value); // Permitir valores nulos
                command.Parameters.AddWithValue("@PROVEEDOR_CELULAR", proveedor.celular);
                command.Parameters.AddWithValue("@PROVEEDOR_DIRECCION", proveedor.direccion);
                command.Parameters.AddWithValue("@PROVEEDOR_CORREO", proveedor.correo);
                command.Parameters.AddWithValue("@MUNICIPIO_ID", proveedor.municipio_id);


                try
                {
                    // Abrir conexión y ejecutar el procedimiento almacenado
                    connection.Open();
                    command.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    // Capturar detalles del error y lanzar la excepción
                    throw new Exception("Error al modificar proveedor: " + ex.Message);
                }
            }
        }
        //public List<Proveedor> ListarProveedorPorId(string id)
        //{
        //    List<Proveedor> proveedores = new List<Proveedor>();

        //    using (SqlConnection connection = new SqlConnection(connectionString))
        //    {
        //        SqlCommand command = new SqlCommand("SP_BUSCARPROVEEDORPORID", connection);
        //        command.CommandType = CommandType.StoredProcedure;
        //        command.Parameters.AddWithValue("@PROVEEDOR_ID", id); // Corregido: El parámetro debe agregarse antes de ejecutar el comando

        //        try
        //        {
        //            connection.Open();
        //            SqlDataReader reader = command.ExecuteReader();

        //            while (reader.Read())
        //            {
        //                //byte[] fotoEmpleado = reader["EMPLEADO_FOTO"] != DBNull.Value ? (byte[])reader["EMPLEADO_FOTO"] : null;
        //                Proveedor proveedor = new Proveedor
        //                {
        //                    idProveedor = reader["PROVEEDOR_ID"] != DBNull.Value ? reader["PROVEEDOR_ID"].ToString() : string.Empty,
        //                    nombre = reader["PROVEEDOR_NOMBRE"] != DBNull.Value ? reader["PROVEEDOR_NOMBRE"].ToString() : string.Empty,
        //                    telefono = reader["PROVEEDOR_TELEFONO"] != DBNull.Value ? reader["PROVEEDOR_TELEFONO"].ToString() : string.Empty,
        //                    celular = reader["CELULAR"] != DBNull.Value ? reader["CELULAR"].ToString() : string.Empty,
        //                    direccion = reader["DIRECCION"] != DBNull.Value ? reader["DIRECCION"].ToString() : string.Empty,
        //                    correo = reader["CORREO"] != DBNull.Value ? reader["CORREO"].ToString() : string.Empty,
        //                    municipio_id = reader["MUNICIPIO_NOMBRE"] != DBNull.Value ? reader["MUNICIPIO_NOMBRE"].ToString() : string.Empty
        //                    //foto = (byte[])reader["EMPLEADO_FOTO"]
        //                    //foto = reader["EMPLEADO_FOTO"] != DBNull.Value ? (byte[])reader["EMPLEADO_FOTO"] : null // Conversión explícita
        //                    //FotoBase64 = reader["EMPLEADO_FOTO"] != DBNull.Value ? Convert.ToBase64String((byte[])reader["EMPLEADO_FOTO"]) : null

        //                };
        //                proveedores.Add(proveedor);
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            // Manejar el error
        //            throw new Exception("Error al obtener Proveedor: " + ex.Message);
        //        }
        //    }

        //    return proveedores;
        //}

    }
}