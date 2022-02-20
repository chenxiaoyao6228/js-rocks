import * as _ from 'lodash';

export type IdWise = {
  id: string;
};

export type Config = {
  multiple: boolean;
  // defaultSelect?: T | null;
};

const defaultConfig: Config = {
  multiple: false,
  // defaultSelect: { id: '-1' },
};

export default class MultiSelect<T extends IdWise> {
  private selected: T[]; // 选中, 最后一个为最近选中, 因此需要保证方向
  private config: Config;
  private preAction: 'select' | 'ctrl' | 'shift' | null;
  private prevSelected: T | null;
  private initialState: T[];
  constructor(initialState: T[], config?: Config) {
    this.initialState = initialState;
    this.config = { ...defaultConfig, ...(config || {}) };
    this.selected = [];
    this.prevSelected = null;
    this.preAction = null;
  }
  private prevIndex() {
    return this.prevSelected == null
      ? -1
      : this.initialState.findIndex((i) => i.id === this.prevSelected?.id);
  }
  select(item: T): T[] {
    if (this.config.multiple) {
      return this.ctrl(item);
    }
    this.selected = [item];
    this.preAction = 'select';
    this.prevSelected = item;
    return this.selected;
  }
  ctrl(item: T): T[] {
    this.selected =
      this.selected.findIndex((i) => i.id === item.id) > -1
        ? this.selected.filter((i) => i.id !== item.id)
        : [...this.selected, item];
    this.preAction = 'ctrl';
    this.prevSelected = item;
    return this.selected;
  }
  // shift多选是有方向的, 保证选中的方向, 需要区分是否反向选择
  shift(item: T): T[] {
    const prevIndex = this.prevIndex();
    if (prevIndex === -1) {
      // shift的起点. 当没有选中的时候, 第一个shift为多选的起点, 如果有选中, 无论是select, ctrl, shift 都作为上一个选中的起点
      this.prevSelected = item;
      this.preAction = 'shift';
      this.selected = [item];
      return this.selected;
    }
    const curIndex = this.initialState.findIndex((i) => item.id === i.id);
    let range;
    if (prevIndex < curIndex) {
      // 旧的选中集合和新的进行合并
      if (this.preAction === 'shift') {
        range = _.range(prevIndex, curIndex + 1);
        this.selected = range.map((i) => this.initialState[i]);
      } else {
        range = _.range(prevIndex, curIndex + 1);
        const rangeEle = range.map((i) => this.initialState[i]);
        this.selected = _.uniqBy([...this.selected, ...rangeEle], 'id');
      }
    } else {
      range = _.range(prevIndex, curIndex - 1);
      this.selected = range.map((i) => this.initialState[i]);
    }
    this.preAction = 'shift';
    return this.selected;
  }
  prev(): T {
    if (!this.prevSelected) {
      throw new Error('not prevMulSelected selected');
    }
    return this.prevSelected;
  }
  all(): T[] {
    this.selected = this.initialState.slice();
    return this.selected;
  }
  empty(): T[] {
    this.selected = [];
    return this.selected;
  }
  // 新的列表数据, 其他初始化的配置不变(列表被删除, 或者顺序更改)
  update(newState: T[]): T[] {
    this.initialState = newState;
    this.initialState = newState;
    this.prevSelected = null;
    this.preAction = null;
    return this.selected;
  }
}
