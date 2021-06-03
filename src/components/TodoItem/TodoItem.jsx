import React from 'react';
import './TodoItem.css';
import { useMutation } from '@apollo/client';
import { DELETE_TODO } from '../../Apollo/Graphql/mutations';
import { GET_TODOS } from '../../Apollo/Graphql/queries';

export default function TodoItem({ todo }) {
    const [deleteTodo, { data, error, loading }] = useMutation(DELETE_TODO, {
        onError(error) {
            console.log('DELETE TOTO ERROR: ', error);
        },
    });

    const handleDeleteTodo = (_id) => {
        deleteTodo({
            variables: { _id: _id },
            update(cache, result) {
                // get todos in cache
                const todosInCache = cache.readQuery({
                    query: GET_TODOS,
                });

                // update todos in cache
                const updateTodos = todosInCache.getTodos.filter(
                    (todo) => todo._id !== _id
                );
                cache.writeQuery({
                    query: GET_TODOS,
                    data: { getTodos: updateTodos },
                });
                // console.log('update todo after delete', updateTodos);
                // console.log('result', result);
            },
        });
        console.log('DELETE: ', _id);
    };

    console.log('DATA AFTER DELETE: ', data);

    return (
        <div className="todoItemContainer">
            <p className={`${todo.status === true ? 'done' : ''}`}>
                {todo.title}
            </p>
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
        </div>
    );
}
