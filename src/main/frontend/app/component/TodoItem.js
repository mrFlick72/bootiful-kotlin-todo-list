import React from 'react';

export default ({todoId, todo}) => {
    return <li key={todoId}>{todo}</li>
}