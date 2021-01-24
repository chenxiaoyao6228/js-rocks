import { effectWatch, reactive } from './core/reactivity/index.js'

const App = {
  render(context) {
    // state => view
    effectWatch(() => {
      document.body.innerHTML = ``
      const node = document.createTextNode(context.value)
      document.body.append(node)
    })
  },
  setup() {
    //初始化state
    const state = reactive({
      value: 0
    })
    window.state = state // 方便在控制台更新数据
    return state
  }
}
App.render(App.setup()) // View = render(state)

export default App
