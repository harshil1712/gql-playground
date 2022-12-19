import React, {useState} from 'react'
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.css';
import { useExplorerPlugin } from '@graphiql/plugin-explorer';
import { useSDK } from '@contentful/react-apps-toolkit';

const Playground = ({entry}) => {
    const sdk = useSDK();
    const spaceId = sdk.ids.space;
    const environmentId = sdk.ids.environment;
    const PREVIEW_TOKEN = sdk.parameters.installation.apiKey;

    const fetcher = createGraphiQLFetcher({
        url: `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/${environmentId}`,
        headers: {
            "Authorization": `Bearer ${PREVIEW_TOKEN}`
        }
    });
  
    const [query, setQuery] = useState('');
    const explorerPlugin = useExplorerPlugin({
        query,
        onEdit: setQuery,
    });

    // const tabs = entry ? [
    //     {
    //         query: `
    //             query ${entry.contentType.sys.id}EntryQuery {
    //                 ${entry.contentType.sys.id}(id: "${entry.id}") {
    //                     sys {
    //                         id
    //                     }
    //                     # add the fields you want to query
    //                 }
    //             }
    //         `
    //     },
    //     {
    //         query: `
    //         query ${entry.contentType.sys.id}CollectionQuery {
    //           ${entry.contentType.sys.id}Collection {
    //             items {
    //               sys {
    //                 id
    //               }
    //               # add the fields you want to query
    //             }
    //           }
    //         }`
    //     }
    // ] : [
    //     {
    //         query: `query {# add your query}`
    //     }
    // ]
    return(
        <GraphiQL 
          fetcher={fetcher} 
          onEditQuery={setQuery}
          query={query}
          plugins={[explorerPlugin]}
          // defaultTabs={tabs}
        >
          <GraphiQL.Logo>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                  <img
                    alt="Contentful logo"
                    src="https://www.contentful.com/developers/_assets/favicon.a6ca7af98a.png"
                    width="32"
                    height="32"
                    style={{ marginTop: '4px', marginRight: '0.5rem' }}
                  />
                </div>
                <div>
                  Contentful
                </div>
              </div>
          </GraphiQL.Logo>
      </GraphiQL>)
}

export default Playground