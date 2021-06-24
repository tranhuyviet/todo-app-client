import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TODOS } from '../../Apollo/Graphql/queries';
import './TodoList.css';
import TodoItem from '../TodoItem/TodoItem';

const LIMIT = 10;

export default function TodoList() {
    const { data, loading, error, fetchMore } = useQuery(GET_TODOS, {
        variables: { offset: 0, limit: LIMIT },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error {error.message}</p>;
    if (!data && !data.getTodos.todos) return <p>Can not get todo</p>;

    const handleLoadMore = async () => {
        console.log('load more');

        await fetchMore({
            variables: {
                offset: data.getTodos.todos.length,
                limit: LIMIT,
            },
        });
    };

    return (
        <div className="todoList">
            <div className="todoListContainer">
                <p style={{ margin: 0, padding: 0, marginBottom: 20 }}>Total todo: {data.getTodos.total}</p>
                {data.getTodos.todos.map((todo) => (
                    //    <div key={todo._id} className="todoItemContainer">
                    //        <p className={`${todo.status === true ? 'done' : ''}`}>{todo.title} </p>
                    //        <button>Delete</button>
                    //    </div>
                    <TodoItem todo={todo} key={todo._id} />
                ))}
                <button style={{ marginTop: 20 }} onClick={handleLoadMore} disabled={!data.getTodos.hasMore}>
                    Load more
                </button>
            </div>
        </div>
    );
}
