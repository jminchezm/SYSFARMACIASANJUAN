using SYSFARMACIASANJUAN.DataAccess;
using SYSFARMACIASANJUAN.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace SYSFARMACIASANJUAN.Bussines
{
    public class EmpleadoServices
    {
        private EmpleadoDataAccess empleadoDataAccess = new EmpleadoDataAccess();

        public void MantenimientoAgregarEmpleado(Empleado empleado)
        {
            // Aquí puedes agregar validaciones y lógica adicional si es necesario
            empleadoDataAccess.MantenimientoAgregarEmpleado(empleado);
        }

        public List<Empleado> ListarEmpleados(string estado = null)
        {
            // Llama al método de la capa de acceso a datos con el filtro de estado
            List<Empleado> empleados = empleadoDataAccess.ListarEmpleados(estado);

            foreach (var emp in empleados)
            {
                Debug.WriteLine($"Empleado: {emp.primerNombre} {emp.primerApellido} - CUI: {emp.cui}");
            }

            return empleados;
        }

        //public List<Empleado> ListarEmpleados()
        //{
        //    List<Empleado> empleados = empleadoDataAccess.ListarEmpleados();

        //    foreach (var emp in empleados)
        //    {
        //        Debug.WriteLine($"Empleado: {emp.primerNombre} {emp.primerApellido} - CUI: {emp.cui}");
        //    }

        //    return empleados;
        //}

        public List<Empleado> ObtenerEmpleadosPorId(string id, string estado = null)
        {
            // Obtén la lista completa de empleados que coinciden con el ID
            var empleados = empleadoDataAccess.ListarEmpleadoPorId(id, estado);

            // Devuelve la lista de empleados (puede estar vacía si no se encontraron coincidencias)
            return empleados;
        }

        public Empleado ObtenerUnEmpleadoPorId(string id)
        {
            var empleados = empleadoDataAccess.ListarEmpleadoPorId(id);
            return empleados.FirstOrDefault(); // Devuelve el primer empleado o null si no hay resultados
        }

        public void ModificarEmpleado(Empleado empleado)
        {
            empleadoDataAccess.ModificarEmpleado(empleado); // Implementa este método en EmpleadoDataAccess
        }
    }
}