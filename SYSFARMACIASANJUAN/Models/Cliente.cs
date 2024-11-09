using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SYSFARMACIASANJUAN.Models
{
    public class Cliente
    {
        public string idCliente { get; set; }
        public string primerNombre { get; set; }
        public string segundoNombre { get; set; }
        public string tercerNombre { get; set; }
        public string primerApellido { get; set; }
        public string segundoApellido { get; set; }
        public string apellidoCasada { get; set; }
        public string cui { get; set; }
        public string nit { get; set; }
        public string municipioNombre { get; set; }
        public string municipioid { get; set; }
        public string direccion { get; set; }
        public string telefonoCasa { get; set; }
        public string telefonoMovil { get; set; }
        public string correo {  get; set; }

        public string nombreCompleto { get; set; }

    }
}