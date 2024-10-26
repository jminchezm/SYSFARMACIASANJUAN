using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SYSFARMACIASANJUAN.Models
{
    public class Usuario
    {
        public string idUsuario { get; set; }
        public string nombreUsuario { get; set; }
        public string passwordUsuario { get; set; }
        public string correoUsuario { get; set; }
        public string idRol { get; set; }
        public string idEmpleado { get; set; }
        public string nombreRol { get; set; }
        public string nombreCompletoEmpleado { get; set; }

    }
}