import { gql } from '@apollo/client';
import Head from 'next/head'
import Banner from '../components/Banner';
import Footer from '../components/Footer'
import { client } from '../lib/apollo';

export default function SlugPage({ page }) {
  console.log(page);
  let sections = page.sections.sections
  console.log(sections);
  return (
    <div>
      <Head>
        <title>{page.title} - Headless WP Next Starter</title>
        <link rel="icon" href="favicon.ico"></link>
      </Head>

      <main>
      {
        sections.map((section, index) => {
            const typeName = section.__typename;
            switch(typeName){
            case 'Page_Sections_Sections_Banner':
                return <Banner {...section} key={index}/>
                
            default: 
            return ''
            
            }              
        })
      }
         
      </main>

      <Footer></Footer>

    </div>
  )
}


export async function getStaticProps({ params }){
  const GET_PAGES_BY_URI = gql`
  query GetAllPages($id: ID!) {
    page(idType: URI, id: $id) {
      title
      slug
      uri
      sections {
        sections {
          ... on Page_Sections_Sections_Banner {
            title
            content
            bannerSize
            image {
              mediaItemUrl
              mediaDetails {
                file
              }
            }
          }
        }
      }
    }
  }
  `
  const response = await client.query({
    query : GET_PAGES_BY_URI,
    variables: {
      id: params.uri
    }
  })
  const page = response?.data?.page
  return {
    props: {
      page
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

