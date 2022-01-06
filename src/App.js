import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './pages/Main'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Main/>} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
