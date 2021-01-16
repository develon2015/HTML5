import * as React from 'react';

function Grayscale() {
    return (
        < >
            <div>
                <h1 style={{ color: 'mediumvioletred' }}>
                    Scale
                </h1>
            </div>

            <div style={{ background: 'green' }}>
                <h1 style={{ color: 'red' }}>This is a text.</h1>
            </div>

            <div>
                <code>
                    filter: grayscale(1)
                </code>
            </div>

            <div style={{ background: 'green', filter: 'grayscale(1)' }}>
                <h1 style={{ color: 'red' }}>This is a text.</h1>
            </div>
        </>
    );
}

export default () => {
    return (
        <div>
            <Grayscale />
        </div>
    );
};