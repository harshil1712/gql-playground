import React from 'react';
import { Button, Note } from '@contentful/f36-components';
import { /* useCMA, */ useAutoResizer, useSDK } from '@contentful/react-apps-toolkit';
import { SidebarAppSDK } from '@contentful/app-sdk';

const Sidebar = () => {
  const sdk = useSDK<SidebarAppSDK>();
  const PREVIEW_TOKEN = sdk.parameters.installation.apiKey;
  useAutoResizer();
  const entrySys = sdk.entry.getSys();

  const openGQLPlayground = () => {
    console.log('clicked')
    sdk.dialogs.openCurrentApp({
      width: "fullWidth",
      minHeight: "900px",
      shouldCloseOnOverlayClick: true,
      shouldCloseOnEscapePress: true,
      parameters: {
        entryId: entrySys.id,
        entryContentTypeId: entrySys.contentType.sys.id
      },
    });
  }

  return PREVIEW_TOKEN ?
    (
      <Button onClick={openGQLPlayground} style={{ width: "100%" }}>
        Open GQL Playground
      </Button>
    ) :
    (
      <Note variant="warning">
        To use GraphQL playground. Please define the CPA installation parameter in
        your app configuration.
      </Note>
    );
};

export default Sidebar;
