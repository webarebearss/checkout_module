import React from 'react';

const Details = (props) => (
  <div className='checkout-details'>
    <div className='price'>${props.info.price} per night</div>
    <div className='reviews'>
      <span> Stars: {props.info.stars} Reviews: {props.info.reviews}</span>
    </div>
  </div>
)

export default Details;