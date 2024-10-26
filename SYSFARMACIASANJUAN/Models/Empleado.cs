using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SYSFARMACIASANJUAN.Models
{
    public class Empleado
    {
        public string idEmpleado { get; set; }
        public string primerNombre { get; set; }
        public string segundoNombre { get; set; }
        public string tercerNombre { get; set; }
        public string primerApellido { get; set; }
        public string segundoApellido { get; set; }
        public string apellidoCasada { get; set; }
        public string cui { get; set; }
        public string nit { get; set; }
        public DateTime fechaNacimiento { get; set; }
        public DateTime fechaIngreso { get; set; }
        public string direccion { get; set; }
        public string telefonoCasa { get; set; }
        public string telefonoMovil { get; set; }
        public char genero { get; set; }
        public char estado { get; set; }
        public byte[] foto { get; set; }
        public string puesto {  get; set; }

        public string puestoNombre { get; set; }
        //public string accion {  get; set; }
    }
}