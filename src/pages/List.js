import React from 'react';
import ItemList from '../components/ItemList'
import AddItem from '../components/AddItem'
import {ItemContextProvider} from '../contexts/itemContext'

function List() {
  return (
    <ItemContextProvider>
      <>
          < AddItem />
          < ItemList />
      </>
    </ItemContextProvider>
  );
}

export default List;