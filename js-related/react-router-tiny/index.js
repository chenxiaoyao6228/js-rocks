import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
// import {
// 	HashRouter as Router,
// 	Switch,
// 	Route,
// 	Link,
// 	Redirect
// } from 'react-router-dom';
import { HashRouter as Router, Switch, Route, Link, Redirect } from '/router';

export default function App() {
	return (
		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to='/'>Home</Link>
						</li>
						<li>
							<Link to='/about'>About</Link>
						</li>
						<li>
							<Link to='/outer'>Outer</Link>
						</li>
						<li>
							<Link to='/no-match'>no-match</Link>
						</li>
					</ul>
				</nav>
				<Switch>
					<Route path='/'>
						<Home />
					</Route>
					<Route path='/about'>
						<About />
					</Route>
					<Route path='/outer'>
						<Outer>
							<Inner></Inner>
						</Outer>
					</Route>
					<Route path='/login'>
						<Login></Login>
					</Route>
					<Redirect to='/login'> </Redirect>
				</Switch>
			</div>
		</Router>
	);
}

function Login() {
	return <h2>Login</h2>;
}

function Home() {
	return <h2>Home</h2>;
}

function About() {
	return <h2>About</h2>;
}

// 嵌套路由
function Outer({ children }) {
	return (
		<>
			<h2>Outer</h2>
			{children}
		</>
	);
}

function Inner() {
	return (
		<Route path='/outer/inner'>
			<h3>Inner</h3>
		</Route>
	);
}

const container = document.querySelector('#root');

ReactDOM.render(<App />, container);
