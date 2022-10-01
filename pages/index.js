import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout, { siteTitle } from '../components/Layout'

import Link from "next/link"
import utilStyle from "../styles/utils.module.css"
import { getPostsData } from '../lib/post'

//SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData();
  console.log(allPostsData)

  return {
    props: {
      allPostsData, //これをHomeに渡す
    },
  };
}

// // SSRの場合
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // コンポーネントにわたすためのprops

//     }
//   }
// }



export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      
      <section className={utilStyle.headingMd}>
        <p>
          私はNextjsエンジニアです/Udemy講師として活動しています/好きなフレームワークはNext.jsです
        </p>
      </section>

      <section>
        <h2>エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`}
                  className={styles.thumbnailImage}
                />
              </Link>
              <Link href={`/posts/${id}`}>
                <a className={utilStyle.boldText}>
                  {title}
                </a>
              </Link>
              <br />
              <small className={utilStyle.lightText}>{date}</small>
            </article>
          ))}

        </div>
      </section>

    </Layout>
  )
}