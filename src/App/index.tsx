import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import { Button, IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/HomeTwoTone';
import router from '@/pages/router';
import * as history from 'history';
import Tag from '@/components/Tag';

var cs = router.listCategory();

/**
 * Generate button list via category
 */
function Index() {
    React.useEffect(() => {
        document.title = 'Home';
    });
    return (
        <div>
            {
                cs.map((it, index) => {
                    return (
                        <div key={index}>
                            <Tag>{it}</Tag>
                            {
                                router.map[it].pages.map((page, index) => {
                                    return (
                                        <Button key={index} size="large" color="secondary" variant="contained" onClick={() => {
                                            var path = `/${page.path || page.dirname}`;
                                            history.createHashHistory().push(path);
                                        }}>
                                            {page.title || page.dirname}
                                        </Button>
                                    );
                                })
                            }
                        </div>
                    );
                })
            }
        </div>
    );
}

export default class extends React.Component {
    render() {
        return (
            <ReactRouter.HashRouter>
                <ReactRouter.Switch>
                    <ReactRouter.Route path="/" /*精确匹配首页*/exact>
                        <Index />
                    </ReactRouter.Route>

                    {
                        // 动态路由
                        (() => {
                            var array_route = cs.map((it, index1) => {
                                return router.map[it].pages.map((page, index2) => {
                                    var LazyPage = React.lazy(() => {
                                        return new Promise((resolve, reject) => {
                                            setTimeout(() => {
                                                import(`@/pages/${router.map[it].category.dir}/${page.dirname}`).then(ES6Module => {
                                                    // console.log(typeof ES6Module.default); // a Function or Class Component
                                                    resolve(ES6Module);
                                                }).catch(err => {
                                                    console.log(`异步组件${page.dirname}获取异常`);
                                                    // reject(err);
                                                    resolve({
                                                        default: (() => { // 模拟ES6模块
                                                            return (
                                                                <div style={{ textAlign: 'center', color: 'mediumvioletred' }}>
                                                                    <h1>PAGE FETCH ERROR</h1>
                                                                </div>
                                                            );
                                                        }) as never
                                                    });
                                                });
                                            }, 200);
                                        });
                                    });
                                    var path = page.path || page.dirname;
                                    return (
                                        <ReactRouter.Route key={index1 * index2} path={`/${path}`}>
                                            {
                                                /**
                                                 * Route的children可以是一个函数组件，接收以下参数：
history: {length: 50, action: "POP", location: {…}, createHref: ƒ, push: ƒ, …}
location: {pathname: "/video", search: "", hash: "", state: undefined}
match: {path: "/video", url: "/video", isExact: true, params: {…}}
staticContext: undefined
                                                 */
                                                props => {
                                                    // console.log(props);
                                                    document.title = page.title || page.dirname;
                                                    return (
                                                        <React.Suspense
                                                            fallback={<h2 style={{ textAlign: 'center', color: 'mediumseagreen' }}>正在加载页面...</h2>}>
                                                            <LazyPage />
                                                        </React.Suspense>
                                                    );
                                                }
                                            }
                                        </ReactRouter.Route>
                                    );
                                });
                            });
                            return (array_route as any).flat();
                        })()
                    }

                    <ReactRouter.Route path="*">
                        <div style={{ textAlign: 'center', color: 'mediumvioletred' }}>
                            <h1>404 ERROR</h1>
                        </div>
                    </ReactRouter.Route>
                </ReactRouter.Switch>

                < >
                    {/* Home Button */}
                    <div style={{ position: 'fixed', bottom: 20, right: 20 }} >
                        <ReactRouter.Link to="/">
                            <IconButton style={{ border: 'solid 1px pink', borderRadius: 50 }} color="secondary" size="medium">
                                <HomeIcon />
                            </IconButton>
                        </ReactRouter.Link>
                    </div>
                </>
            </ReactRouter.HashRouter>
        );
    }
};
