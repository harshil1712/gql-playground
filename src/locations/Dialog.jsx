import React from 'react';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import Playground from '../components/Playground';

const Dialog = () => {
  const sdk = useSDK();
  const { parameters } = sdk;
  const entry = parameters.invocation.entry;

  return <div style={{height: '100vh'}}>
  <Playground entry={entry} />
</div>;
};

export default Dialog;
