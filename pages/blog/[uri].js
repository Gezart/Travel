import { gql } from '@apollo/client';
import Head from 'next/head'
import { client } from '../../lib/apollo';
import Image from 'next/image';
import Layout from '../../components/Layout';
import LastestPosts from '../../components/LastestPosts';

export default function SlugPage({ post, menu, lastestPosts }) {
  console.log(lastestPosts);
  const myLoader = ({ src }) => {
    return `${process.env.NEXT_PUBLIC_WORDPRESS_API_NEXT}/wp-content/uploads/${post?.featuredImage?.node?.mediaDetails.file}`;
  }
  return (
    <div>
      <Head>
        <title>{post?.title}</title>
        <link rel="icon" href="favicon.ico"></link>
      </Head>

      <main>
        <Layout menu={menu}>
          <div className="container">
            <div className="blog-wrapper">
              <div className="blog-content">
                <h1 className="blog-title">
                  {post?.title}
                </h1>
                <Image
                  loader={myLoader}
                  src={`${process.env.NEXT_PUBLIC_WORDPRESS_API_NEXT}/wp-content/uploads/${post?.featuredImage?.node?.mediaDetails.file}`}
                  sizes={post?.featuredImage?.node?.sizes}
                  width="16"
                  height="9"
                />

                <article dangerouslySetInnerHTML={{ __html: post?.content }}>
                </article>
              </div>
              <LastestPosts lastestPosts={lastestPosts} />
            </div>
          </div>
        </Layout>
      </main>

    </div>
  )
}


export async function getServerSideProps({ params }) {
  const GET_POSTS_BY_URI = gql`
    query NewQuery($id: ID!) {
      menu(idType: SLUG, id: "main-menu") {
        menuItems {
          nodes {
            label
            uri
          }
        }
      }
      posts(first: 5){
        nodes{
          id
          title
          uri
          featuredImage{
            node{
              sizes
              mediaDetails{
                file
              }
            }
          }
        }
      }
      post(id: $id, idType: URI) {
        title
        content
        uri
        date
        featuredImage{
          node{
            sizes
            mediaDetails {
              file
            }
          }
        }
      }
    }
  `
  const response = await client.query({
    query: GET_POSTS_BY_URI,
    variables: {
      id: `/blog/${params.uri}`
    }
  })
  const post = response?.data?.post
  const lastestPosts = response?.data?.posts?.nodes
  const menu = response?.data?.menu?.menuItems?.nodes
  return {
    props: {
      post,
      menu,
      lastestPosts
    }
  }
}
