import React from 'react'
import img from '../images/img-2.jpg';

function Image() {
  return (
    <div className='max-w-7xl px-10 m-auto pt-20'>
        <img src={img} alt='' className='w-full rounded-lg' />
    </div>
  )
}

export default Image