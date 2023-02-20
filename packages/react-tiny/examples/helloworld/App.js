
let root = document.querySelector('#root')

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { num: 0 }
  }
  componentWillUpdate() {
    console.log('update')
  }
  componentWillMount() {
    console.log('mount')
  }
  handleClick() {
    this.setState({
      num: this.state.num + 1
    })
  }
  render() {
    return (
      <div>
        <h1>number: {this.state.num}</h1>
        <button onClick={this.handleClick.bind(this)}>add</button>
      </div>
    )
  }
}

function App() {
  return <Counter></Counter>
}

class Welcome extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}

// ReactDOM.render(<App />, root)
ReactDOM.render(React.createElement(App, {}, ''), root)
