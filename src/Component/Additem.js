import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddItem() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    image: "",
    price: "",
    description: "",
    title: "",
  });
  const [message, setMessage] = useState("");

  const handleInput = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos
    if (!formValue.image || !formValue.price || !formValue.title || !formValue.description) {
      setMessage("Todos los campos son obligatorios");
      return;
    }

    // Validar formato de URL de imagen
    const imageRegex = /\.(jpg|jpeg)$/;
    if (!imageRegex.test(formValue.image)) {
      setMessage("La URL de la imagen debe tener formato JPG o JPEG");
      return;
    }

    // Validar que el precio sea un número
    const price = parseFloat(formValue.price);
    if (isNaN(price)) {
      setMessage("El precio debe ser un número válido");
      return;
    }

    // Resto del código para enviar la solicitud
    try {
      const res = await fetch("http://localhost:80/proyectophp/index.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          imagen: formValue.image,
          precio: price,
          descripcion: formValue.description,
          titulo: formValue.title,
        }),
        mode: "cors", // Agrega esta línea
      });

      if (res.ok) {
        const data = await res.json();
        setMessage(data.status === 1 ? data.message : "Error al añadir el ítem");
        if (data.status === 1) {
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } else {
        console.error("Error de red:", res.statusText);
        setMessage("Error de red al enviar el formulario");
      }
    } catch (error) {
      console.error("Error de red:", error);
      setMessage("Error de red al enviar el formulario");
    }
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-4">
            <h5 className="mb-4">Agregar Item</h5>
            <p className="text-success">{message}</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Imagen(URL)</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="image"
                    value={formValue.image}
                    className="form-control"
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Precio(dolares)</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="price"
                    value={formValue.price}
                    className="form-control"
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Titulo</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="title"
                    value={formValue.title}
                    className="form-control"
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Descripcion</label>
                <div className="col-sm-8">
                  <textarea
                    name="description"
                    value={formValue.description}
                    className="form-control"
                    onChange={handleInput}
                    rows="4" // Ajusta la cantidad de filas según sea necesario
                    maxLength="250"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <div className="col-sm-4"></div>
                <div className="col-sm-8">
                  <button type="submit" className="btn btn-success">
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddItem;
