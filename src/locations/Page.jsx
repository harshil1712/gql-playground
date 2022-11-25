import React, {useState} from 'react';
import { Paragraph } from '@contentful/f36-components';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import { EditorContextProvider, GraphiQLProvider, QueryEditor, SchemaContextProvider, ResponseEditor, ExecuteButton, ExecutionContextProvider, VariableEditor, ToolbarMenu, ExplorerContextProvider, DocExplorer } from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.css';
import { useExplorerPlugin } from '@graphiql/plugin-explorer';

const Page = () => {
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
  return (
      <div style={{height: '100vh'}}>
        <GraphiQL 
          fetcher={fetcher} 
          query={query}
          onEditQuery={setQuery}
          plugins={[explorerPlugin]}
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
      </GraphiQL>
      </div>
  )
};

export default Page;
