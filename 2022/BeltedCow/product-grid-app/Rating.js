import * as React from 'react'

const Rating = ({numStars}) => {
    const iterator = [1,2,3,4,5]
    const stars = iterator.map(s => (
        <span className={`icon icon--${numStars >= s ? 'ratingFull' : 'ratingEmpty'}`} key={`star_${s}`}>
            <svg>
                <use xlinkHref="#icon-star" />
            </svg>
        </span>
    ))

    return (
        <p className="card-text" data-test-info-type="productRating">
            {stars}
        </p>
    ) 
}
export default Rating;