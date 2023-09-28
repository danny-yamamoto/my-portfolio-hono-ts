import { iArticles } from "../index"
import { Layout } from "../components/Layout"

export const Articles = (props: { title: string, detail: iArticles[] }) => {
    return (
        <Layout title={props.title}>
        <main>
            <h2>{props.title}</h2>
            <ul>
                {props.detail.map(({ title, url, id }) => (
                    <li id={id}>
                        <a style="font-size: 1rem; text-decoration: none;" class="fa-inverse" href={url} target="_blank">{title}</a>
                    </li>
                ))}
            </ul>
        </main>
        </Layout>
    )
}
