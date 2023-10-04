import { iRepositories } from ".."
import { Layout } from "../components/Layout"

export const Repositories = (props: { title: string, heading: string, detail: iRepositories[] }) => {
    return (
        <Layout title={props.title}>
        <main>
            <h2 class="fa-inverse">{props.heading}</h2>
            {props.detail && props.detail.map(({ name, description, url }) => (
                <div id={name} style="padding-left: 25px; background-color: rgba(29, 32, 35, 1); border-radius: 8px; font-size: 12px;margin-bottom: 5px; padding: 0.5rem;">
                    <span>{name}</span>
                    <p  class="fa-xs">{description}</p>
                    <a style="text-decoration: inherit; border-bottom-width: 1px; color: #fff;" href={url} target="_blank">View on GitHub</a>
                </div>
            ))}
        </main>
        </Layout>
    )
}
