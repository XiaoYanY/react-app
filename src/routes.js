import React, {
    Component
} from 'react'
import {
    Route,
    Switch
} from "react-router-dom";
import {
    navData
} from './router/config'
import routeData from './router/config';
import Notfond from "./views/notfond";

export default class Routes extends Component {
    render() {
        // console.log(routeData);
        return (
            <Switch>
                {
                    routeData.map((item) => {
                        return (
                            <Route
                                exact
                                key={item.path}
                                path={item.path}
                                component={item.component}
                            ></Route>
                        )
                    })
                }
            </Switch>
        )
    }
}