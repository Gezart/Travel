import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const MostVisitedPlaces = ({ title, content, places }) => {
    console.log('log from mvp', places[0]?.places);
    return (
        <div className='container'>
            <div className="mvp">
                {
                    title && <h2 className='section-title'>{title}</h2>
                }
                {
                    content && <p className='description'>{content}</p>
                }
                <div className="places">
                    {
                        places &&
                        places.map(place =>
                            <Link href={`blog/${place?.places?.edges[0]?.node?.uri}`}>
                                <div key={place?.places?.edges[0]?.node?.id} className="place">
                                    <Image
                                        src={place?.places?.edges[0].node?.featuredImage.node?.mediaItemUrl}
                                        sizes={place?.places?.edges[0]?.node?.sizes}
                                        width={404}
                                        height={500}
                                    />
                                    <h3>{place?.places?.edges[0]?.node?.title}</h3>
                                </div>
                            </Link>
                        )
                    }
                </div>
                <Link href="/blog">
                    <button className='view-more'>
                        View more
                        <svg width="24" height="11" viewBox="0 0 24 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.5H22.875" stroke="white" strokeLinecap="round" strokeLinejoin="round" /><path d="M18.5 1.125L22.875 5.5L18.5 9.875" stroke="white" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default MostVisitedPlaces