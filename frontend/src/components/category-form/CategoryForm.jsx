import React, { useEffect, useState } from 'react';
import './category-form.css';

const CategoryForm = () => {
  const url = process.env.REACT_APP_BACKEND_URL;

  const [brands, setBrands] = useState([]);

  const [infos, setInfos] = useState({
    brand: '',
    ram: '',
    camera: '',
    stockage: '',
    network: '',
    charger: '',
  });

  useEffect(() => {
    fetch(`${url}/api/brands`)
      .then((res) => res.json())
      .then((data) => setBrands(data));
  }, []);

  console.log(brands);

  return (
    <div className='category-form-container'>
      <h2>1/3</h2>
      <h3>Remplissez les champs ci-dessous pour évaluer le smartphone:</h3>
      <form className='category-form'>
        <label htmlFor='brand' required>
          Marque:
          <select className='dropdown'>
            <option value=''>--- Choisissez une marque ---</option>
            {brands.length > 0 &&
              brands.map((brand) => (
                <option
                  key={`${brand.id}-${brand.name}`}
                  value={`${brand.name}`}
                >
                  {brand.name}
                </option>
              ))}
          </select>
        </label>
      </form>
    </div>
  );
};

export default CategoryForm;
