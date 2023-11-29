import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateItem = (props) => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [isDescriptionEditable, setIsDescriptionEditable] = useState(true);
  const [editedData, setEditedData] = useState({
    id: id,
    titulo: "",
    descripcion: "",
    precio: 0,
    imagen: "",
  });

  const navigate = useNavigate();

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(`http://localhost:80/proyectophp/index.php/${id}`);
        const item = await data.json();

        setEditedData(item);

        console.log(item);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("No se proporcionó la información necesaria para editar el elemento");
      }
    };

    fetchData(); // Llama a la función asíncrona directamente
  }, [id, navigate]);

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:80/proyectophp/index.php`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });

      const result = await response.json();

      if (result) {
        setMessage("Item actualizado exitosamente");
      }

      // Redirige después de guardar, por ejemplo, a la página de inicio
      navigate("/");
    } catch (error) {
      setError("Error updating item:", error);
    }
  };

  const handleCancel = () => {
    // Redirige a la página de inicio cuando se cancela la edición
    navigate("/home");
  };

  const handleDescriptionChange = (e) => {
    const inputValue = e.target.value;
    setEditedData({ ...editedData, descripcion: inputValue });

    const remainingCharacters = 255 - inputValue.length;
    if (remainingCharacters < 20) {
      if (remainingCharacters < 0) {
        setMessage("No puedes añadir más caracteres");
      } else {
        setMessage(`Te quedan ${remainingCharacters} caracteres`);
      }
      setIsDescriptionEditable(false);
    } else {
      setMessage("");
      setIsDescriptionEditable(true);
    }
  };

  return (
    <div className="container mt-4">
      <h5 className="mb-4">Editar Item</h5>
      <p className="text-success">{message}</p>
      <form>
        {["titulo", "precio", "imagen"].map((property) => (
          <div key={property} className="mb-3 row">
            <label className="col-sm-2 col-form-label">{capitalizeFirstLetter(property)}</label>
            <div className="col-sm-10">
              <input
                type="text"
                value={editedData[property]}
                className="form-control"
                onChange={(e) => setEditedData({ ...editedData, [property]: e.target.value })}
              />
            </div>
          </div>
        ))}
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Descripcion</label>
          <div className="col-sm-10">
            <textarea
              value={editedData.descripcion}
              className="form-control"
              onChange={handleDescriptionChange}
              rows="4" // Puedes ajustar la cantidad de filas según tus necesidades
            />
            {message && <p className="text-danger">{message}</p>}
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col-sm-2"></div>
          <div className="col-sm-10">
            <button type="button" className="btn btn-secondary me-2" onClick={handleCancel}>
              Cancelar
            </button>
            <button type="button" className="btn btn-success" onClick={handleSave} disabled={!isDescriptionEditable}>
              Guardar
            </button>
          </div>
        </div>
        <div>
          {error && <p className="text-danger">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default UpdateItem;
