import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TOTO } from '../../Apollo/Graphql/mutations';
// import { GET_TODOS } from '../../Apollo/Graphql/queries';

export const TodoAddForm = () => {
    const [title, setTitle] = useState('');
    const [addTodo] = useMutation(ADD_TOTO, {
        onError(error) {
            console.log('ADD TODO ERROR: ', error);
        },
        update(cache, result) {
            // way 1: use read and write query
            // try {
            //     // get todos in cache
            //     const todosInCache = cache.readQuery({
            //         query: GET_TODOS,
            //     });

            //     console.log(todosInCache);
            //     console.log(result.data);
            //     // update new todo to cache
            //     cache.writeQuery({
            //         query: GET_TODOS,
            //         data: {
            //             getTodos: [
            //                 ...todosInCache.getTodos,
            //                 result.data.addTodo,
            //             ],
            //         },
            //     });
            // } catch (error) {
            //     console.log(error);
            // }

            // way 2: use cache modify
            cache.modify({
                fields: {
                    getTodos() {},
                    // getTodos(existingTodos = []) {
                    //     console.log('Existing todos:', existingTodos);
                    // },
                },
            });
        },
    });

    const handleAddTodo = () => {
        console.log('ADD NEW TOTO', title);
        addTodo({
            variables: {
                title,
            },
        });
        setTitle('');
    };
    return (
        <div>
            <input onChange={(e) => setTitle(e.target.value)} value={title} />
            <button onClick={handleAddTodo}>Add Todo</button>
        </div>
    );
};
