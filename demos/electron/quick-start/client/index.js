const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', async() => {
    // 更改文件title
    const title = titleInput.value
    window.electronAPI.setTitle(title)


   
});

