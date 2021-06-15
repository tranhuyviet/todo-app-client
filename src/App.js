import './App.css';
import { Header } from './components/Header/Header';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import AuthRoute from './components/AuthRoute/AuthRoute';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <div style={{ marginTop: 64, padding: 20, textAlign: 'center' }}>
                <Switch>
                    <AuthRoute path="/login" component={LoginPage} />
                    <AuthRoute path="/register" component={RegisterPage} />
                    <AuthRoute exact path="/" auth component={HomePage} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
