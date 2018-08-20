import React, { Component } from 'react';
import axios from 'axios'
// import imgStr from 'html-loader!../img-html.html'
var imgStr = require("html-loader!../img-html.html");
console.log(imgStr)
export default class Home extends Component {
    componentDidMount () {
        axios.get('http://localhost:9000/page.json').then( data => {
            // console.log(data)
        })
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