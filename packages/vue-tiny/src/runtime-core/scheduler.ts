const promise = Promise.resolve();
const queue: Function[] = [];
let isPending = false;

/*
 * to avoid to many re-render in the same tick, we change the update procedure form sync to async
 * so we have to provide a way for our users to get the updated value after render
 */
export function nextTick (fn: any) {
  return fn ? promise.then(fn) : promise;
}

export function queueJobs (job: Function) {
  if (queue.indexOf(job) === -1) {
    queue.push(job);
  }
  flushQueue();
}

function flushQueue () {
  if (isPending) return;
  isPending = true;
  nextTick(() => {
    let job;
    while (queue.length) {
      job = queue.shift();
      job && job();
    }
  });
}
