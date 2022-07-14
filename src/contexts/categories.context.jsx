import { createContext, useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client'; //write query signatures

export const CategoriesContext = createContext({
  categoriesMap: {},
});

/* Query using GraphQL: */
const COLLECTIONS = gql`
  
  query GetCollections {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }

`;

export const CategoriesProvider = ({ children }) => {
  //make the Query:
  const { loading, error, data } = useQuery(COLLECTIONS);

  const [categoriesMap, setCategoriesMap] = useState({});

  console.log("loading: ", loading);
  console.log("data from graphQL:", data);

  

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
