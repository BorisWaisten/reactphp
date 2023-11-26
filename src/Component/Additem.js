import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddItem() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    image: '',
    price: '',
    description: '',
    title: '',
    status: '', // Asumo que también quieres mantener el campo de estado
  });
  const [message, setMessage] = useState('');

  const handleInput = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      image: formValue.image,
      price: formValue.price,
      description: formValue.description,
      title: formValue.title,
      status: formValue.status,
    };
    const res = await axios.post("http://localhost/reactcrudphp/api/item.php", formData);

    if (res.data.success) {
      setMessage(res.data.success);
      setTimeout(() => {
        navigate('/itemlist');
      }, 2000);
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
                <label className="col-sm-2">Status</label>
                <div className="col-sm-10">
                  <select
                    name="status"
                    className="form-control"
                    value={formValue.status}
                    onChange={handleInput}
                  >
                    <option value="">--Select Status--</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-2"></label>
                <div className="col-sm-10">
                  <button name="submit" className="btn btn-success">
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
