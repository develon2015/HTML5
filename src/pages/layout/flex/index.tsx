import * as React from 'react';
import Code from '@/components/Code';
import code from '!raw-loader!.';

function Root(props: {}): React.ReactElement {
    var arr = new Array(120);
    arr.fill(Math.random());
    
    return (
        <div style={{ display: 'flex', flexDirection: 'row', background: '#880088', flexWrap: 'wrap', overflow: 'auto',
            justifyContent: 'center'
        }}>
            {
                arr.map((it, index) => (
                    <div style={{ margin: '1px', background: 'green', width: 200, height: 200 }} key={index}>
                        <span style={{ color: 'white', }}>
                            {index}
                        </span>
                    </div>
                ))
            }
        </div>
    )
}

export default () => (
    < >
        <Root />
        <Code>{code}</Code>
    </ >
);
