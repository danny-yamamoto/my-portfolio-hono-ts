import { iRepositories } from ".."
import { Layout } from "../components/Layout"

export const Repositories = (props: { title: string, detail: iRepositories[] }) => {
    return (
        <Layout title={props.title}>
        <main>
            <h2 class="fa-inverse">{props.title}</h2>
            {props.detail && props.detail.map(({ name, description, url }) => (
                <div id={name} style="grid-template-columns: repeat(1, 1fr); gap: 15px;">
                    <h3>{name}</h3>
                    <p  class="fa-xs">{description}</p>
                    <a href={url} target="_blank">View on GitHub</a>
                </div>
            ))}
        </main>
        </Layout>
    )
}
