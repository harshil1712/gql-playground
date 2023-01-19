import React, { useCallback, useState, useEffect } from 'react';
import { Card, TextField, TextLink, Paragraph, Note, Tabs, Tab, Form, Flex, FormControl, TextInput } from '@contentful/f36-components';
import { css } from 'emotion';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';

const ConfigScreen = () => {
  const [parameters, setParameters] = useState({});
  const sdk = useSDK();
  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
  */
  // const cma = useCMA();
  const onConfigure = useCallback(async () => {
    // This method will be called when a user clicks on "Install"
    // or "Save" in the configuration screen.
    // for more details see https://www.contentful.com/developers/docs/extensibility/ui-extensions/sdk-reference/#register-an-app-configuration-hook

    // Get current the state of EditorInterface and other entities
    // related to this app installation
    const currentState = await sdk.app.getCurrentState();
    return {
      // Parameters to be persisted as the app configuration.
      parameters,
      // In case you don't want to submit any update to app
      // locations, you can just pass the currentState as is
      targetState: currentState,
    };
  }, [parameters, sdk]);

  useEffect(() => {
    // `onConfigure` allows to configure a callback to be
    // invoked when a user attempts to install the app or update
    // its configuration.
    sdk.app.onConfigure(() => onConfigure());
  }, [sdk, onConfigure]);

  useEffect(() => {
    (async () => {
      // Get current parameters of the app.
      // If the app is not installed yet, `parameters` will be `null`.
      const currentParameters = await sdk.app.getParameters();
      if (currentParameters) {
        setParameters(currentParameters);
      }
      // Once preparation has finished, call `setReady` to hide
      // the loading screen and present the app to a user.
      sdk.app.setReady();
    })();
  }, [sdk]);

  return (
    <Card style={{ maxWidth: "38em", margin: "3em auto" }}>
    <Tabs defaultTab='configuration'>
      <Tabs.List>
      <Tabs.Tab panelId="configuration">Configuration</Tabs.Tab>
      <Tabs.Tab panelId="sidebar">Sidebar</Tabs.Tab>
      <Tabs.Tab panelId="feedback">Feedback</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel id='configuration' style={{padding: '1em'}}>
      <Paragraph>
          The GraphQL Playground app enables developers and content creators to write GraphQL queries right next to their content.
        </Paragraph>
        <Form>
          <Paragraph style={{ marginTop: "1em" }}>
            <TextLink
              href={`https://app.contentful.com/spaces/${sdk.ids.space}/api/keys`}
              target="_blank"
              rel="noopener"
            >
              Create a new pair of API keys
            </TextLink>{" "}
            and save the Content Preview API token below:
          </Paragraph>
          <TextInput
          value={parameters.apiKey}
          type='text'
          onChange={(e) => setParameters({...parameters, apiKey:e.target.value})}
        />
        <Note style={{marginTop:"1em"}}>
            The CPA (Content Preview API) token allows you to also access
            preview data when using GraphQL playground.
          </Note>
        </Form>
      </Tabs.Panel>
      <Tabs.Panel id='sidebar' style={{padding: '1em'}}>
      <Paragraph>
          To enable GraphQL playground in the content entry sidebar head over to
          the content model section and select the GraphQL Playground widget. It
          will be available only if you configure and install the application
          correctly.
        </Paragraph>
        <Note style={{ marginTop: "1em" }}>
          You can learn more about the sidebar location{" "}
          <TextLink
            href="https://www.contentful.com/developers/docs/extensibility/app-framework/locations/#entry-sidebar"
            target="blank"
            rel="noopener"
          >
            in the documentation
          </TextLink>
          .
        </Note>
      </Tabs.Panel>
      <Tabs.Panel id='feedback' style={{padding: '1em'}}>
      <Paragraph>
          If you have any feedback don't hesitate to{" "}
          <TextLink
            href="https://github.com/harshil1712/contentful-gql-playground"
            target="_blank"
            rel="noopener"
          >
            open an issue on GitHub
          </TextLink>
          . We're open for contributions, too. 🙈
        </Paragraph>
      </Tabs.Panel>
    </Tabs>
    </Card>
  );
};
export default ConfigScreen;
