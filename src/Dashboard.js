const React = require('react')

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      text: ''
    }
  }
  
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        text: 'Yeahhhhhhh'
      })
    }, 2000)
  }

  render() {
    return <div>Server Side Generated Test {this.state.text}</div>
  } 
}

module.exports = Dashboard