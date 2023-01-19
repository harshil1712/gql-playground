import React from 'react';
import { /* useCMA, */ useAutoResizer, useSDK } from '@contentful/react-apps-toolkit';
import Playground from '../components/Playground';

const Dialog = () => {
  const sdk = useSDK();
  const { parameters } = sdk;
  const entry = parameters.invocation.entry;
  useAutoResizer();
  
  const queries = entry && [
    {
      operationName: `${entry.contentType.sys.id}`,
      query: `
        query ${entry.contentType.sys.id}EntryQuery {
          ${entry.contentType.sys.id}(id: "${entry.id}"){
            sys {
              id
            }
            # add the fields you want to query
          }
        }
      `
    },
    {
      operationName: `${entry.contentType.sys.id}Collection`,
      query: `
        query ${entry.contentType.sys.id}CollectionQuery {
          ${entry.contentType.sys.id}Collection {
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

  return <div style={{height: '100vh'}}>
  <Playground queries={queries} />
</div>;
};

export default Dialog;
