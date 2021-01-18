import * as React from 'react';
import Tag from '@/components/Tag';
import Code from '@/components/Code';
import code from '!raw-loader!./';
import Button from '@material-ui/core/Button';

function Loadding() {
    return (
        <div style={{ textAlign: 'center' }}>
            <span>
                播放器正在初始化中...
            </span>
        </div>
    );
}

/**
 * 一个高度限制为可见的全宽播放器
 */
function CanvasVideo() {
    var [height, setHeight] = React.useState('0px');
    var div = React.useRef<HTMLDivElement>();
    var canvas = React.useRef<HTMLCanvasElement>();
    var [video, setVideo] = React.useState(document.createElement('video'));
    React.useEffect(() => {
        div.current?.offsetTop && setHeight(`calc(100vh - ${div.current.offsetTop}px)`);
        // setup canvas width and height
        canvas.current.width = div.current.clientWidth;
        canvas.current.height = div.current.clientHeight;
        // request draw the frame of video via 2D context of canvas
        var ctx = canvas.current.getContext('2d');
        requestAnimationFrame(function onDraw() {
            ctx.drawImage(
                video,
                0, 0,
                video.videoWidth, video.videoHeight,
                0, 0,
                canvas.current.width, canvas.current.height
            );
            requestAnimationFrame(onDraw);
        });
    });
    return (
        < >
            <div ref={div} style={{ width: '99vw', height, background: 'black' }}>
                <canvas ref={canvas} style={{ width: '100%', height: '100%' }} />
            </div>

            <Button onClick={() => {
                video.src = "https://github.com/develon2015/raw/raw/main/video/我被打败了吗.webm";
                video.play();
            }}>播放</Button>
        </>
    );
}

export default () => {
    return (
        < >
            <Tag>Video2Canvas</Tag>

            < >
                <CanvasVideo />
            </>

            <Code>
                {code}
            </Code>
        </>
    );
};
