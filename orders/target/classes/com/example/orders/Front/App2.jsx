import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App1 from './App1';
import App3 from './App3';
import Login from './Login';
import Main from "./Main";
import Register from './Register';
function App2(){
    return(
    <>
    <Router>
            <Routes>
                <Route path="/register" element={<Register></Register>}></Route>
                <Route path='/login' element={<Login></Login>}></Route>
                <Route exact path='/' element={<Main></Main>}></Route>
                <Route path="/customers" element={<App/>}></Route>
                <Route path="/api/orders" element={<App1></App1>}></Route>
                <Route path="/api/products" element={<App3></App3>}></Route>
            </Routes>
        </Router>
        </>
    )
}
export default App2