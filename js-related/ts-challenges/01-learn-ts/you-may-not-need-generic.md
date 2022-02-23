// you may not need generic

```ts
type ResourceItem = {
  id: string;
};

enum Action {
  add = 'add',
  remove = 'remove',
  update = 'update',
}

type AddOrRemove = Action.add | Action.remove;

```

需求: action handler 函数根据不同的type接受不同的参数item

// !  错误的示范,
interface ActionHandler {
   <T extends Action>( // 首先约束了T必须是一个Action
     type: T,
     item: T extends AddOrRemove ? ResourceItem : ResourceItem[], // 再根据Action来判断传入的item  =>   ?
   ): any;
 }

// 正确的做法
```ts
interface ActionHandler {
  (type: AddOrRemove, item: ResourceItem): any;
  (type: Exclude<Action, AddOrRemove>, item: ResourceItem[]): any;
}
```

```ts
const handler: ActionHandler = (type, item) => {
  if (type === Action.add || type === Action.remove) {
    console.log('add item', item.id); // T 被推断成了 ResourceItem | ResourceItem[]
  } else {
    console.log('item', item.length);
  }
};
handler(Action.add, { id: '1' });
handler(Action.update, [{ id: '1' }]);
handler('xx', { id: '1' });
```