import React from 'react';

const Stars = ({stars}) => {
    var starArr = [];
    for (var i = 0; i < stars; i++) {
        starArr.push(<span key={i}>&#9733;</span>);
    }
    for (var j = stars; j < 5; j++) {
        starArr.push(<span key={j}>&#9734;</span>)
    }
    
    return (
        <div>{starArr}</div>
    )
}

export default Stars;
