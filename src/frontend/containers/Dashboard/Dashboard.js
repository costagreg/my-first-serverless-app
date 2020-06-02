import React, { Component } from 'react'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      text: ''
    }
  }
  
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        text: 'Client side test!'
      })
    }, 2000)
  }

  render() {
    return <div>Server Side Generated Test {this.state.text}</div>
  } 
}

export default Dashboard