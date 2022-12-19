import React from 'react';
import { Button, Note } from '@contentful/f36-components';
import { /* useCMA, */ useAutoResizer, useSDK } from '@contentful/react-apps-toolkit';

const Sidebar = () => {
  const sdk = useSDK();
  const PREVIEW_TOKEN = sdk.parameters.installation.apiKey;
  useAutoResizer();

  const openGQLPlayground = () =>
    sdk.dialogs.openCurrentApp({
      width: "fullWidth",
      minHeight: "900px",
      shouldCloseOnOverlayClick: true,
      shouldCloseOnEscapePress: true,
      parameters: {
        entry: sdk.entry.getSys(),
      },
    });

  return PREVIEW_TOKEN ? 
  (
    <Button onClick={openGQLPlayground} style={{ width: "100%" }}>
      Open GQL Playground
    </Button>
  ) : 
  (
    <Note noteType="warning">
      To use GraphQL playground. Please define the CPA installation parameter in
      your app configuration.
    </Note>
  );
};

export default Sidebar;
