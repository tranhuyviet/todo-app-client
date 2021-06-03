import './App.css';
import { TodoAddForm } from './components/TodoAddForm/TodoAddForm';
import TodoList from './components/TodoList/TodoList';

function App() {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Todo App</h1>
            <TodoList />
            <br />
            <TodoAddForm />
        </div>
    );
}

export default App;
