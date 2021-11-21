function loader(source) {
	let style = `
    let style = document.createElement('style')
    style.innerHTML = ${JSON.stringify(source)}  //处理换行
    document.head.appendChild(style)
  `;
	return style;
}

module.exports = loader;
