import * as React from 'react';
import geo from './geo.json';
import Code from '@/components/Code';
import code from '!raw-loader!.';

var Engine: React.FC<{geo: { type?: string, [key: string]: any }}> = (props, ctx) => {
    var refCanvas = React.useRef<HTMLCanvasElement>();
    React.useEffect(() => {
        console.log('画布已挂载');
        var canvas = refCanvas.current;
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    }, []);
    React.useEffect(() => {
        if (!props.geo) return;
        console.log(props.geo);
        var canvas = refCanvas.current;
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var ps = props.geo.coordinates;
        ctx.beginPath();

        const N = 10;
        ctx.moveTo(ps[0][0] * N, ps[0][1] * N);
        ps.forEach(it => {
            ctx.lineTo(it[0] * N, it[1] * N);
        });
        ctx.closePath();

        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;
        ctx.stroke();
    }, [props.geo]);
    return (
        < >
            <canvas style={{ background: 'transparent' }} ref={refCanvas} />
        </>
    )
}

var Root: React.FC<{}> = (props, ctx) => {
    var [text, setText] = React.useState(JSON.stringify(geo, null, 2));
    var onTextAreaChange = React.useCallback((ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(ev.target.value);
    }, []);

    var json = null;
    try { json = JSON.parse(text); } catch (err) { }
    return (
        < >
            <div style={{ display: 'inline-block', width: '20%', height: '100vh' }}>
                <textarea value={text} onChange={onTextAreaChange} style={{ width: '100%', height: '100%' }}></textarea>
            </div>
            <div style={{ display: 'inline-block', float: 'right', width: '80%', height: '100vh' }}>
                <Engine geo={json} />
            </div>
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
