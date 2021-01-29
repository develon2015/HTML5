import * as React from 'react';
import css from './style.css';
import Code from '@/components/Code';
import code from '!raw-loader!.';

class _ extends React.Component<{}, {}> {
    refCanvas: React.RefObject<HTMLCanvasElement> = React.createRef();
    c: CanvasRenderingContext2D = null;

    render() {
        return (
            < >
                <canvas className={css['canvas']} ref={this.refCanvas} />

                <Code>{code}</Code>
            </>
        )
    }

    componentDidMount() {
        var canvas = this.refCanvas.current;
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        canvas.addEventListener('contextmenu', (ev) => {
            ev.stopImmediatePropagation();  // 立即停止传播
            ev.preventDefault(); // 防止默认行为
        }, true); // 同级优先处理

        this.c = canvas.getContext('2d');
        this.draw();
    }

    draw() {
        var canvas = this.refCanvas.current;
        var c = this.c;
        c.clearRect(0, 0, this.refCanvas.current.width, this.refCanvas.current.height);

        const PI = Math.PI;
        const PI2 = 2 * PI;

        c.font = '120pt 宋体';
        c.fillStyle = 'black';
        // c.fillText("txt你好2222", 200, 200);
        c.strokeStyle = 'red';
        c.strokeText("txt你好2222", 0, 500);

        requestAnimationFrame(() => this.draw());
    }
}

export default _ as React.ComponentClass
