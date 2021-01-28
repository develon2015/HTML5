import * as React from 'react';
import Code from '@/components/Code';
import code from '!raw-loader!.';

interface Props {
}

interface States {
    n: string;
    D: number;
}

class _ extends React.Component<Props, States> {
    canvas: React.RefObject<HTMLCanvasElement> = React.createRef();
    ctx: CanvasRenderingContext2D;
    Ox: number; Oy: number;
    state = {
        n: '2',
        D: 60,
    };

    render(): React.ReactElement {
        return (
            < >
                <span>
                    <label>选择数字：</label>
                    <select value={this.state.n} onChange={(ev) => this.setState({ n: ev.target.value })}>
                        <optgroup label="选择一个数字">
                            {
                                [0, 1, 2, 3, 7].map((it, index) => <option key={index}>{it}</option>)
                            }
                        </optgroup>
                    </select>
                </span>
                <span>
                    <label>数字大小：</label>
                    <input value={this.state.D} onChange={(ev) => this.setState({ D: Number.parseInt(ev.target.value) })} />
                </span>

                <div style={{ position: 'relative', width: '100vw', height: '100vh', background: 'white' }}>
                    <canvas style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        overflow: 'hidden',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }} ref={this.canvas} />
                </div>

                <Code>{code}</Code>
            </>
        )
    }

    componentDidMount() {
        var canvas = this.canvas.current;
        canvas.width = canvas.parentElement.clientWidth * .9;
        canvas.height = canvas.parentElement.clientHeight * .9;
        this.Ox = canvas.offsetLeft;
        this.Oy = canvas.offsetTop;
        var ctx = canvas.getContext('2d');
        this.ctx = ctx;
        canvas.addEventListener('mousemove', (ev) => {
            var st = new Date().getTime();
            var n = 800;
            for (let i = 0; i < n; i++) {
                this.onMouseMove(ev);
            }
            var et = new Date().getTime();
            console.log(et - st, (et - st) / n);
        });
    }

    drawNumber(ctx: CanvasRenderingContext2D, [x, y], n: number) {
        const D = this.state.D;
        const d = D / 4;
        var style = [
            (
                () => {
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + D, y);
                    ctx.lineTo(x + D, y + 2 * D);
                    ctx.lineTo(x, y + 2 * D);
                    ctx.closePath();
                }
            ),
            (
                () => {
                    ctx.moveTo(x + d, y + D / 2);
                    ctx.lineTo(x + D / 2, y);
                    ctx.lineTo(x + D / 2, y + 2 * D);
                    ctx.moveTo(x, y + 2 * D);
                    ctx.lineTo(x + D, y + 2 * D);
                }
            ),
            (
                () => {
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + D, y);
                    ctx.lineTo(x + D, y + D);
                    ctx.lineTo(x, y + D);
                    ctx.lineTo(x, y + 2 * D);
                    ctx.lineTo(x + D, y + 2 * D);
                }
            ),
            (
                () => {
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + D, y);
                    ctx.lineTo(x + D, y + D);
                    ctx.lineTo(x, y + D);
                    ctx.moveTo(x + D, y + D);
                    ctx.lineTo(x + D, y + 2 * D);
                    ctx.lineTo(x, y + 2 * D);
                }
            ),
            null, // 4
            null, // 5
            null, // 6
            (
                () => {
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + D, y);
                    ctx.lineTo(x + D / 2, y + D / 2);
                    ctx.lineTo(x + D / 2, y + 2 * D);
                }
            ),
        ][n];

        ctx.beginPath();
        style?.();
        ctx.stroke();
    }

    onMouseMove(ev: MouseEvent) {
        var canvas = this.canvas.current;
        var ctx = this.ctx;
        // reset canvas
        ctx.fillStyle = '#880088';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // ctx style
        ctx.fillStyle = 'red';
        ctx.lineWidth = 8;
        ctx.strokeStyle = 'green';
        var [x, y] = [ev.offsetX, ev.offsetY];
        this.drawNumber(ctx, [x, y], Number.parseInt(this.state.n));
    }
}

export default (
    _ as React.ComponentClass
)
