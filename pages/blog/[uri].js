import { gql } from '@apollo/client';
import Head from 'next/head'
import Footer from '../../components/Footer'
import { client } from '../../lib/apollo';

export default function SlugPage({ post }) {

  return (
    <div>
      <Head>
        <title>Headless WP Next Starter</title>
        <link rel="icon" href="favicon.ico"></link>
      </Head>

      {/* <main> */}
          {/* <div className="siteHeader">
            <h1 className="title">
                {post.title}
            </h1>
          </div>
            <article dangerouslySetInnerHTML={{__html: post.content}}>   
            </article>
      </main> */}

      <Footer></Footer>

    </div>
  )
}


export async function getStaticProps({ params }){
  const GET_POSTS_BY_URI = gql`
    query NewQuery($id: ID!) {
      post(id: $id, idType: URI) {
        title
        content
        uri
        date
      }
    }
  `
  const response = await client.query({
    query : GET_POSTS_BY_URI,
    variables: {
      id: `/blog/${params.uri}`
    }
  })
  const post = response?.data?.post
  return {
    props: {
      post
    }
  }
}

export async function getStaticPaths(){
    const paths = []
    return {
        paths,
        fallback: 'blocking'
    }
}