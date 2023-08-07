import React from 'react';
import { Paragraph } from '@contentful/f36-components';
import { DialogAppSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useAutoResizer, useSDK } from '@contentful/react-apps-toolkit';
import Playground from '../Playground';

const Dialog = () => {
    const sdk = useSDK<DialogAppSDK>();
    const { parameters } = sdk;
    // @ts-expect-error
    const { entryId, entryContentTypeId } = parameters.invocation;
    useAutoResizer();

    const queries = entryId && [
        {
            operationName: `${entryContentTypeId}`,
            query: `
        query ${entryContentTypeId}EntryQuery {
          ${entryContentTypeId}(id: "${entryId}"){
            sys {
              id
            }
            # add the fields you want to query
          }
        }
      `
        },
        {
            operationName: `${entryContentTypeId}Collection`,
            query: `
        query ${entryContentTypeId}CollectionQuery {
          ${entryContentTypeId}Collection {
            items {
              sys {
                id
              }
              # add the fields you want to query
            }
          }
        }
      `
        }
    ]

    return (
        <div style={{ height: '100vh' }}>
            <Playground queries={queries} />
        </div>
    );
};

export default Dialog;
