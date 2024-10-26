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
    public class EmpleadoDataAccess
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;

        public void MantenimientoAgregarEmpleado(Empleado empleado)
        {
            //int edad = edadEmpleado((DateTime)empleado.fechaNacimientoEmpleado);

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                //String accion = "";
                SqlCommand command = new SqlCommand("SP_MANTENIMIENTO_EMPLEADO", connection);
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@EMPLEADO_ID", 1);
                command.Parameters.AddWithValue("@EMPLEADO_PRIMERNOMBRE", empleado.primerNombre);
                command.Parameters.AddWithValue("@EMPLEADO_SEGUNDONOMBRE", empleado.segundoNombre);
                command.Parameters.AddWithValue("@EMPLEADO_TERCERNOMBRE", empleado.tercerNombre);
                command.Parameters.AddWithValue("@EMPLEADO_PRIMERAPELLIDO", empleado.primerApellido);
                command.Parameters.AddWithValue("@EMPLEADO_SEGUNDOAPELLIDO", empleado.segundoApellido);
                command.Parameters.AddWithValue("@EMPLEADO_APELLIDOCASADA", empleado.apellidoCasada);
                command.Parameters.AddWithValue("@EMPLEADO_CUI", empleado.cui);
                command.Parameters.AddWithValue("@EMPLEADO_NIT", empleado.nit);
                command.Parameters.AddWithValue("@EMPLEADO_FECHANACIMIENTO", empleado.fechaNacimiento);
                command.Parameters.AddWithValue("@EMPLEADO_FECHAINGRESO", empleado.fechaIngreso);
                command.Parameters.AddWithValue("@EMPLEADO_DIRECCION", empleado.direccion);
                command.Parameters.AddWithValue("@EMPLEADO_TELEFONOCASA", empleado.telefonoCasa);
                command.Parameters.AddWithValue("@EMPLEADO_TELEFONOMOVIL", empleado.telefonoMovil);
                command.Parameters.AddWithValue("@EMPLEADO_GENERO", empleado.genero);
                command.Parameters.AddWithValue("@EMPLEADO_ESTADO", empleado.estado);
                command.Parameters.AddWithValue("@PUESTO_ID", empleado.puesto);
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
                    throw new Exception("Error al agregar empleado: " + ex.Message);
                }
            }
        }

        public List<Empleado> ListarEmpleados(string estado = null)
        {
            List<Empleado> empleados = new List<Empleado>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("SP_LISTAREMPLEADOS", connection);
                command.CommandType = CommandType.StoredProcedure;

                // Verifica si el estado tiene un valor, y si es así, lo pasa como parámetro.
                if (!string.IsNullOrEmpty(estado))
                {
                    command.Parameters.AddWithValue("@EMPLEADO_ESTADO", estado);
                }
                else
                {
                    // Si el estado es null, pasa DBNull para el parámetro @EMPLEADO_ESTADO.
                    command.Parameters.AddWithValue("@EMPLEADO_ESTADO", DBNull.Value);
                }

                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        Empleado empleado = new Empleado
                        {
                            idEmpleado = reader["EMPLEADO_ID"].ToString(),
                            primerNombre = reader["EMPLEADO_PRIMERNOMBRE"].ToString(),
                            segundoNombre = reader["EMPLEADO_SEGUNDONOMBRE"].ToString(),
                            tercerNombre = reader["EMPLEADO_TERCERNOMBRE"].ToString(),
                            primerApellido = reader["EMPLEADO_PRIMERAPELLIDO"].ToString(),
                            segundoApellido = reader["EMPLEADO_SEGUNDOAPELLIDO"].ToString(),
                            apellidoCasada = reader["EMPLEADO_APELLIDOCASADA"].ToString(),
                            cui = reader["EMPLEADO_CUI"].ToString(),
                            nit = reader["EMPLEADO_NIT"].ToString(),
                            fechaNacimiento = Convert.ToDateTime(reader["EMPLEADO_FECHANACIMIENTO"].ToString()),
                            fechaIngreso = Convert.ToDateTime(reader["EMPLEADO_FECHAINGRESO"]),
                            direccion = reader["EMPLEADO_DIRECCION"].ToString(),
                            telefonoCasa = reader["EMPLEADO_TELEFONOCASA"].ToString(),
                            telefonoMovil = reader["EMPLEADO_TELEFONOMOVIL"].ToString(),
                            genero = Convert.ToChar(reader["EMPLEADO_GENERO"].ToString()),
                            estado = Convert.ToChar(reader["EMPLEADO_ESTADO"].ToString()),
                            puesto = reader["PUESTO_ID"].ToString(),
                            puestoNombre = reader["PUESTO_NOMBRE"].ToString()
                        };

                        empleados.Add(empleado);
                    }
                }
                catch (Exception ex)
                {
                    // Manejar el error
                    throw new Exception("Error al obtener empleados: " + ex.Message);
                }
            }

            return empleados;
        }

        public List<Empleado> ListarEmpleadoPorId(string id, string estado = null)
        {
            List<Empleado> empleados = new List<Empleado>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("SP_BUSCAREMPLEADOPORID", connection);
                command.CommandType = CommandType.StoredProcedure;

                // Agregar el parámetro del ID del empleado
                command.Parameters.AddWithValue("@EMPLEADO_ID", id);
                //command.Parameters.AddWithValue("@EMPLEADO_ESTADO", estado);

                // Agregar el parámetro del estado si no es null, de lo contrario enviar DBNull
                if (string.IsNullOrEmpty(estado))
                {
                    command.Parameters.AddWithValue("@EMPLEADO_ESTADO", DBNull.Value);  // Si no se envía el estado
                }
                else
                {
                    command.Parameters.AddWithValue("@EMPLEADO_ESTADO", estado);  // Enviar el estado si está presente
                }

                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        Empleado empleado = new Empleado
                        {
                            idEmpleado = reader["EMPLEADO_ID"].ToString(),
                            primerNombre = reader["EMPLEADO_PRIMERNOMBRE"].ToString(),
                            segundoNombre = reader["EMPLEADO_SEGUNDONOMBRE"].ToString(),
                            tercerNombre = reader["EMPLEADO_TERCERNOMBRE"].ToString(),
                            primerApellido = reader["EMPLEADO_PRIMERAPELLIDO"].ToString(),
                            segundoApellido = reader["EMPLEADO_SEGUNDOAPELLIDO"].ToString(),
                            apellidoCasada = reader["EMPLEADO_APELLIDOCASADA"].ToString(),
                            cui = reader["EMPLEADO_CUI"].ToString(),
                            nit = reader["EMPLEADO_NIT"].ToString(),
                            fechaNacimiento = Convert.ToDateTime(reader["EMPLEADO_FECHANACIMIENTO"].ToString()),
                            fechaIngreso = Convert.ToDateTime(reader["EMPLEADO_FECHAINGRESO"]),
                            direccion = reader["EMPLEADO_DIRECCION"].ToString(),
                            telefonoCasa = reader["EMPLEADO_TELEFONOCASA"].ToString(),
                            telefonoMovil = reader["EMPLEADO_TELEFONOMOVIL"].ToString(),
                            genero = Convert.ToChar(reader["EMPLEADO_GENERO"].ToString()),
                            estado = Convert.ToChar(reader["EMPLEADO_ESTADO"].ToString()),
                            puesto = reader["PUESTO_ID"].ToString(),
                            puestoNombre = reader["PUESTO_NOMBRE"].ToString()
                        };

                        empleados.Add(empleado);
                    }
                }
                catch (Exception ex)
                {
                    // Manejar el error
                    throw new Exception("Error al obtener empleados: " + ex.Message);
                }
            }

            return empleados;
        }


        //public List<Empleado> ListarEmpleadoPorId(string id)
        //{
        //    List<Empleado> empleados = new List<Empleado>();

        //    using (SqlConnection connection = new SqlConnection(connectionString))
        //    {
        //        SqlCommand command = new SqlCommand("SP_BUSCAREMPLEADOPORID", connection);
        //        command.CommandType = CommandType.StoredProcedure;
        //        command.Parameters.AddWithValue("@EMPLEADO_ID", id); // Corregido: El parámetro debe agregarse antes de ejecutar el comando

        //        try
        //        {
        //            connection.Open();
        //            SqlDataReader reader = command.ExecuteReader();

        //            while (reader.Read())
        //            {
        //                //byte[] fotoEmpleado = reader["EMPLEADO_FOTO"] != DBNull.Value ? (byte[])reader["EMPLEADO_FOTO"] : null;
        //                Empleado empleado = new Empleado
        //                {
        //                    idEmpleado = reader["EMPLEADO_ID"].ToString(),
        //                    primerNombre = reader["EMPLEADO_PRIMERNOMBRE"].ToString(),
        //                    segundoNombre = reader["EMPLEADO_SEGUNDONOMBRE"].ToString(),
        //                    tercerNombre = reader["EMPLEADO_TERCERNOMBRE"].ToString(),
        //                    primerApellido = reader["EMPLEADO_PRIMERAPELLIDO"].ToString(),
        //                    segundoApellido = reader["EMPLEADO_SEGUNDOAPELLIDO"].ToString(),
        //                    apellidoCasada = reader["EMPLEADO_APELLIDOCASADA"].ToString(),
        //                    cui = reader["EMPLEADO_CUI"].ToString(),
        //                    nit = reader["EMPLEADO_NIT"].ToString(),
        //                    fechaNacimiento = Convert.ToDateTime(reader["EMPLEADO_FECHANACIMIENTO"].ToString()),
        //                    fechaIngreso = Convert.ToDateTime(reader["EMPLEADO_FECHAINGRESO"]),
        //                    direccion = reader["EMPLEADO_DIRECCION"].ToString(),
        //                    telefonoCasa = reader["EMPLEADO_TELEFONOCASA"].ToString(),
        //                    telefonoMovil = reader["EMPLEADO_TELEFONOMOVIL"].ToString(),
        //                    genero = Convert.ToChar(reader["EMPLEADO_GENERO"].ToString()),
        //                    estado = Convert.ToChar(reader["EMPLEADO_ESTADO"].ToString()),
        //                    puesto = reader["PUESTO_ID"].ToString(),
        //                    puestoNombre = reader["PUESTO_NOMBRE"].ToString()
        //                    //foto = (byte[])reader["EMPLEADO_FOTO"]
        //                    //foto = reader["EMPLEADO_FOTO"] != DBNull.Value ? (byte[])reader["EMPLEADO_FOTO"] : null // Conversión explícita
        //                    //FotoBase64 = reader["EMPLEADO_FOTO"] != DBNull.Value ? Convert.ToBase64String((byte[])reader["EMPLEADO_FOTO"]) : null

        //                };
        //                empleados.Add(empleado);
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            // Manejar el error
        //            throw new Exception("Error al obtener empleados: " + ex.Message);
        //        }
        //    }

        //    return empleados;
        //}

        // Método para modificar un empleado existente
        public void ModificarEmpleado(Empleado empleado)
        {
            //int edad = edadEmpleado((DateTime)empleado.fechaNacimientoEmpleado);

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                //String accion = "";
                SqlCommand command = new SqlCommand("SP_MANTENIMIENTO_EMPLEADO", connection);
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@EMPLEADO_ID", empleado.idEmpleado);
                command.Parameters.AddWithValue("@EMPLEADO_PRIMERNOMBRE", empleado.primerNombre);
                command.Parameters.AddWithValue("@EMPLEADO_SEGUNDONOMBRE", empleado.segundoNombre);
                command.Parameters.AddWithValue("@EMPLEADO_TERCERNOMBRE", empleado.tercerNombre);
                command.Parameters.AddWithValue("@EMPLEADO_PRIMERAPELLIDO", empleado.primerApellido);
                command.Parameters.AddWithValue("@EMPLEADO_SEGUNDOAPELLIDO", empleado.segundoApellido);
                command.Parameters.AddWithValue("@EMPLEADO_APELLIDOCASADA", empleado.apellidoCasada);
                command.Parameters.AddWithValue("@EMPLEADO_CUI", empleado.cui);
                command.Parameters.AddWithValue("@EMPLEADO_NIT", empleado.nit);
                command.Parameters.AddWithValue("@EMPLEADO_FECHANACIMIENTO", empleado.fechaNacimiento);
                command.Parameters.AddWithValue("@EMPLEADO_FECHAINGRESO", empleado.fechaIngreso);
                command.Parameters.AddWithValue("@EMPLEADO_DIRECCION", empleado.direccion);
                command.Parameters.AddWithValue("@EMPLEADO_TELEFONOCASA", empleado.telefonoCasa);
                command.Parameters.AddWithValue("@EMPLEADO_TELEFONOMOVIL", empleado.telefonoMovil);
                command.Parameters.AddWithValue("@EMPLEADO_GENERO", empleado.genero);
                command.Parameters.AddWithValue("@EMPLEADO_ESTADO", empleado.estado);
                //command.Parameters.AddWithValue("@EMPLEADO_FOTO", SqlDbType.VarBinary).Value = (object)empleado.foto ?? DBNull.Value;
                command.Parameters.AddWithValue("@PUESTO_ID", empleado.puesto);
                command.Parameters.AddWithValue("@ACCION", 2);

                try
                {
                    if (connection.State == ConnectionState.Open) connection.Close();
                    connection.Open();
                    command.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    // Agrega un registro para capturar detalles del error
                    System.Diagnostics.Debug.WriteLine("Error SQL: " + ex.Message);
                    throw new Exception("Error al modificar empleado: " + ex.Message);
                }                
            }
        }
    }
}