import React from 'react';
import { TodoAddForm } from '../../components/TodoAddForm/TodoAddForm';
import TodoList from '../../components/TodoList/TodoList';

const HomePage = () => {
    return (
        <div>
            <TodoList />
            <br />
            <TodoAddForm />
        </div>
    );
};

export default HomePage;
