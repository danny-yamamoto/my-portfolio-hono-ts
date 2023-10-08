import { Hono } from 'hono'
import { Top } from './pages/top'
import { Experience } from './pages/experience'
import { Articles } from './pages/articles'
import { Certificates } from './pages/certificates'
import { Repositories } from './pages/repositories'
//import { serveStatic } from 'hono/cloudflare-workers'
// @ts-ignore
//import manifest from "__STATIC_CONTENT_MANIFEST";
import { KVNamespace } from '@cloudflare/workers-types'
import { IArticles, ICertificates, IRepositories, TNameObject } from './types'
import { getArticles } from './utils/articles.server'
import { getRepositories } from './utils/repositories.server'

export type Env = {
  GRAPHQL_API: string;
  GH_TOKEN: string;
  CERTIFICATES: KVNamespace;
  DB: D1Database;
};

const app = new Hono<{ Bindings: Env }>();

// Logic
const getExperience = async (env: Env) => {
  const { results } = await env.DB.prepare(
    "SELECT id,company,position FROM experience ORDER BY id DESC"
  )
  .all();
  return results
}

const getCertificates = async (env: Env) => {
  const certKeyList = await env.CERTIFICATES.list()
  const namesArray: TNameObject[] = certKeyList.keys;
  const certArray: ICertificates[] = []
  for (const name of namesArray) {
    const kvKeyObject: TNameObject = name
    const kvKey = kvKeyObject.name
    const certName = await env.CERTIFICATES.get(kvKey) as string
    const iCert:ICertificates = {blockchainId: kvKey, title: certName}
    certArray.push(iCert);
  }
  return certArray
}

// Controller
app.get('/', (c) => {
  return c.html(<Top />)
})

app.get('/experience/', async (c) => {
  const experience = await getExperience(c.env) as any
  return c.html(<Experience title='Return to top &gt;' heading="Experience" detail={experience}/>)
})

app.get('/articles/', async (c) => {
  const articles = await getArticles(20)
  return c.html(<Articles title='Return to top &gt;' heading='Top 20 Articles' detail={articles} />)
})

app.get('/certificates/', async (c) => {
  const certificates = await getCertificates(c.env) as any
  return c.html(<Certificates title='Return to top &gt;' heading='Certificates' detail={certificates} />)
})

app.get('/repositories/', async (c) => {
  const grapqlApiEndpoint: string = c.env!.GRAPHQL_API as string;
  const ghToken: string = c.env!.GH_TOKEN as string;
  const repositories = await getRepositories(grapqlApiEndpoint, ghToken)
  return c.html(<Repositories title='Return to top &gt;' heading='Repositories' detail={repositories}/>)
})

//app.get('/static/*', serveStatic({ root: './' }))
//app.get('/favicon.ico', serveStatic({ path: './favicon.ico' }))

// Module Workers Mode
export default app;
