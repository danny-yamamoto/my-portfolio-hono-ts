import { Layout } from '../components/Layout'
import { Footer } from './footer'

const Experience = () => (
  <div>
    <h2><a style="background-color: rgba(29, 32, 35, 1); padding-top: 14px; padding-bottom: 14px; padding-left: 25px; padding-right: 25px; border-radius: 8px; font-weight: 500; font-size: 16px; text-decoration: none;" class="fa-inverse" href={`/experience/`}>Experience</a></h2>
  </div>
  )

const Articles = () => (
  <div>
    <h2><a style="background-color: rgba(29, 32, 35, 1); padding-top: 14px; padding-bottom: 14px; padding-left: 25px; padding-right: 25px; border-radius: 8px; font-weight: 500; font-size: 16px; text-decoration: none;" class="fa-inverse" href={`/articles/`}>Top 20 Articles</a></h2>
    <p class="fa-xs">The submitted articles will be displayed in order of the date of submission, starting with the most recent.</p>
  </div>
)

const Certificates = () => (
  <h2><a style="background-color: rgba(29, 32, 35, 1); padding-top: 14px; padding-bottom: 14px; padding-left: 25px; padding-right: 25px; border-radius: 8px; font-weight: 500; font-size: 16px; text-decoration: none;" class="fa-inverse" href={`/certificates/`}>Certificates</a></h2>
)

const Repositories = () => (
  <div>
    <h2><a style="background-color: rgba(29, 32, 35, 1); padding-top: 14px; padding-bottom: 14px; padding-left: 25px; padding-right: 25px; border-radius: 8px; font-weight: 500; font-size: 16px; text-decoration: none;" class="fa-inverse" href={`/repositories/`}>Repositories</a></h2>
    <p class="fa-xs">They are listed from the repository (one project) submitted to GitHub, starting from the top.</p>
  </div>
)

export const Top = () => {
  return (
    <Layout title={'Welcome to my portfolio'}>
      <main>
        <Experience />
        <Articles />
        <Certificates />
        <Repositories />
        <Footer title='Daisuke Yamamoto' />
      </main>
    </Layout>
  )
}
