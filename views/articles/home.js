import React from 'react';
import './blog.css';

const Header = () => 
(
  <header className='home-header'>
    <h2>Adopet's</h2>
    <h1>
      <span>“</span> Blog Column <span>”</span>
    </h1>
    <p>
       An awesome place to share <br /> memories of your<br /> PAW-some pet
      
    </p>
    <h1>Add  Yours Too   
      <button className='button'>+</button>
    </h1>
  </header>
);

export default Header;