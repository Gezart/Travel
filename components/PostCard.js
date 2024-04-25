import Image from "next/image"
import Link from "next/link"

export default function PostCard({ post }) {
    const myLoader = ({ src }) => {
        return `${process.env.NEXT_PUBLIC_WORDPRESS_API_NEXT}/wp-content/uploads/${post?.featuredImage?.node?.mediaDetails.file}`;
    }

    const truncateText = (text, wordLimit) => {
        const words = text.split(/\s+/);
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + "...";
        }
        return text;
    };

    const description = post?.content ? truncateText(post.content, 25) : '';

    return (
        <div className="post-card">
            <div className="post-image">
                <Link href={`blog/${post?.uri}`}>
                    <Image
                        loader={myLoader}
                        src={`${process.env.NEXT_PUBLIC_WORDPRESS_API_NEXT}/wp-content/uploads/${post?.featuredImage?.node?.mediaDetails.file}`}
                        sizes={post?.featuredImage?.node?.sizes}
                        width="300px"
                        height="250px"
                    />
                </Link>
            </div>
            <div className="post-content">
                <Link href={`blog/${post?.uri}`} className={"card"}>
                    <h3>{post?.title}</h3>
                </Link>


                <div className="description" dangerouslySetInnerHTML={{ __html: description }}></div>
                    <Link href={`blog/${post?.uri}`}>
                <div className="read-more">
                            Know more
                            <svg width="29" height="16" viewBox="0 0 29 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 8H28" stroke="#C7C7C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M21 1L28 8L21 15" stroke="#C7C7C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                    </Link>
            </div>
        </div>
    )
}