import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Items</h2>
      <table className="table table-bordered table-striped" style={{ tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Descripcion</th>
            <th>Precio (dolares)</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems && currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.titulo}</td>
              <td style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.descripcion}</td>
              <td>{item.precio}</td>
              <td>
                <img src={item.imagen} alt={`Imagen de ${item.titulo}`} style={{ width: "100%", height: "auto", maxWidth: "150px", maxHeight: "150px" }} />
              </td>
              <td>
                <Link
                  to={{ pathname: `/edit/${item.id}`, state: { itemData: item } }}
                  className="btn btn-primary me-2"
                >
                  Editar
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center">
        {Array.from({ length: Math.ceil(items.length / itemsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className="btn btn-secondary me-2"
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;
