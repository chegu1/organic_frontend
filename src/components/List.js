import React from 'react';

const List = (props) => {

    return (
        <div className="list-items">
            {props.data}
        </div>

    )
}

export default List;