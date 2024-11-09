using SYSFARMACIASANJUAN.DataAccess;
using SYSFARMACIASANJUAN.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace SYSFARMACIASANJUAN.Bussines
{
    public class ProveedorServices
    {
        private ProveedorDataAcces proveedorDataAcces = new ProveedorDataAcces();

        public void MantenimientoCrearProveedor(Proveedor proveedor)
        {
            // Aquí puedes agregar validaciones y lógica adicional si es necesario
            proveedorDataAcces.MantenimientoCrearProveedor (proveedor);
        }

        public List<Proveedor> ListarProveedor()
        {
            List<Proveedor> provedores = proveedorDataAcces.ListarProveedor();

            foreach (var usu in provedores)
            {
                Debug.WriteLine($"Usuario: {usu.nombre} - Correo: {usu.correo}");
            }

            return provedores;
        }
        public List<Proveedor> ObtenerProveedorPorId(string id)
        {
            // Obtén la lista completa de empleados que coinciden con el ID
            var proveedores = proveedorDataAcces.ListarProveedorPorId(id);

            // Devuelve la lista de empleados (puede estar vacía si no se encontraron coincidencias)
            return proveedores;
        }

        public Proveedor ObtenerUnProveedorPorId(string id)
        {
            var proveedores = proveedorDataAcces.ListarProveedorPorId(id);
            return proveedores.FirstOrDefault(); // Devuelve el primer empleado o null si no hay resultados
        }

        public void ModificarProveedor(Proveedor proveedor)
        {
            proveedorDataAcces.ModificarProveedor(proveedor); // Implementa este método en EmpleadoDataAccess
        }
    }
        
}