## module

## export type

```ts
// @filename: animal.ts
export type Cat = { breed: string; yearOfBirth: number };
export interface Dog {
  breeds: string[];
  yearOfBirth: number;
}
// @filename: app.ts
import { Cat, Dog } from "./animal.js";
type Animals = Cat | Dog;
```
只能导出`type`
```ts
import type { Cat, Dog } from "./animal.js"; 
export type Animals = Cat | Dog;
```
