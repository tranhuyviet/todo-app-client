import './App.css';
import { Header } from './components/Header/Header';

import { BrowserRouter, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import AuthRoute from './components/AuthRoute/AuthRoute';
import CartPage from './pages/CartPage/CartPage';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <div style={{ marginTop: 64, padding: 20, textAlign: 'center' }}>
                <Switch>
                    <AuthRoute path="/login" notAuth component={LoginPage} />
                    <AuthRoute path="/register" notAuth component={RegisterPage} />
                    <AuthRoute exact path="/" auth component={HomePage} />
                    <AuthRoute exact path="/cart" auth component={CartPage} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
