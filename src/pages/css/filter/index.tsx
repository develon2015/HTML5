import * as React from 'react';
import Code from '@/components/Code';
import Tag from '@/components/Tag';

function Grayscale() {
    var ref = React.useRef<HTMLDivElement>();
    var ref2 = React.useRef<HTMLDivElement>();
    React.useEffect(() => {
        ref2.current.innerHTML = ref.current.innerHTML;
    });
    return (
        < >
            <Tag> Graycale </Tag>

            <div ref={ref}>
                <div style={{ background: 'green' }}>
                    <h1 style={{ color: 'red' }}>This is a text.</h1>
                </div>
            </div>

            <div style={{ filter: 'grayscale(1)' }} ref={ref2} />

            <div>
                <Code>
                    filter: grayscale(1);
                </Code>
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
