// 某银行网点某时间段内共开放 n 个服务窗口，有 m 个用户排队办理不同的业务，每个用户的业务办理时间或许不同。这些用户需要办理的业务可以用 tasks 表示。

// 实现函数 function runTasks(n, tasks)，根据服务窗口数 n 和任务 tasks，输出所有用户办理完各自业务的顺序。

// 举例说明，针对如下任务，

// 若 n=1，输出顺序是 c b a，因为只有一个窗口，只能依次执行；

// 若 n=2，输出顺序是 b a c，任务 b c 同时执行，b 执行完后 a 执行；

// 若 n>=3，输出顺序是 a b c，同时执行，时间越短完成越早。

// eslint-disable-next-line
const tasks = [
  {
    name: "c",
    taskTime: 60,
  },
  {
    name: "b",
    taskTime: 30,
  },
  {
    name: "a",
    taskTime: 10,
  },
];
