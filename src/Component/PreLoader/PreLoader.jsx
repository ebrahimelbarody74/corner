import React from 'react';
import './PreLoader.css';
export default function PreLoader(props) {
  return (
    <div className='preloader'>
  <div id="js-preloader" class="js-preloader">
    <div class="preloader-inner">
      <span class="dot"></span>
      <div class="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
    </div>
  )
}
