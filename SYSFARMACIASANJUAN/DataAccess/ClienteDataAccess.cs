using SYSFARMACIASANJUAN.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace SYSFARMACIASANJUAN.DataAccess
{
    public class ClienteDataAccess
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;

        public List<Cliente> ListarClientePorFiltro(string clienteId = null, string nombreCliente = null, string clienteNit = null, string clienteCui = null)
        {
            List<Cliente> clientes = new List<Cliente>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand("SP_OBTENER_CLIENTE", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Agregar el parámetro del ID del producto, validando si es null o vacío
                    command.Parameters.AddWithValue("@ClienteID", string.IsNullOrEmpty(clienteId) ? (object)DBNull.Value : clienteId);

                    // Agregar el parámetro del nombre del producto
                    command.Parameters.AddWithValue("@NombreCliente", string.IsNullOrEmpty(nombreCliente) ? (object)DBNull.Value : nombreCliente);

                    command.Parameters.AddWithValue("@ClienteNIT", string.IsNullOrEmpty(clienteNit) ? (object)DBNull.Value : clienteNit);

                    command.Parameters.AddWithValue("@ClienteCUI", string.IsNullOrEmpty(clienteCui) ? (object)DBNull.Value : clienteCui);


                    try
                    {
                        connection.Open();
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Cliente cliente = new Cliente
                                {
                                    idCliente = reader["CLIENTE_ID"].ToString(),
                                    nombreCompleto = reader["NOMBRE_COMPLETO"].ToString(),
                                    cui = reader["CLIENTE_CUI"].ToString(),
                                    nit = reader["CLIENTE_NIT"].ToString(),
                                    municipioNombre = reader["MUNICIPIO_NOMBRE"].ToString(),
                                    municipioid = reader["MUNICIPIO_ID"].ToString(),
                                    direccion = reader["CLIENTE_DIRECCION"].ToString(),
                                    telefonoCasa = reader["CLIENTE_TELEFONOCASA"].ToString(),
                                    telefonoMovil = reader["CLIENTE_TELEFONOMOVIL"].ToString(),
                                    correo = reader["CLIENTE_CORREO"].ToString()
                                };

                                clientes.Add(cliente);
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        // Manejar el error
                        throw new Exception("Error al obtener al cliente: " + ex.Message, ex);
                    }
                }
            }

            return clientes;
        }


        public void MantenimientoCrearCliente  (Cliente cliente)
        {
            //int edad = edadEmpleado((DateTime)empleado.fechaNacimientoEmpleado);

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                //String accion = "";
                SqlCommand command = new SqlCommand("SP_MANTENIMIENTO_CLIENTE", connection);
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@CLIENTE_ID", 1);
                command.Parameters.AddWithValue("@CLIENTE_PRIMERNOMBRE", cliente.primerNombre);
                command.Parameters.AddWithValue("@CLIENTE_SEGUNDONOMBRE", cliente.segundoNombre);
                command.Parameters.AddWithValue("@CLIENTE_TERCERNOMBRE", cliente.tercerNombre);
                command.Parameters.AddWithValue("@CLIENTE_PRIMERAPELLIDO", cliente.primerApellido);
                command.Parameters.AddWithValue("@CLIENTE_SEGUNDOAPELLIDO", cliente.segundoApellido);
                command.Parameters.AddWithValue("@CLIENTE_APELLIDOCASADA", cliente.apellidoCasada);
                command.Parameters.AddWithValue("@CLIENTE_NIT", cliente.nit);
                command.Parameters.AddWithValue("@CLIENTE_CUI", cliente.cui);
                command.Parameters.AddWithValue("@MUNICIPIO_ID", cliente.municipioid);
                command.Parameters.AddWithValue("@CLIENTE_DIRECCION", cliente.direccion);
                command.Parameters.AddWithValue("@CLIENTE_TELEFONOCASA", cliente.telefonoCasa);
                command.Parameters.AddWithValue("@CLIENTE_TELEFONOMOVIL", cliente.telefonoMovil);
                command.Parameters.AddWithValue("@CLIENTE_CORREO", cliente.correo);
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
                    throw new Exception("Error al agregar cliente: " + ex.Message);
                }
            }
        }

        //listar clientes
        public List<Cliente> ListarClientes()
        {
            List<Cliente> clientes = new List<Cliente>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("SP_LISTARCLIENTES", connection);
                command.CommandType = CommandType.StoredProcedure;

                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        Cliente cliente = new Cliente
                        {
                            idCliente = reader["CLIENTE_ID"].ToString(),
                            primerNombre = reader["CLIENTE_PRIMERNOMBRE"].ToString(),
                            segundoNombre = reader["CLIENTE_SEGUNDONOMBRE"].ToString(),
                            tercerNombre = reader["CLIENTE_TERCERNOMBRE"].ToString(),
                            primerApellido = reader["CLIENTE_PRIMERAPELLIDO"].ToString(),
                            segundoApellido = reader["CLIENTE_SEGUNDOAPELLIDO"].ToString(),
                            apellidoCasada = reader["CLIENTE_APELLIDOCASADA"].ToString(),
                            cui = reader["CLIENTE_CUI"].ToString(),
                            nit = reader["CLIENTE_NIT"].ToString(),
                            municipioid = reader["MUNICIPIO_NOMBRE"].ToString(),
                            direccion = reader["CLIENTE_DIRECCION"].ToString(),
                            telefonoCasa = reader["CLIENTE_TELEFONOCASA"].ToString(),
                            telefonoMovil = reader["CLIENTE_TELEFONOMOVIL"].ToString(),
                            correo = reader["CLIENTE_CORREO"].ToString(),
                        };

                        clientes.Add(cliente);
                    }
                }
                catch (Exception ex)
                {
                    // Manejar el error
                    throw new Exception("Error al obtener clientes: " + ex.Message);
                }
            }

            return clientes;
        }

        public List<Cliente> ListarClientePorId(string id)
        {
            List<Cliente> clientes = new List<Cliente>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("SP_BUSCARCLIENTEPORID", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@CLIENTE_ID", id); // Agregar el parámetro del ID del cliente

                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        Cliente cliente = new Cliente
                        {
                            idCliente = reader["CLIENTE_ID"].ToString(),
                            primerNombre = reader["CLIENTE_PRIMERNOMBRE"].ToString(),
                            segundoNombre = reader["CLIENTE_SEGUNDONOMBRE"].ToString(),
                            tercerNombre = reader["CLIENTE_TERCERNOMBRE"].ToString(),
                            primerApellido = reader["CLIENTE_PRIMERAPELLIDO"].ToString(),
                            segundoApellido = reader["CLIENTE_SEGUNDOAPELLIDO"].ToString(),
                            apellidoCasada = reader["CLIENTE_APELLIDOCASADA"].ToString(),
                            cui = reader["CLIENTE_CUI"].ToString(),
                            nit = reader["CLIENTE_NIT"].ToString(),
                            municipioid = reader["MUNICIPIO_ID"].ToString(),
                            municipioNombre = reader["MUNICIPIO_NOMBRE"].ToString(),
                            //municipioNombre = reader["MUNICIPIO_NOMBRE"].ToString(),
                            direccion = reader["CLIENTE_DIRECCION"].ToString(),
                            telefonoCasa = reader["CLIENTE_TELEFONOCASA"].ToString(),
                            telefonoMovil = reader["CLIENTE_TELEFONOMOVIL"].ToString(),
                            correo = reader["CLIENTE_CORREO"].ToString()
                        };

                        clientes.Add(cliente);
                    }
                }
                catch (Exception ex)
                {
                    // Manejar el error
                    throw new Exception("Error al obtener clientes: " + ex.Message);
                }
            }

            return clientes;
        }

        // Método para modificar un cliente existente
        public void ModificarCliente(Cliente cliente)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("SP_MODIFICARDATOSCLIENTE", connection);
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@CLIENTE_ID", cliente.idCliente);
                command.Parameters.AddWithValue("@CLIENTE_PRIMERNOMBRE", cliente.primerNombre);
                command.Parameters.AddWithValue("@CLIENTE_SEGUNDONOMBRE", cliente.segundoNombre);
                command.Parameters.AddWithValue("@CLIENTE_TERCERNOMBRE", cliente.tercerNombre);
                command.Parameters.AddWithValue("@CLIENTE_PRIMERAPELLIDO", cliente.primerApellido);
                command.Parameters.AddWithValue("@CLIENTE_SEGUNDOAPELLIDO", cliente.segundoApellido);
                command.Parameters.AddWithValue("@CLIENTE_APELLIDOCASADA", cliente.apellidoCasada);
                command.Parameters.AddWithValue("@CLIENTE_CUI", cliente.cui);
                command.Parameters.AddWithValue("@CLIENTE_NIT", cliente.nit);
                command.Parameters.AddWithValue("@MUNICIPIO_ID", cliente.municipioid); // Cambio realizado aquí
                command.Parameters.AddWithValue("@CLIENTE_DIRECCION", cliente.direccion);
                command.Parameters.AddWithValue("@CLIENTE_TELEFONOCASA", cliente.telefonoCasa);
                command.Parameters.AddWithValue("@CLIENTE_TELEFONOMOVIL", cliente.telefonoMovil);
                command.Parameters.AddWithValue("@CLIENTE_CORREO", cliente.correo);

                try
                {
                    connection.Open();
                    command.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine("Error SQL: " + ex.Message);
                    throw new Exception("Error al modificar cliente: " + ex.Message);
                }
            }
        }

    }
}