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

export type Env = {
  GRAPHQL_API: string;
  GH_TOKEN: string;
  CERTIFICATES: KVNamespace;
  DB: D1Database;
};

const app = new Hono<{ Bindings: Env }>();

// Model
export type Viewer = {
  data: {
      viewer: {
          repositories: {
              nodes: IRepositories[];
          }
      }
  }
}

// Logic
const getExperience = async (env: Env) => {
  const { results } = await env.DB.prepare(
    "SELECT * FROM experience ORDER BY id DESC"
  )
  .all();
  return results
}

const getArticles = async (count: number): Promise<IArticles[]> => {
  const response = await fetch(`https://qiita.com/api/v2/users/daisuke-yamamoto/items?page=1&per_page=${count}`);
  const qiitaItems: any[] = await response.json();
  const articles: IArticles[] = qiitaItems.map(item => ({
    title: item.title,
    url: item.url,
    id: item.id,
  }));
  return articles;
}

const getRepositories = async (ghEndpoint: string, ghToken: string): Promise<IRepositories[]> => {
  // Repositories created by you
  const queryData = {
    query: `
    query {
        viewer {
          repositories(first: 10, ownerAffiliations: OWNER) {
            nodes {
              name
              description
              url
            }
          }
        }
      }
    `
  };

  // User-Agent can be anything.
  const response = await fetch(ghEndpoint, {
      body: JSON.stringify(queryData),
      headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ghToken}`,
          'User-Agent': 'MyCustomUserAgent' 
      },
      method: "POST",
  });
  if (!response.ok) {
    console.log("GitHub API responded with status: " + response.status)
    return []
  }
  const viewerData:Viewer  = await response.json();
  const repositories: IRepositories[] = viewerData.data.viewer.repositories.nodes;
  return repositories;
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
  //await c.env.CERTIFICATES.put("672721", "Google Cloud Certified - Professional Cloud Architect")
  const certKeyList = await c.env.CERTIFICATES.list()
  const namesArray: TNameObject[] = certKeyList.keys;
  const certArray: ICertificates[] = []
  for (const name of namesArray) {
    const kvKeyObject: TNameObject = name
    const kvKey = kvKeyObject.name
    const certName = await c.env.CERTIFICATES.get(kvKey) as string
    const iCert:ICertificates = {blockchainId: kvKey, title: certName}
    certArray.push(iCert);
  }
  return c.html(<Certificates title='Return to top &gt;' heading='Certificates' detail={certArray} />)
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
