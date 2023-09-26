import { iExperience } from "../index"
import { Layout } from "../components/Layout"

export const Experience = (props: { title: string, detail: iExperience[] }) => {
    return (
        <Layout title={props.title}>
        <main>
            <h2 class="fa-inverse">{props.title}</h2>
            <ul>
                {props.detail.map(({ id, company, position }) => (
                    <li id={id}>{id}: {position} @ {company}</li>
                ))}
            </ul>
        </main>
        </Layout>
    )
}
