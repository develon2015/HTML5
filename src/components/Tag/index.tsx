import * as React from 'react';

export default (props: {
    children: string
}) => {
    return (
        <h2 style={{ color: 'mediumvioletred' }}>
            {props.children}
        </h2>
    );
};
