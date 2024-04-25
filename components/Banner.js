import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Banner = ({ title, content, image, button }) => {
  console.log(title, content, image);
  const myLoader = ({ src }) => {
    return `${image?.node?.mediaItemUrl}`;
  }
  return (
    <div className={`banner`}>
      <div className="banner-image">
        <Image
          loader={myLoader}
          src={`${image?.node?.mediaItemUrl}`}
          sizes={image?.node?.sizes}
          width={16}
          height={9}
        />
      </div>
      <div className="container">
        <div className="banner-content">
          <h1 className='banner-title' dangerouslySetInnerHTML={{ __html: title }}></h1>
          <p dangerouslySetInnerHTML={{ __html: content }}></p>
          {
            button &&
            <Link href={button?.url}>
              <button>
                {button.title}
                <svg width="24" height="11" viewBox="0 0 24 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.5H22.875" stroke="white" strokeLinecap="round" strokeLinejoin="round" /><path d="M18.5 1.125L22.875 5.5L18.5 9.875" stroke="white" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </Link>

          }
        </div>
      </div>
    </div>
  )
}

export default Banner