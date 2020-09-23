import React from 'react';
import { API } from '../../backend';



const ImageHelper=({product})=>{
    const imageurl= product ? `${API}/product/photo/${product._id}` : `https://1m19tt3pztls474q6z46fnk9-wpengine.netdna-ssl.com/wp-content/themes/unbound/images/No-Image-Found-400x264.png`
    return (
        <div className="rounded border border-success p-2">
        <img
          src={imageurl}
          alt="photo"
          style={{ maxHeight: "100%", maxWidth: "100%" }}
          className="mb-3 rounded"
        />
      </div>
    )
}

export default ImageHelper;