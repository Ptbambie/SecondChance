import React, { useEffect, useState } from 'react';
import { SlArrowDown } from 'react-icons/sl';
import './category-form.css';

const CategoryForm = () => {
  const url = process.env.REACT_APP_BACKEND_URL;

  const [brands, setBrands] = useState([]);
  const [brandList, setBrandList] = useState(false);

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

  const handleSetBrand = (e) => {
    setBrandList(!brandList);
  };

  console.log(brands);

  return (
    <div className='category-form-container'>
      <h2>1/3</h2>
      <h3>Remplissez les champs ci-dessous pour évaluer le smartphone:</h3>
      <form className='category-form'>
        <label htmlFor='brand' required>
          Marque:
          <ul className='dropdown'>
            <div className='default-value' onClick={handleSetBrand}>
              <li value=''>
                --- Choisissez une marque ---
                <SlArrowDown className='arrow-dropdown' />
              </li>
            </div>
            {brands.length > 0 && brandList && (
              <div className='brand-list'>
                {brands.map((brand) => (
                  <li key={`${brand.id}-${brand.name}`} value={`${brand.name}`}>
                    {brand.name}
                  </li>
                ))}
              </div>
            )}
          </ul>
        </label>
        <label htmlFor='brand' required>
          Marque:
          <ul className='dropdown'>
            <div className='default-value' onClick={handleSetBrand}>
              <li value=''>
                --- Choisissez une marque ---
                <SlArrowDown className='arrow-dropdown' />
              </li>
            </div>
            {brands.length > 0 && brandList && (
              <div className='brand-list'>
                {brands.map((brand) => (
                  <li key={`${brand.id}-${brand.name}`} value={`${brand.name}`}>
                    {brand.name}
                  </li>
                ))}
              </div>
            )}
          </ul>
        </label>
      </form>
    </div>
  );
};

export default CategoryForm;
