
import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { DatePicker, message } from 'antd'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: ''
        }
    }
    handleChange(date) {
        message.info('The selected date is ' + date.toString())
        console.log(date)
        this.setState({date});
    }

    render() {
        return (
            <div>
                <DatePicker onChange={value => this.handleChange(value)} />
                <div style={{marginTop: 20}} >Date: {this.state.date.toString()}</div>
            </div>
        )
    }
}

ReactDom.render(<App />, document.getElementById('root'))