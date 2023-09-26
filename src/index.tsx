import { Hono } from 'hono'
import { Top } from './pages/top'
import { Experience } from './pages/experience'
import { Articles } from './pages/articles'
import { Certificates } from './pages/certificates'
//import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Model
export type iExperience = {
  id: string;
  company: string;
  position: string;
}

export type iArticles = {
  title: string;
  url: string;
  id: string;
};

export type iCertificates = {
  blockchainId: string;
  title: string;
}

// Logic
const getExperience = () => {
  const experience: iExperience[] = [
    {
        id: '2022-09',
        company: 'Retail AI X Inc.',
        position: 'Lead Engineer',
    },
    {
        id: '2021-06',
        company: 'Retail AI X Inc.',
        position: 'Software Engineer',
    },
    {
        id: '2020-06',
        company: 'Retail AI Engineering Inc.',
        position: 'Software Engineer',
    }
  ]
  return experience;
}

const getArticles = async (count: number): Promise<iArticles[]> => {
  const response = await fetch(`https://qiita.com/api/v2/users/daisuke-yamamoto/items?page=1&per_page=${count}`);
  const qiitaItems: any[] = await response.json();
  const articles: iArticles[] = qiitaItems.map(item => ({
    title: item.title,
    url: item.url,
    id: item.id,
  }));
  return articles;
}

const getCertificates = () => {
  const certificates: iCertificates[] = [
    {
        blockchainId: '732838',
        title: 'Google Cloud Certified - Professional Cloud Developer',
    },
    {
        blockchainId: '672721',
        title: 'Google Cloud Certified - Professional Cloud Architect',
    }
  ];
  return certificates;
}

// Controller
app.get('/', (c) => {
  return c.html(<Top />)
})

app.get('/experience/', (c) => {
  const experience = getExperience()
  return c.html(<Experience title="Experience" detail={experience}/>)
})

app.get('/articles/', async (c) => {
  const articles = await getArticles(20)
  return c.html(<Articles title='Top 20 Articles' detail={articles} />)
})

app.get('/certificates/', (c) => {
  const certificates = getCertificates()
  return c.html(<Certificates title='Certificates' detail={certificates} />)
})

app.fire()
