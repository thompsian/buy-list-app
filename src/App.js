import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './pages/Main'
import List from './pages/List'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {DataContextProvider} from './contexts/dataContext'

function App() {
    return (
        <Router>
            <DataContextProvider>
            <div className="App">
                <Header />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Main/>} />
                        <Route path="/lists/:locationID" element={<List/>} />
                    </Routes>
                </div>
                <Footer />
            </div>
            </DataContextProvider>
        </Router>
    );
}

export default App;
