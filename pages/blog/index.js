import Head from 'next/head';
import PostCard from '../../components/PostCard';
import { client } from '../../lib/apollo';
import { gql } from '@apollo/client';
import Layout from '../../components/Layout';

export default function Blog({ posts, menu }) {
  return (
    <>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="favicon.ico"></link>
      </Head>

      <main className="blog-page">
        <Layout menu={menu}>
          <div className="container blog-wrapper">
            <div className="blogs">
              {
                posts.map((post) => {
                  return (
                    <PostCard key={post.uri} post={post}></PostCard>
                  )
                })
              }
            </div>
            <div className="blog-marekting">
              Here we set marketing posts
            </div>
          </div>
        </Layout>
      </main>

    </>
  )
}

export async function getServerSideProps() {

  const GET_POSTS = gql`
  query GetAllPosts {
    menu(idType: SLUG, id: "main-menu") {
      menuItems {
        nodes {
          label
          uri
        }
      }
    }
    posts {
      nodes {
        title
        content
        uri
        featuredImage {
          node {
            sizes
            mediaDetails {
              file
            }
          }
        }
      }
    }
  }
  `
  const response = await client.query({
    query: GET_POSTS
  })
  const posts = response?.data?.posts?.nodes
  const menu = response?.data?.menu?.menuItems?.nodes
  return {
    props: {
      posts,
      menu
    }
  }
}
