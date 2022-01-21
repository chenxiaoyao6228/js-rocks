// 通用的notice方法
const notice = (noticeOption: newOptions): void => {
  console.log("render notice option is: ", JSON.stringify(noticeOption));
};

// 封装一个提示组件, 生成动态的api
const types = ["success", "info", "warning", "error", "loading"] as const;

// 遍历生成api
type apiType = typeof types[number];

let iconName = {
  success: "successIcon",
  info: "infoIcon",
  warning: "warningIcon",
  error: "errorIcon",
  loading: "loadingIcon",
};

let apis: {
  [key in apiType]?: Function;
} = {};

interface Options {
  content: string;
  //   duration: number;
}

type newOptions = Omit<Options, "type"> & { iconName: string }; // 需要过滤一些无用的参数

types.forEach((type) => {
  apis[type] = (options: Options) => {
    // TODO 想把这个作为一个通用的方法, 但是发现依赖了type
    console.log("do something in type:-----------" + type);
    const newOptions: newOptions = {
      iconName: iconName[type], // 根据不同的type进行特殊配置, 生成新的option
      ...options,
    };
    return notice(newOptions);
  };
});

export default apis;

// 希望使用的时候可以有提示
// TODO: 目前还是Function
apis.success({
  content: "hello world",
  //   duration: 3,
});
