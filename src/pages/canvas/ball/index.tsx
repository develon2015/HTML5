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
        this.draw(18, 18);
    }

    draw(x, y, isRight = true, isBottom = true) {
        var canvas = this.refCanvas.current;
        var c = this.c;
        c.clearRect(0, 0, this.refCanvas.current.width, this.refCanvas.current.height);

        const PI = Math.PI;
        const PI2 = 2 * PI;
        var radius = 28;
        c.beginPath();
        c.arc(x, y, radius, 0, PI2, false);
        c.lineWidth = 2;
        c.strokeStyle = '#000';
        c.stroke();

        c.beginPath();
        c.moveTo(x - 6, y - 8); // left eye
        c.lineTo(x - 12, y - 8);
        c.moveTo(x + 6, y - 8); // right eye
        c.lineTo(x + 12, y - 8);
        c.lineWidth = 2;
        c.strokeStyle = 'red';
        c.stroke();

        c.beginPath();
        c.arc(x, y + 4, radius / 2, 0, PI);
        c.lineWidth = 4;
        c.strokeStyle = 'green';
        c.closePath();
        c.stroke();

        if (isRight) {
            if (x + radius > canvas.width) isRight = false;
        } else {
            if (x - radius < 0) isRight = true;
        }
        if (isBottom) {
            if (y + radius > canvas.height) isBottom = false;
        } else {
            if (y - radius < 0) isBottom = true;
        }
        const speed = 1.8;
        isRight ? x += speed : x -= speed;
        isBottom ? y += speed : y -= speed;
        requestAnimationFrame(() => this.draw(x, y, isRight, isBottom));
    }
}

export default _ as React.ComponentClass
