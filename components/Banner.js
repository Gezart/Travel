import Image from 'next/image';
import React from 'react'

const Banner = ({title, content, image, bannerSize}) => {
    console.log(title, content, bannerSize);
    const myLoader=({src})=>{
        return `${process.env.NEXT_PUBLIC_WORDPRESS_API_NEXT}/wp-content/uploads/${image.mediaDetails.file}`;
      }
  return (
    <div className={`banner ${bannerSize}`}>
    <div className="banner-image">
        <Image 
            loader={myLoader}
            src={`${process.env.NEXT_PUBLIC_WORDPRESS_API_NEXT}/wp-content/uploads/${image.mediaDetails.file}`}
            // layout='responsive'
            width="100vw"
            height="100vh"
            />
    </div>
   <div className="banner-content">
      <h1>{title}</h1>
      <p dangerouslySetInnerHTML={{ __html: content }}></p>
   </div>
</div>
  )
}

export default Banner