import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UpdateItem from "./UpdateItem";

function Home() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:80/proyectophp/index.php");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Definimos handleSaveEdit como una función global
  window.handleSaveEdit = async () => {
    try {
      // Lógica de actualización aquí
      console.log("Item actualizado correctamente");

      // Actualiza la lista después de la edición
      fetchData();
      setEditingItem(null);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:80/proyectophp/index.php/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      console.log(result);

      // Actualiza la lista después de la eliminación
      fetchData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const tableCellStyle = {
    padding: '8px',
    textAlign: 'left',
  };

  return (
    <React.Fragment>
      <div style={{ textAlign: 'center' }}>
        <h2>Items</h2>
        <table style={{ margin: 'auto', width: '80%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd' }}>
              <th style={tableCellStyle}>Titulo</th>
              <th style={tableCellStyle}>Descripcion</th>
              <th style={tableCellStyle}>Precio (dolares)</th>
              <th style={tableCellStyle}>Imagen</th>
              <th style={tableCellStyle}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items && items.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={tableCellStyle}>{item.titulo}</td>
                <td style={tableCellStyle}>{item.descripcion}</td>
                <td style={tableCellStyle}>{item.precio}</td>
                <td style={tableCellStyle}>
                  <img src={item.imagen} alt={`Imagen de ${item.titulo}`} style={{ maxWidth: "150px", maxHeight: "150px" }} />
                </td>
                <td style={tableCellStyle}>
                  <Link
                    to={{
                      pathname: `/edit/${item.id}`,
                      state: { itemData: item },
                    }}
                    style={{ marginRight: "20px", border: "1px solid #ccc", borderRadius: "5px", padding: "5px 10px" }}
                  >
                    Editar
                  </Link>
                  <button
                    style={{ marginRight: "20px", border: "1px solid #ccc", borderRadius: "5px", padding: "5px 10px" }}
                    onClick={() => handleDelete(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingItem && <UpdateItem onCancel={handleCancelEdit} />}
    </React.Fragment>
  );
}

export default Home;
