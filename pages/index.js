import { gql } from '@apollo/client';
import Head from 'next/head'
import Banner from '../components/Banner';
import Layout from '../components/Layout';

import { client } from '../lib/apollo';
import AboutKosova from '../components/AboutKosova';
import MostVisitedPlaces from '../components/MostVisitedPlaces';

export default function Home({ page, menu }) {
  let sections = page.sections.sections
  console.log(sections);
  return (
    <>
      <Head>
        <title>{page?.title} - Travel</title>
        <link rel="icon" href="favicon.ico"></link>
      </Head>

      <main className='home page'>
        <Layout menu={menu}>

          {
            sections?.map((section, index) => {
              const typeName = section.__typename;
              switch (typeName) {
                case 'SectionsSectionsBannerLayout':
                  return <Banner {...section} key={index} />
                case 'SectionsSectionsAboutKosovaLayout':
                  return <AboutKosova {...section} key={index} />
                case 'SectionsSectionsMostVisitedPlacesLayout':
                  return <MostVisitedPlaces {...section} key={index} />

                default:
                  return ''

              }
            })
          }
        </Layout>

      </main>


    </>
  )
}


export async function getServerSideProps() {
  const HOME_QUERY = gql`
  query HOME_QUERY {
    menu(idType: SLUG, id: "main-menu") {
        menuItems {
          nodes {
            label
            uri
          }
        }
      }
    page(idType: URI, id: "home") {
      title
      slug
      uri
      sections {
        sections {
          ... on SectionsSectionsBannerLayout {
            title
            content
            button{
              title
              target
              url
            }
            image {
              node {
                mediaItemUrl
                sizes
              }
            }
          }
          ... on SectionsSectionsAboutKosovaLayout {
            content
            title
            button {
              title
              url
            }
            image {
              node {
                mediaItemUrl
                sizes
              }
            }
          }
          ... on SectionsSectionsMostVisitedPlacesLayout {
            content
            title
            places {
              places {
                edges {
                  node {
                    ... on Post {
                      id
                      uri
                      title
                      featuredImage {
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
          }
        }
      }
    }
  }
  `
  const response = await client.query({
    query: HOME_QUERY,
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

