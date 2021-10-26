import React from 'react';
import dva, { connect } from 'dva';
import './style.css';

// 1. Initialize
const app = dva();

console.log(2);

// 2. Model
app.model({
  namespace: 'count',
  state: 0,
  reducers: {
    add  (count) { return count + 1 },
    minus(count) { return count - 1 },
  },
});

class TestError extends React.Component {
  componentDidCatch(e) {
    alert(e.message);
  }
  componentDidMount() {
    // throw new Error('a');
  }
  render() {
    return <div>TestError</div>
  }
}

// 3. View
const App = connect(({ count }) => ({
  count
}))(function(props) {
  return (
    <div>
      <TestError />
      <h2>{ props.count }</h2>
      <button key="add" onClick={() => { props.dispatch({type: 'count/add'})}}>+</button>
      <button key="minus" onClick={() => { props.dispatch({type: 'count/minus'})}}>-</button>
    </div>
  );
});

// 4. Router
app.router(() => <App />);

// 5. Start
app.start('#root');
