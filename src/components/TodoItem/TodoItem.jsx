import React, { useState, useEffect } from 'react';
import './TodoItem.css';
import { useMutation, useReactiveVar } from '@apollo/client';
import { DELETE_TODO, UPDATE_TODO } from '../../Apollo/Graphql/mutations';
// import { GET_TODOS } from '../../Apollo/Graphql/queries';
import { setCartItems } from '../../Apollo/cache';

export default function TodoItem({ todo }) {
    const [isEdit, setIsEdit] = useState(false);
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState(false);
    const cartItems = useReactiveVar(setCartItems);

    const [deleteTodo] = useMutation(DELETE_TODO, {
        onError(error) {
            console.log('DELETE TOTO ERROR: ', error);
        },
        update(cache, result) {
            cache.modify({
                fields: {
                    getTodos() {},
                },
            });
        },
    });

    const [updateTodo] = useMutation(UPDATE_TODO);

    const handleDeleteTodo = (_id) => {
        deleteTodo({
            variables: { _id: _id },
            // update(cache, result) {
            //     // get todos in cache
            //     const todosInCache = cache.readQuery({
            //         query: GET_TODOS,
            //     });

            //     // update todos in cache
            //     const updateTodos = todosInCache.getTodos.filter(
            //         (todo) => todo._id !== _id
            //     );
            //     cache.writeQuery({
            //         query: GET_TODOS,
            //         data: { getTodos: updateTodos },
            //     });
            //     // console.log('update todo after delete', updateTodos);
            //     // console.log('result', result);
            // },
        });
        console.log('DELETE: ', _id);
    };

    const handleEditTodo = (_id) => {
        console.log('UPDATE TODO: ', _id, ' - ', title);
        updateTodo({
            variables: {
                _id,
                title,
                status,
            },
        });
        setIsEdit(false);
    };

    const handleAddToCart = () => {
        // console.log('Add to cart', todo._id);
        // setCartItems([...cartItems, todo._id]);
        const isCartExist = cartItems.find((item) => item._id === todo._id);

        // if cart exist -> add more quantity
        if (isCartExist) {
            isCartExist.quantity += 1;
            setCartItems([...cartItems]);
        } else {
            const cartItemNew = {
                _id: todo._id,
                quantity: 1,
            };
            setCartItems([...cartItems, cartItemNew]);
        }
    };

    useEffect(() => {
        setTitle(todo.title);
        setStatus(todo.status);
    }, [todo]);

    return (
        <div className="todoItemContainer">
            {/* <p className={`${todo.status === true ? 'done' : ''}`}>
                {todo.title}
            </p> */}
            <input
                className={`${todo.status === true ? 'done' : ''} ${isEdit === false ? 'notEdit' : 'edit'} titleText`}
                value={title}
                disabled={!isEdit}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="checkbox"
                style={{ marginRight: 20 }}
                checked={status}
                disabled={!isEdit}
                onChange={(e) => setStatus((prev) => !prev)}
            />
            <div>
                {isEdit && (
                    <button style={{ marginRight: 10 }} onClick={() => handleEditTodo(todo._id)}>
                        Save
                    </button>
                )}

                <button style={{ marginRight: 10 }} onClick={() => setIsEdit((prev) => !prev)}>
                    {isEdit ? 'Cancel' : 'Edit'}
                </button>
                <button style={{ marginRight: 10 }} onClick={() => handleDeleteTodo(todo._id)}>
                    Delete
                </button>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
}
