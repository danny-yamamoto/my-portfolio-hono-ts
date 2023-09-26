import { Layout } from '../components/Layout'
import { Footer } from './footer'

const Experience = () => (
  <h2><a class="fa-inverse" href={`/experience/`}>Experience</a></h2>
)

const Articles = () => (
  <h2><a class="fa-inverse" href={`/articles/`}>Top 20 Articles</a></h2>
)

const Certificates = () => (
  <h2><a class="fa-inverse" href={`/certificates/`}>Certificates</a></h2>
)

export const Top = () => {
  return (
    <Layout title={'Top'}>
      <main>
        <Experience />
        <Articles />
        <Certificates />
        <Footer title='Daisuke Yamamoto' />
      </main>
    </Layout>
  )
}
