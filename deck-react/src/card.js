import React, {useState} from 'react';
import './card.css';

const Card = ({name, image}) => {
  // pass in the image and card and create angles for each click  
  const [{xDir, yDir, angle}] = useState({
      xDir: (Math.random() * 10) - 5,
      yDir: (Math.random() * 10) - 5,
      angle: (Math.random() * 90) - 45
  });
  // apply the transformation of angle and positioning   
  const transform = `translate(${xDir}px, ${yDir}px) rotate(${angle}deg)`;
  
  return (
      <img className='card'
            alt={name}
            src={image}
            style={{transform}} />
  );
}

export default Card;