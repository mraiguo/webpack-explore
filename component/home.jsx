import React, { Component } from 'react';
import axios from 'axios'
// import imgStr from 'html-loader!../img-html.html'
var imgStr = require("html-loader!../img-html.html");

export default class Home extends Component {
    componentDidMount () {
        if (PRODUCTION) {
            console.log('PRODUCTION')
        }
        if (DEVELOPMENT) {
            console.log('DEVELOPMENT')
        }
        // axios.get('http://localhost:9000/page.json').then( data => {
        //     // console.log(data)
        // })
    }
    render() {
        return (
            <div>
                <div>Home组件</div>
                <img src="../asset/play.svg" />
            </div>
        )
    }
}