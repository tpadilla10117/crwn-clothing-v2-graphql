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

  useEffect( () => {
    if(data) {
      //destructuing the collections off the data:
      const { collections } = data;
      const collectionsMap = collections.reduce( (accumulator, collection) => {
        const { title, items } = collection;
        accumulator[title.toLowerCase()] = items;
        return accumulator;
      }, {});

      setCategoriesMap(collectionsMap);
    }

  }, [data]);

  console.log("loading from graphQL: ", loading);
  console.log("data from graphQL:", data);

  

  const value = { categoriesMap, loading };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
