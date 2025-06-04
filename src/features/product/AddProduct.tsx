import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { addProduct } from './ProductSlice';
import './AddProduct.css';
import { useNavigate } from 'react-router-dom';

const AddProduct: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState({
    name: '',
    brand:'',
    color:'',
    desc: '',
    price: '',
    cat: '',
    pimg:''
  });
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigateToHome = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (file) formData.append('pimg', file);
    dispatch(addProduct(formData));
    setForm({ name: '', brand:'',desc: '', price: '', cat: '', color:'' ,pimg:''});
    setFile(null);
    alert("Product added successfully");
    navigateToHome("/");
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <input name="name" placeholder="Name" onChange={handleChange} />
      <textarea name="desc" placeholder="Description" onChange={handleChange} />
      <input name="price" type="string" placeholder="Price" onChange={handleChange} />
      <input name="cat" placeholder="Category" onChange={handleChange} />
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;