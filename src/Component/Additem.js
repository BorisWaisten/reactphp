import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddItem() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    image: '',
    price: '',
    description: '',
    title: ''
  });
  const [message, setMessage] = useState('');

  const handleInput = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      imagen: formValue.image,
      precio: formValue.price,
      descripcion: formValue.description,
      titulo: formValue.title,
    };

    try {
      const res = await fetch("http://localhost:80/proyectophp/index.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
        mode: 'cors', // Agrega esta línea
      });
      if (res.ok) {
        const data = await res.json();
        setMessage(data.status === 1 ? data.message : 'Error al añadir el ítem');
        if (data.status === 1) {
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      } else {
        console.error('Error de red:', res.statusText);
        setMessage('Error de red al enviar el formulario');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setMessage('Error de red al enviar el formulario');
    }
  };


  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-4">
            <h5 className="mb-4">Add Item</h5>
            <p className="text-success">{message}</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
                <label className="col-sm-2">Image</label>
                <div className="col-sm-10">
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
                <label className="col-sm-2">Price</label>
                <div className="col-sm-10">
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
                <label className="col-sm-2">Description</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="description"
                    value={formValue.description}
                    className="form-control"
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-2">Title</label>
                <div className="col-sm-10">
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
                <label className="col-sm-2"></label>
                <div className="col-sm-10">
                  <button type="submit" className="btn btn-success">
                    Submit
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
