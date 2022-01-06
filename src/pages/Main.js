import React from 'react';
import Header from '../components/Header'
import Location from '../components/Location'
import Footer from '../components/Footer.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function Main() {
  return (
    <>
        <Header />
        <Location />
        <Footer />
    </>
  );
}

export default Main;
