import { iCertificates } from ".."
import { Layout } from "../components/Layout"

export const Certificates = (props: { title: string, detail: iCertificates[] }) => {
    return (
        <Layout title={props.title}>
        <main>
            <h2 class="fa-inverse">{props.title}</h2>
            <ul>
                {props.detail.map(({ blockchainId, title }) => (
                    <li id={blockchainId}>{title}</li>
                ))}
            </ul>
        </main>
        </Layout>
    )
}
