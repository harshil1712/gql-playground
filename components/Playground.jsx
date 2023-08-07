import React, { useState } from 'react'
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.css';
import { explorerPlugin } from '@graphiql/plugin-explorer';
import { useSDK } from '@contentful/react-apps-toolkit';

const Playground = ({ queries }) => {
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
    const [query, setQuery] = useState();
    const [tabQueries] = useState(queries)

    // const explorerPlugin = useExplorerPlugin({
    //     query,
    //     onEdit: setQuery,
    // });
    const explorer = explorerPlugin({
        showAttribution: false
    });

    function onTabChange(tabsState) {
        const activeTab = tabsState.tabs[tabsState.activeTabIndex]
        setQuery(activeTab.query)
    }

    return (
        <GraphiQL
            fetcher={fetcher}
            onEditQuery={setQuery}
            query={query}
            plugins={[explorer]}
            onTabChange={onTabChange}
            defaultTabs={tabQueries}
            storage={null}
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