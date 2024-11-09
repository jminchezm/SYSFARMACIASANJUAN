using SYSFARMACIASANJUAN.DataAccess;
using SYSFARMACIASANJUAN.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace SYSFARMACIASANJUAN.Bussines
{
    public class ClienteServices
    {
        private ClienteDataAccess clienteDataAccess = new ClienteDataAccess();

        public List<Cliente> ObtenerListarClientesPorFiltro(string clienteId = null, string nombreCliente = null, string clienteNit = null, string clienteCui = null)
        {
            // Obtén la lista completa de productos que coinciden con el ID, nombre, fecha de creación y estado
            var clientes = clienteDataAccess.ListarClientePorFiltro(clienteId, nombreCliente, clienteNit, clienteCui);

            // Devuelve la lista de productos (puede estar vacía si no se encontraron coincidencias)
            return clientes;
        }

        public void MantenimientoCrearCliente(Cliente cliente)
        {
            // Aquí puedes agregar validaciones y lógica adicional si es necesario
            clienteDataAccess.MantenimientoCrearCliente(cliente);
        }

        public List<Cliente> ListarClientes()
        {
            // Llama al método de la capa de acceso a datos con el filtro de estado
            List<Cliente> clientes = clienteDataAccess.ListarClientes();

            foreach (var cli in clientes)
            {
                Debug.WriteLine($"Cliente: {cli.primerNombre} {cli.primerApellido} - CUI: {cli.cui}");
            }

            return clientes;
        }


        public List<Cliente> ObtenerClientesPorId(string id)
        {
            // Obtén la lista completa de empleados que coinciden con el ID
            var clientes = clienteDataAccess.ListarClientePorId(id);

            // Devuelve la lista de empleados (puede estar vacía si no se encontraron coincidencias)
            return clientes;
        }

        public Cliente ObtenerUnClientePorId(string id)
        {
            var cliente = clienteDataAccess.ListarClientePorId(id);
            return cliente.FirstOrDefault(); // Devuelve el primer empleado o null si no hay resultados
        }

        public void ModificarCliente(Cliente cliente)
        {
            clienteDataAccess.ModificarCliente(cliente); // Implementa este método en EmpleadoDataAccess
        }
    }
}