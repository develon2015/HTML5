import * as React from 'react';
import geo from './geo.json';
import Code from '@/components/Code';
import code from '!raw-loader!.';

var Engine: React.FC<{geo: object}> = (props, ctx) => {
    var refCanvas = React.useRef<HTMLCanvasElement>();
    React.useEffect(() => {
        console.log('画布已挂载');
    }, []);
    React.useEffect(() => {
        console.log('绘制');
    }, [props.geo]);
    return (
        < >
            <canvas ref={refCanvas} />
        </>
    )
}

var Root: React.FC<{}> = (props, ctx) => {
    var [text, setText] = React.useState(JSON.stringify(geo, null, 2));
    var onTextAreaChange = React.useCallback((ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(ev.target.value);
    }, []);
    return (
        < >
            <textarea value={text} onChange={onTextAreaChange} style={{ width: '100%', height: '200px' }}></textarea>
            <Engine geo={JSON.parse(text)} />
        </>
    )
}

export default () => (
    < >
        <Root>
        </Root>
        <Code>{code}</Code>
    </>
)
