import React from 'react';

const Stars = ({stars}) => {
    var starArr = [];
    var remainder = stars % 1;
    
    for (var i = 0; i < Math.floor(stars); i++) {
        starArr.push(<span key={i}><i className="fas fa-star"></i></span>);
    }
    
    if (remainder > 0.75) {
        starArr.push(<span key={Math.floor(stars)}><i className="fas fa-star"></i></span>);
        stars++;
    } else if (remainder >= 0.25 && remainder <= 0.75) {
        starArr.push(<span key={Math.floor(stars)}><i className="fas fa-star-half-alt"></i></span>);
        stars++;
    }   

    for (var j = Math.floor(stars); j < 5; j++) {
        starArr.push(<span key={j}><i className="far fa-star"></i></span>)
    }
    
    return (
        <div>{starArr}</div>
    )
}

export default Stars;
