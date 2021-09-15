import React from 'react'

//components
import Photo from './Photo'
import NotFound from './NotFound'



const PhotoContainer = (props) => {
    
    
    const result = props.data
    let pics;

    if (result.length > 0) {
        pics = result.map( pic => 
            <Photo url={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_w.jpg`} key={pic.id} />
        )

    } else {
        return (
            <NotFound />
        )
    }

    return (
    <div className="photo-container">
        <h2>{props.tag}</h2>
        <ul>
            {pics}
        </ul>
    </div>
    )
    
}


export default PhotoContainer;
