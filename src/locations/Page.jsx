import React from 'react';
import Playground from '../components/Playground';

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

const Page = () => {
  return (
      <div style={{height: '100vh'}}>
        <Playground queries={query} />
      </div>
  )
};

export default Page;
