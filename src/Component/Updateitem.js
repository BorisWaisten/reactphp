import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const UpdateItem = ({ onCancel }) => {
  const location = useLocation();
  const item = location.state?.itemData || {};

  const [editedData, setEditedData] = useState({
    id: item.id ,
    titulo: item.titulo ,
    descripcion: item.descripcion ,
    precio: item.precio ,
    imagen: item.imagen 
  });

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:80/proyectophp/index.php/${editedData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });
      const result = await response.json();
      console.log(result);

      // Llama directamente a la función handleSaveEdit del componente padre
      window.handleSaveEdit && window.handleSaveEdit();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Editar Item</h2>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
          <label style={{ marginRight: '10px' }}>Titulo:</label>
          <input type="text" value={editedData.titulo} onChange={(e) => setEditedData({ ...editedData, titulo: e.target.value })} />
        </div>
        <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
          <label style={{ marginRight: '10px' }}>Descripcion:</label>
          <input type="text" value={editedData.descripcion} onChange={(e) => setEditedData({ ...editedData, descripcion: e.target.value })} />
        </div>
        <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
          <label style={{ marginRight: '10px' }}>Precio:</label>
          <input type="text" value={editedData.precio} onChange={(e) => setEditedData({ ...editedData, precio: e.target.value })} />
        </div>
        {/* Añade más campos según sea necesario */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
          <button type="button" style={{ marginRight: "20px", border: "1px solid #ccc", borderRadius: "5px", padding: "5px 10px" }}
            onClick={handleCancel}>
            Cancelar
          </button>
          <button type="button" style={{ marginRight: "20px", border: "1px solid #ccc", borderRadius: "5px", padding: "5px 10px" }}
            onClick={handleSave}>
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateItem;
