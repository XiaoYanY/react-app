import React, {
    Component
} from 'react';
import apiObj from './server/api';
import Notfond from './views/notfond';

function fetchMethod(Method, Com) {
    return class getdata extends Component {
        constructor(p) {
            super(p);
            this.state = {
                data: {
                    list: [],
                    banner: []
                }
            }
        }
        componentDidMount() {
            apiObj[Method]().then((resdata) => {
                this.setState({
                    data: resdata
                })
            })
        }
        render() {
            return (this.state.data.list.length !== 0 ? <Com resdata={this.state.data}  {...this.props}/> : <Notfond/>)
        }
    }
}
export default fetchMethod;