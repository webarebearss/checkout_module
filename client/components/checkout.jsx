import React from 'react';

const Form = (props) => (
  <div className='checkout-form'>
    <div className='price'>${props.info.price} per night</div>
    <div className='reviews'>
      <span> Stars: {props.info.stars} Reviews: {props.info.reviews}</span>
    </div>
  </div>
)

export default Form;