using Newtonsoft.Json;
using SYSFARMACIASANJUAN.Bussines;
using SYSFARMACIASANJUAN.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SYSFARMACIASANJUAN.Controllers
{
    public class ProductosController : ApiController
    {
        ProductoServices productoServices = new ProductoServices();

        //Retorna una lista de productos
        [HttpGet]
        [Route("api/productos")]
        public IHttpActionResult GetProductoFiltro(string id = null, string nombre = null, DateTime? fechaCreacion = null, string estado = null)
        {
            List<Producto> productos = productoServices.ObtenerListarProductosPorFiltro(id, nombre, fechaCreacion, estado);

            if (productos == null || productos.Count == 0)
            {
                return Ok(new List<Producto>()); // Retornar un array vacío si no hay productos
            }

            return Ok(productos);
        }


        //[HttpGet]
        //[Route("api/productos")]
        //public IHttpActionResult GetProductoFiltro(string id = null, string nombre = null, DateTime? fechaCreacion = null)
        //{
        //    List<Producto> productos = productoServices.ObtenerListarProductosPorFiltro(id, nombre, fechaCreacion);

        //    if (productos == null || productos.Count == 0)
        //    {
        //        return Ok(new List<Producto>()); // Retornar un array vacío si no hay productos
        //    }

        //    return Ok(productos);
        //}

        //Se utiliza en el metodo llenarCamposFormModificarProducto para retornar un unico producto
        [HttpGet]
        [Route("api/productos/producto")]
        public IHttpActionResult GetUnSoloProductoFiltro(string id = null, string nombre = null, DateTime? fechaCreacion = null)
        {
            List<Producto> productos = productoServices.ObtenerListarProductosPorFiltro(id, nombre, fechaCreacion);

            if (productos == null || productos.Count == 0)
            {
                return NotFound(); // Cambiado a NotFound si no se encontró el producto
            }

            return Ok(productos.FirstOrDefault()); // Retorna solo el primer producto encontrado
        }


        // Controla el poder obtener un único empleado por id
        //[HttpGet]
        //[Route("api/productos/producto/{id}")]
        //public IHttpActionResult GetUnProductoID(string id)
        //{
        //    Producto productos = productoServices.ObtenerUnProductoPorId(id);

        //    if (productos == null)
        //    {
        //        return Ok(productos); // Retornar un array vacío si no hay empleados
        //    }

        //    return Ok(productos);
        //}

        [HttpPost]
        [Route("api/productos/crear")]
        public async Task<IHttpActionResult> InsertarProducto()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                return BadRequest("Formato de solicitud no soportado.");
            }

            var provider = new MultipartMemoryStreamProvider();
            await Request.Content.ReadAsMultipartAsync(provider);

            Producto producto = null;
            string productoImgPath = null;

            try
            {
                foreach (var content in provider.Contents)
                {
                    if (content.Headers.ContentDisposition.Name.Trim('\"') == "productoImg")
                    {
                        var fileName = content.Headers.ContentDisposition.FileName.Trim('\"');
                        var buffer = await content.ReadAsByteArrayAsync();
                        var uniqueFileName = $"{Guid.NewGuid()}_{fileName}";
                        var uploadPath = HttpContext.Current.Server.MapPath("~/Uploads");

                        if (!Directory.Exists(uploadPath))
                        {
                            Directory.CreateDirectory(uploadPath);
                        }

                        var path = Path.Combine(uploadPath, uniqueFileName);
                        File.WriteAllBytes(path, buffer);
                        productoImgPath = "../Uploads/" + uniqueFileName;
                    }
                    else if (content.Headers.ContentDisposition.Name.Trim('\"') == "producto")
                    {
                        var jsonString = await content.ReadAsStringAsync();
                        producto = JsonConvert.DeserializeObject<Producto>(jsonString);
                    }
                }

                if (producto == null || string.IsNullOrWhiteSpace(producto.productoNombre))
                {
                    return BadRequest("Datos del producto incompletos.");
                }

                producto.productoImg = productoImgPath;
                string resultado = productoServices.MantenimientoProducto(
                    null,
                    producto.productoNombre,
                    producto.productoDescripcion,
                    producto.productoFechaCreacion,
                    producto.productoFormaFarmaceutica,
                    producto.productoViaAdministracion,
                    producto.productoCasaMedica,
                    producto.productoImg,
                    producto.productoEstado,
                    producto.productoSubCategoria,
                    "1"
                );

                if (!string.IsNullOrEmpty(resultado))
                {
                    return Ok(new { success = true, message = "Producto agregado exitosamente."});
                }
                else
                {
                    return BadRequest("No se pudo agregar el producto.");
                }
            }
            catch (Exception ex)
            {
                // Manejo de errores: podrías agregar un log de errores aquí
                return InternalServerError(new Exception("Ocurrió un error al procesar la solicitud: " + ex.Message));
            }
        }

        [HttpPut]
        [Route("api/producto/modificar/{productoId}")]
        public async Task<IHttpActionResult> ModificarProducto(string productoId)
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                return BadRequest("Formato de solicitud no soportado.");
            }

            var provider = new MultipartMemoryStreamProvider();
            await Request.Content.ReadAsMultipartAsync(provider);

            Producto producto = null;
            string productoImgPath = null;

            try
            {
                foreach (var content in provider.Contents)
                {
                    if (content.Headers.ContentDisposition.Name.Trim('\"') == "productoImg")
                    {
                        // Manejo de la imagen
                        var fileName = content.Headers.ContentDisposition.FileName.Trim('\"');
                        var buffer = await content.ReadAsByteArrayAsync();
                        var uniqueFileName = $"{Guid.NewGuid()}_{fileName}";
                        var uploadPath = HttpContext.Current.Server.MapPath("~/Uploads");

                        if (!Directory.Exists(uploadPath))
                        {
                            Directory.CreateDirectory(uploadPath);
                        }

                        var path = Path.Combine(uploadPath, uniqueFileName);
                        File.WriteAllBytes(path, buffer);
                        productoImgPath = "../Uploads/" + uniqueFileName;
                    }
                    else if (content.Headers.ContentDisposition.Name.Trim('\"') == "producto")
                    {
                        // Manejo del objeto Producto
                        var jsonString = await content.ReadAsStringAsync();
                        producto = JsonConvert.DeserializeObject<Producto>(jsonString);
                    }
                }

                // Validación del ID del producto y del objeto Producto
                if (string.IsNullOrEmpty(productoId) || producto == null || string.IsNullOrWhiteSpace(producto.productoNombre))
                {
                    return BadRequest("ID del producto y datos válidos son requeridos.");
                }

                // Si no se subió una nueva imagen, mantener la imagen existente
                if (string.IsNullOrEmpty(productoImgPath))
                {
                    productoImgPath = producto.productoImg;  // Mantener la imagen actual
                }

                // Actualización del producto
                producto.productoImg = productoImgPath;
                string resultado = productoServices.MantenimientoProducto(
                    productoId,
                    producto.productoNombre,
                    producto.productoDescripcion,
                    producto.productoFechaCreacion,
                    producto.productoFormaFarmaceutica,
                    producto.productoViaAdministracion,
                    producto.productoCasaMedica,
                    producto.productoImg,
                    producto.productoEstado,
                    producto.productoSubCategoria,
                    "2" // Acción 2 para modificar
                );

                if (!string.IsNullOrEmpty(resultado))
                {
                    return Ok(new { mensaje = "Producto modificado exitosamente." });
                }
                else
                {
                    return BadRequest("No se pudo modificar el producto.");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(new Exception("Ocurrió un error al modificar el producto: " + ex.Message));
            }
        }


        [HttpPut]
        [Route("api/producto/modificar/estadoProducto/{productoId}")]
        public IHttpActionResult ModificarEstadoProducto(string productoId, [FromBody] Producto producto)
        {
            try
            {
                // Verifica que el objeto producto no sea nulo y tenga un estado válido
                if (producto == null || string.IsNullOrEmpty(producto.productoEstado))
                {
                    return BadRequest("El estado del producto es obligatorio.");
                }

                // Llama al servicio para modificar el estado del producto
                bool resultado = productoServices.ModificarEstadoProducto(productoId, producto.productoEstado);

                // Si la operación fue exitosa
                if (resultado)
                {
                    return Ok(new { message = "Estado del producto actualizado correctamente" });
                }

                // Si no se pudo modificar
                return InternalServerError(new Exception("No se pudo actualizar el estado del producto."));
            }
            catch (Exception ex)
            {
                // Captura cualquier excepción y retorna un error 500
                return InternalServerError(ex);
            }
        }


        // Nueva acción para modificar solo el estado del producto

        //[HttpPut]
        //[Route("api/producto/modificar/estadoProducto/{productoId}")]
        //public IHttpActionResult ModificarEstadoProducto(string productoId, string nuevoEstado)
        //{
        //    try
        //    {
        //        if (string.IsNullOrEmpty(productoId))
        //        {
        //            return BadRequest("El ID del producto no puede estar vacío.");
        //        }

        //        var resultado = productoServices.MantenimientoProducto(
        //            productoId,
        //            null,
        //            null,
        //            DateTime.MinValue,
        //            null,
        //            null,
        //            null,
        //            null,
        //            nuevoEstado,
        //            null,
        //            "4"
        //        );

        //        return Ok(new { message = "Estado del producto modificado correctamente.", resultado });
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest("No se pudo modificar el estado del producto. Error: " + ex.Message);
        //    }
        //}

        //[HttpPut]
        //[Route("api/producto/modificar/estadoProducto/{productoId}")]
        //public IHttpActionResult ModificarEstadoProducto(string productoId)
        //{
        //    try
        //    {
        //        // Verificar si el productoId es nulo o vacío
        //        if (string.IsNullOrEmpty(productoId))
        //        {
        //            return BadRequest("El ID del producto no puede estar vacío.");
        //        }

        //        // Llamada al servicio con la acción '4' para modificar el estado
        //        var resultado = productoServices.MantenimientoProducto(
        //            productoId,
        //            null, // No es necesario enviar otros campos
        //            null,
        //            DateTime.MinValue, // No es necesario enviar la fecha de creación
        //            null,
        //            null,
        //            null,
        //            null,
        //            "Inactivo",
        //            null, // No es necesario subcategoría
        //            "4" // Acción para modificar solo el estado
        //        );

        //        return Ok(new { message = "Estado del producto modificado correctamente." });
        //    }
        //    catch (Exception ex)
        //    {
        //        // Captura cualquier excepción y retorna un mensaje de error
        //        return BadRequest("No se pudo modificar el estado del producto. Error: " + ex.Message);
        //    }
        //}
    }


    //[HttpPut]
    //[Route("api/producto/modificar/{productoId}")]
    //public IHttpActionResult ModificarProducto(string productoId, [FromBody] Producto producto)
    //{
    //    if (string.IsNullOrEmpty(productoId) || producto == null)
    //    {
    //        return BadRequest("ID del producto y datos válidos son requeridos.");
    //    }

    //    try
    //    {
    //        string resultado = productoServices.MantenimientoProducto(
    //            productoId,
    //            producto.productoNombre,
    //            producto.productoDescripcion,
    //            producto.productoFechaCreacion,
    //            producto.productoFormaFarmaceutica,
    //            producto.productoViaAdministracion,
    //            producto.productoCasaMedica,
    //            producto.productoImg,
    //            producto.productoSubCategoria,
    //            "2" // Acción 2 para modificar
    //        );
    //        return Ok(new { mensaje = resultado });
    //    }
    //    catch (Exception ex)
    //    {
    //        return InternalServerError(ex);
    //    }
    //}

    //[HttpDelete]
    //    [Route("api/producto/eliminar/{productoId}")]
    //    public IHttpActionResult EliminarProducto(string productoId)
    //    {
    //        if (string.IsNullOrEmpty(productoId))
    //        {
    //            return BadRequest("ID del producto es requerido.");
    //        }

    //        try
    //        {
    //            string resultado = productoServices.MantenimientoProducto(
    //                productoId,
    //                null,
    //                null,
    //                DateTime.MinValue,
    //                null,
    //                null,
    //                null,
    //                null,
    //                null,
    //                null,
    //                "3" // Acción 3 para eliminar
    //            );
    //            return Ok(new { mensaje = resultado });
    //        }
    //        catch (Exception ex)
    //        {
    //            return InternalServerError(ex);
    //        }
    //    }
    //}

    //[HttpPost]
    //[Route("api/productos/insertar")]
    //public async Task<IHttpActionResult> InsertarProducto()
    //{
    //    if (!Request.Content.IsMimeMultipartContent())
    //    {
    //        return BadRequest("Formato de solicitud no soportado.");
    //    }

    //    var provider = new MultipartMemoryStreamProvider();
    //    await Request.Content.ReadAsMultipartAsync(provider);

    //    Producto producto = null;
    //    string productoImgPath = null;

    //    try
    //    {
    //        foreach (var content in provider.Contents)
    //        {
    //            if (content.Headers.ContentDisposition.Name.Trim('\"') == "productoImg")
    //            {
    //                var fileName = content.Headers.ContentDisposition.FileName.Trim('\"');
    //                var buffer = await content.ReadAsByteArrayAsync();
    //                var uniqueFileName = $"{Guid.NewGuid()}_{fileName}";
    //                var uploadPath = HttpContext.Current.Server.MapPath("~/Uploads");

    //                if (!Directory.Exists(uploadPath))
    //                {
    //                    Directory.CreateDirectory(uploadPath);
    //                }

    //                var path = Path.Combine(uploadPath, uniqueFileName);
    //                File.WriteAllBytes(path, buffer);
    //                productoImgPath = "../Uploads/" + uniqueFileName;
    //            }
    //            else if (content.Headers.ContentDisposition.Name.Trim('\"') == "producto")
    //            {
    //                var jsonString = await content.ReadAsStringAsync();
    //                producto = JsonConvert.DeserializeObject<Producto>(jsonString);
    //            }
    //        }

    //        if (producto == null || string.IsNullOrWhiteSpace(producto.productoNombre))
    //        {
    //            return BadRequest("Datos del producto incompletos.");
    //        }

    //        producto.productoImg = productoImgPath;
    //        string resultado = productoServices.MantenimientoProducto(
    //            null,
    //            producto.productoNombre,
    //            producto.productoDescripcion,
    //            producto.productoFechaCreacion,
    //            producto.formaFarmaceuticaProductoId,
    //            producto.presentacionProductoId,
    //            producto.productoConcentracion,
    //            producto.viaAdministracionProductoId,
    //            producto.productoContenidoTotal,
    //            producto.productoMarca,
    //            producto.productoImg,
    //            producto.productoSubCategoria,
    //            "1"
    //        );

    //        if (!string.IsNullOrEmpty(resultado))
    //        {
    //            return Ok(new { success = true, message = "Producto agregado exitosamente." });
    //        }
    //        else
    //        {
    //            return BadRequest("No se pudo agregar el producto.");
    //        }
    //    }
    //    catch (Exception ex)
    //    {
    //        // Manejo de errores: podrías agregar un log de errores aquí
    //        return InternalServerError(new Exception("Ocurrió un error al procesar la solicitud: " + ex.Message));
    //    }
    //}



    //[HttpPost]
    //[Route("api/productos/insertar")]
    //public async Task<IHttpActionResult> InsertarProducto()
    //{
    //    // Verificar si la solicitud tiene archivos
    //    if (!Request.Content.IsMimeMultipartContent())
    //    {
    //        return BadRequest("Formato de solicitud no soportado.");
    //    }

    //    var provider = new MultipartMemoryStreamProvider();
    //    await Request.Content.ReadAsMultipartAsync(provider);

    //    // Variables para almacenar datos
    //    Producto producto = null;
    //    string productoImgPath = null;

    //    // Procesar cada parte de la solicitud
    //    foreach (var content in provider.Contents)
    //    {
    //        if (content.Headers.ContentDisposition.Name.Trim('\"') == "productoImg")
    //        {
    //            // Manejar el archivo de imagen
    //            var fileName = content.Headers.ContentDisposition.FileName.Trim('\"');
    //            var buffer = await content.ReadAsByteArrayAsync();

    //            // Generar un nombre único para la imagen
    //            var uniqueFileName = $"{fileName}";
    //            var path = Path.Combine(HttpContext.Current.Server.MapPath("~/Uploads"), uniqueFileName);

    //            // Guardar el archivo
    //            File.WriteAllBytes(path, buffer);
    //            productoImgPath = "../Uploads/" + uniqueFileName; // Guardar la ruta de la imagen
    //        }
    //        else if (content.Headers.ContentDisposition.Name.Trim('\"') == "producto")
    //        {
    //            // Leer los datos del producto
    //            var jsonString = await content.ReadAsStringAsync();
    //            producto = JsonConvert.DeserializeObject<Producto>(jsonString);
    //        }
    //    }

    //    // Verificar si se han proporcionado datos del producto
    //    if (producto == null || string.IsNullOrWhiteSpace(producto.productoNombre))
    //    {
    //        return Json(new { success = false, message = "Datos del producto incompletos." });
    //    }

    //    // Asignar la ruta de la imagen al producto
    //    producto.productoImg = productoImgPath;

    //    // Llamar al servicio para insertar el producto
    //    string resultado = productoServices.MantenimientoProducto(
    //        null,
    //        producto.productoNombre,
    //        producto.productoDescripcion,
    //        producto.productoFechaCreacion,
    //        producto.formaFarmaceuticaProductoId,
    //        producto.presentacionProductoId,
    //        producto.productoConcentracion,
    //        producto.viaAdministracionProductoId,
    //        producto.productoContenidoTotal,
    //        producto.productoMarca,
    //        producto.productoImg, 
    //        producto.productoSubCategoria,
    //        "1"
    //    );

    //    // Verificar el resultado de la operación
    //    if (!string.IsNullOrEmpty(resultado)) // Suponiendo que `resultado` devuelve un valor si es exitoso
    //    {
    //        return Json(new { success = true, message = "Producto agregado exitosamente." });
    //    }
    //    else
    //    {
    //        return Json(new { success = false, message = "No se pudo agregar el producto." });
    //    }


    //}


    //Método para manejar la inserción de un producto
    //[HttpPost]
    // [Route("api/productos/insertar")]
    // public IHttpActionResult InsertarProducto([FromBody] Producto producto)
    // {
    //     if (producto == null)
    //     {
    //         return BadRequest("Los datos del producto son requeridos.");
    //     }

    //     string resultado = productoServices.MantenimientoProducto(
    //         null,
    //         producto.productoNombre,
    //         producto.productoPresentacion,
    //         producto.productoCantidadMedida,
    //         producto.productoUnidadMedida,
    //         producto.productoImg,
    //         producto.productoDescripcion,
    //         producto.productoFechaCreacion,
    //         producto.productoSubCategoria,
    //         "1"
    //     );

    //     return Ok(resultado);
    // }

    // Método para manejar la actualización de un producto
    //[HttpPut]
    //[Route("api/productos/actualizar/{productoId}")]
    //public IHttpActionResult ActualizarProducto(string productoId, [FromBody] Producto producto)
    //{
    //    if (producto == null)
    //    {
    //        return BadRequest("Los datos del producto son requeridos.");
    //    }

    //    string resultado = productoServices.MantenimientoProducto(
    //        productoId,
    //        producto.productoNombre,
    //        producto.productoDescripcion,
    //        producto.productoFechaCreacion,
    //        producto.formaFarmaceuticaProductoId,
    //        producto.presentacionProductoId,
    //        producto.productoConcentracion,
    //        producto.viaAdministracionProductoId,
    //        producto.productoContenidoTotal,
    //        producto.productoMarca,
    //        producto.productoImg,
    //        producto.productoSubCategoria,
    //        "2"
    //    );

    //    return Ok(resultado);
    //}

    //// Método para manejar la eliminación de un producto
    //[HttpDelete]
    //[Route("api/productos/eliminar/{productoId}")]
    //public IHttpActionResult EliminarProducto(string productoId)
    //{
    //    string resultado = productoServices.MantenimientoProducto(
    //        productoId,
    //        null,
    //        null,
    //        null,
    //        null,
    //        null,
    //        null,
    //        null,
    //        null,
    //        null,
    //        null,
    //        null,
    //        "3"
    //    );

    //    return Ok(resultado);
    //}

}