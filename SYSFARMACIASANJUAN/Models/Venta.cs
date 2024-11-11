using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SYSFARMACIASANJUAN.Models
{
    public class Venta
    {
        public string ventaId {  get; set; }
        public DateTime ventaFecha {  get; set; }
        public string ventaEstado {  get; set; }
        public decimal ventaTotal {  get; set; }
        public string venta_clienteId {  get; set; }
        public string venta_clienteNit { get; set; }
        public string venta_clienteCui { get; set; }
        public string venta_usuarioId {  get; set; }
        public string venta_clienteNombre { get; set; }
        public string venta_usuarioNomre { get; set; }

    }
}