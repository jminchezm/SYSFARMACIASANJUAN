using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SYSFARMACIASANJUAN.Models
{
    public class Proveedor
    {
        public string idProveedor { get; set; }
        public string nombre { get; set; }
        public string telefono { get; set; }
        public string celular { get; set; }
        public string direccion { get; set; }
        public string correo { get; set; }
        public string municipio_id { get; set; }
        public string municipioNombre { get; set; }

    }
}
