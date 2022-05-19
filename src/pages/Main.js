import React from 'react';
import Location from '../components/Location'
import AddLocation from '../components/AddLocation'
import {LocationContextProvider} from '../contexts/locationContext'

function Main() {
  return (
    <LocationContextProvider>
      <>
          <AddLocation />
          <Location />
      </>
    </LocationContextProvider>
  );
}

export default Main;
