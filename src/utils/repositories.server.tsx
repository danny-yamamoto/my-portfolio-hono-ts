import { IRepositories } from "../types";

export type Viewer = {
    data: {
        viewer: {
            repositories: {
                nodes: IRepositories[];
            }
        }
    }
}

export async function getRepositories(ghEndpoint: string, ghToken: string): Promise<IRepositories[]> {
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
