import React, { useState, useContext, useEffect } from 'react';

let HistoryContext = React.createContext();

export const HashRouter = ({ children }) => {
	const [record, setRecord] = useState({
		location: {
			pathname: window.location.hash.slice(1) || '/'
		}
	});
	useEffect(() => {
		window.location.hash = window.location.hash || '/';
		window.addEventListener('hashchange', handleHashChange, false);
		return () => {
			window.removeEventListener('hashchange', handleHashChange, false);
		};
	}, []);
	function handleHashChange() {
		setRecord({
			location: {
				...record.location,
				pathname: window.location.hash.slice(1) || '/'
			}
		});
	}
	return (
		<HistoryContext.Provider value={{ record, setRecord }}>
			{children}
		</HistoryContext.Provider>
	);
};

// link组件: 触发路由跳转
export const Link = ({ to, children }) => {
	return <a href={'#' + to}>{children}</a>;
};

const { pathToRegexp } = require('path-to-regexp');

export const Route = ({ path, children }) => {
	// 根据路由是否匹配进行展示,使用正则进行匹配, 默认为不精确匹配
	const { record } = useContext(HistoryContext);
	let regex = pathToRegexp(record.location.pathname, [], { end: false });
	let match = regex.test(path);
	return match ? children : null;
};

// 匹配到一个之后不再进行匹配
export const Switch = ({ children }) => {
	const { record } = useContext(HistoryContext);
	// debugger;
	let pathname = record.location.pathname;
	for (let i = 0; i < children.length; i++) {
		let child = children[i];
		let path = child.props.path;
		let reg = pathToRegexp(pathname, [], { end: false });
		if (reg.test(path)) {
			return child;
		}
	}
	return null;
};

// 其他条件匹配都失败的时候，自动跳转到指定页面,如login
export const Redirect = ({ to }) => {
	window.location.hash = to;
	return null;
};
