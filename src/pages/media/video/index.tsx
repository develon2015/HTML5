import * as React from 'react';
import Tag from '@/components/Tag';
import Code from '@/components/Code';
import code from '!raw-loader!./';

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
function Video() {
    var [height, setHeight] = React.useState('0px');
    var ref = React.useRef<HTMLDivElement>();
    React.useEffect(() => {
        setTimeout(() => {
            ref.current?.offsetTop && setHeight(`calc(100vh - ${ref.current.offsetTop}px)`);
        }, 200);
    });
    return (
        <div ref={ref} style={{ width: '99vw', height, background: 'black' }}>
            <video style={{ width: '100%', height: '100%' }}
                autoPlay muted controls controlsList="fullscreen nodownload"
                loop
                src="https://github.com/develon2015/raw/raw/main/video/我被打败了吗.webm" />
        </div>
    );
}

export default () => {
    return (
        < >
            <Tag>Video</Tag>

            <React.Suspense fallback={<Loadding />}>
                {
                    (() => {
                        var LazyVideo = React.lazy(() => {
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve({
                                        default: Video as never
                                    });
                                }, 1000);
                            });
                        });
                        return <LazyVideo />;
                    })()
                }
            </React.Suspense>

            <Code>
                {code}
            </Code>
        </>
    );
};
