import { iArticles } from "../index"
import { Layout } from "../components/Layout"

export const Articles = (props: { title: string, detail: iArticles[] }) => {
    return (
        <Layout title={props.title}>
        <main>
            <h1>{props.title}</h1>
            <ul>
                {props.detail.map(({ title, url, id }) => (
                    <li id={id}>
                        <a href={url} target="_blank">{title}</a>
                    </li>
                ))}
            </ul>
        </main>
        </Layout>
    )
}
