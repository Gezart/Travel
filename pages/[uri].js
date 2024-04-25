import { gql } from '@apollo/client';
import Head from 'next/head'
import Banner from '../components/Banner';
import Layout from '../components/Layout';

import { client } from '../lib/apollo';

export default function SlugPage({ page, menu }) {
  console.log(page);
  let sections = page.sections.sections
  console.log(sections);
  return (
    <div>
      <Head>
        <title>{page.title} - Travel</title>
        <link rel="icon" href="favicon.ico"></link>
      </Head>

      <main>
        <Layout menu={menu}>

          {
            sections.map((section, index) => {
              const typeName = section.__typename;
              switch (typeName) {
                case 'SectionsSectionsBannerLayout':
                  return <Banner {...section} key={index} />

                default:
                  return ''

              }
            })
          }
        </Layout>

      </main>


    </div>
  )
}


export async function getServerSideProps({ params }) {
  const GET_PAGES_BY_URI = gql`
  query GetAllPages($id: ID!) {
    menu(idType: SLUG, id: "main-menu") {
      menuItems {
        nodes {
          label
          uri
        }
      }
    }
    page(idType: URI, id: $id) {
      title
      slug
      uri
      sections {
        sections {
          ... on SectionsSectionsBannerLayout {
            title
            content
            image {
              node {
                mediaItemUrl
                sizes
              }
            }
          }
        }
      }
    }
  }
  `
  const response = await client.query({
    query: GET_PAGES_BY_URI,
    variables: {
      id: params.uri
    }
  })
  const page = response?.data?.page
  const menu = response?.data?.menu?.menuItems?.nodes
  return {
    props: {
      page,
      menu
    }
  }
}

