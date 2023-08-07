import React from 'react';
import { Paragraph } from '@contentful/f36-components';
import { HomeAppSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import Playground from '../Playground';

const query = [
    {
        query: `
    # Welcome to GraphQL Playground
    #
    # Here you can write, validate, and test your GraphQL queries.
    #
    # Type queries into this side of the screen and you will see intellisense suggestions.
    # GraphQL queries typically start with a "{" character, lines that starts with a # are ignored.
    #
    # You can also use the Explorer Plugin (left sidebar) to create your queries.
    `
    }
]

const Home = () => {
    const sdk = useSDK<HomeAppSDK>();
    /*
       To use the cma, inject it as follows.
       If it is not needed, you can remove the next line.
    */
    // const cma = useCMA();

    return (
        <div style={{ height: '100vh' }}>
            <Playground queries={query} />
        </div>
    )
};

export default Home;
