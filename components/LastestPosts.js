import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const LastestPosts = ({ lastestPosts }) => {
    return (
        <div >
            <div className='lastest-posts-wrapper'>
                <h2 className='lastest-post-title'>Lastest Posts</h2>
                <div className="lastest-post">
                    {
                        lastestPosts && lastestPosts.map(post =>

                            <Link href={`/blog/${post?.uri}`}>
                                <div key={post?.id} className="item">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_WORDPRESS_API_NEXT}/wp-content/uploads/${post?.featuredImage?.node?.mediaDetails.file}`}
                                        sizes={post?.featuredImage?.node?.sizes}
                                        width="16"
                                        height="9"
                                    />
                                    <h3>{post?.title}</h3>
                                </div>
                            </Link>

                        )
                    }
                </div>
                <Link href={'/blog/'}>
                    <div className="link-all-blogs">
                        <span>View all Travel Blogs</span>
                        <svg width="46" height="16" viewBox="0 0 46 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 8H45" stroke="#C7C7C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M38 1L45 8L38 15" stroke="#C7C7C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default LastestPosts
