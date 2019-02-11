import React from 'react';

const Header = (props) => (
  <div className='header'>
    <div><span className="price">${props.info.nightlyPrice}</span> per night</div>
    <div className='reviews'>
      <span> Stars: {props.info.stars} Reviews: {props.info.reviews}</span>
    </div>
  </div>
)

export default Header;