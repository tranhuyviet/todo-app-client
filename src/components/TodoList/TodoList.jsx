import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TODOS } from '../../Apollo/Graphql/queries';
import './TodoList.css';
import TodoItem from '../TodoItem/TodoItem';

export default function TodoList() {
    const { data, loading, error } = useQuery(GET_TODOS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error {error.message}</p>;
    if (!data) return <p>Can not get todo</p>;
    // console.log(data);
    return (
        <div className="todoList">
            <div className="todoListContainer">
                {data.getTodos.map((todo) => (
                    //    <div key={todo._id} className="todoItemContainer">
                    //        <p className={`${todo.status === true ? 'done' : ''}`}>{todo.title} </p>
                    //        <button>Delete</button>
                    //    </div>
                    <TodoItem todo={todo} key={todo._id} />
                ))}
            </div>
        </div>
    );
}
