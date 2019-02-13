import React, {
    Component
} from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import {
    Tabs,
    Icon,
    NavBar
} from 'antd-mobile';
import {
    navData
} from "../router/config";
import {
    withRouter
} from 'react-router-dom';

const tabs = navData;

class Nav extends Component {
    constructor(p) {
        super(p);
    }
    tabpage = (data, index) => {
        // console.log(data);
        this.props.history.push(data.path);
    }
    render() {
        let {
            location,
            match
        } = this.props;
        let initIndex = navData.findIndex(item => item.path === location.pathname);
        let index = 0;
        if (initIndex !== -1) {
            index = initIndex;
        }

        const nav = <Tabs tabs={tabs}
              initialPage={index}
              onChange={this.tabpage}
                >
            </Tabs>
        // console.log(this.props.location);
        const goback = <NavBar
          className= {location.state && location.state.navClass ? "white" : "black"}
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.go(-1);
          }}
        >{location.state && location.state.title}</NavBar>
        // console.log(this.props.location);
        return (
            <nav>
                { initIndex !== -1 ? nav : goback}
            </nav>
        )
    }
}
export default withRouter(Nav);