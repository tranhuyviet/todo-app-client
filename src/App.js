import './App.css';
import { Header } from './components/Header/Header';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <div style={{ marginTop: 64, padding: 20, textAlign: 'center' }}>
                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route exact path="/login">
                        <LoginPage />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
