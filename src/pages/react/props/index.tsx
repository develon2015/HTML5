import * as React from 'react';
import Code from '@/components/Code';
import code from '!raw-loader!.';

class Child extends React.Component<{ param: number }, {}> {
    constructor(props) {
        super(props);
        console.log('实例化');
    }

    render() {
        console.log('render child');
        return (
            < >
                <h1>{this.props.param}</h1>
            </>
        )
    }
}

class Father extends React.Component<{}, { prop: number }> {
    state = {
        prop: 1
    }

    render() {
        console.log('render father');
        if (this.state.prop % 3 === 0) { // 当prop为3时，树结构发生了变化，Child实例被舍弃掉1个。
            return ( // 这里会导致第3个Child组件被实例化
                <div>
                    <Child param={this.state.prop} />
                    <button onClick={(ev) => this.onClick(ev)}>测试</button>
                </div>
            )
        }
        return ( // 实例会被重用。不过当prop从3变为4时，Child实例不足，会再实例化第3个Child组件。
            <div>
                {/* 重用？一旦某个节点不对劲，之后的组件都会被重新实例化。取消下行注释，你会发现实例化次数增加了！ */}
                {/* <div>全部给我重新实例化！</div> */}
                <Child param={this.state.prop} />
                <Child param={this.state.prop} />
                <button onClick={(ev) => this.onClick(ev)}>测试</button>
            </div>
        )
    }

    onClick(ev) {
        this.setState({ prop: this.state.prop + 1 });
    }
}

export default () => (
    < >
        <Father />
        <Code children={code} />
    </>
)
