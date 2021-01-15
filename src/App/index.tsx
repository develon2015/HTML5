import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/HomeTwoTone';
import router from '@/pages/router';

var cs = router.listCategory();
console.log(cs);

export default class extends React.Component {
    render() {
        return (
            <ReactRouter.HashRouter>
                < >
                    <div>
                        {
                            cs.map((it, index) => {
                                console.log(router.map[it]);
                                return (
                                    <div key={index}>
                                        <h5>{ it }</h5>
                                        <h5>{ it }</h5>
                                    </div>
                                );
                            })
                        }
                    </div>

                    <div style={{ position: 'fixed', bottom: 20, right: 20 }} >
                        <ReactRouter.Link to="/">
                            <IconButton style={{ border: 'solid 1px pink', borderRadius: 50 }} color="secondary" size="medium">
                                <HomeIcon />
                            </IconButton>
                        </ReactRouter.Link>
                    </div>
                </>

                <ReactRouter.Switch>
                    <ReactRouter.Route path="/a">
                        <h1>A</h1>
                    </ReactRouter.Route>

                    <ReactRouter.Route path="/b">
                        <h1>B</h1>
                    </ReactRouter.Route>
                </ReactRouter.Switch>
            </ReactRouter.HashRouter>
        );
    }
};
