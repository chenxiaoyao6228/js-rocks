// 原理: flex: 100/coloum数 + img: {width: '100%'}
import React from "react";
import { min } from "lodash";

const defaultProps = {
  breakpointCols: undefined, // optional, number or object { default: number, [key: number]: number }
  className: undefined, // required, string
  columnClassName: undefined, // optional, string

  // Any React children. Typically an array of JSX items
  children: undefined,

  // Custom attributes, however it is advised against
  // using these to prevent unintended issues and future conflicts
  // ...any other attribute, will be added to the container
  columnAttrs: undefined, // object, added to the columns

  // Deprecated props
  // The column property is deprecated.
  // It is an alias of the `columnAttrs` property
  column: undefined,
  dataSource: [],
};

const DEFAULT_COLUMNS = 2;
const ContainerWidth = 1000;

class Masonry extends React.Component {
  constructor(props) {
    super(props);

    // Correct scope for when methods are accessed externally
    this.reCalculateColumnCount = this.reCalculateColumnCount.bind(this);
    this.reCalculateColumnCountDebounce =
      this.reCalculateColumnCountDebounce.bind(this);

    // default state
    let columnCount;
    if (this.props.breakpointCols && this.props.breakpointCols.default) {
      columnCount = this.props.breakpointCols.default;
    } else {
      columnCount = parseInt(this.props.breakpointCols) || DEFAULT_COLUMNS;
    }

    this.state = {
      columnCount,
      columnsHeight: new Array(columnCount).fill(0),
    };
  }

  componentDidMount() {
    this.reCalculateColumnCount();

    // window may not be available in some environments
    if (window) {
      window.addEventListener("resize", this.reCalculateColumnCountDebounce);
    }
  }

  componentDidUpdate() {
    this.reCalculateColumnCount();
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener("resize", this.reCalculateColumnCountDebounce);
    }
  }

  reCalculateColumnCountDebounce() {
    if (!window || !window.requestAnimationFrame) {
      // IE10+
      this.reCalculateColumnCount();
      return;
    }

    if (window.cancelAnimationFrame) {
      // IE10+
      window.cancelAnimationFrame(this._lastRecalculateAnimationFrame);
    }

    this._lastRecalculateAnimationFrame = window.requestAnimationFrame(() => {
      this.reCalculateColumnCount();
    });
  }

  reCalculateColumnCount() {
    const windowWidth = (window && window.innerWidth) || Infinity;
    let breakpointColsObject = this.props.breakpointCols;

    // Allow passing a single number to `breakpointCols` instead of an object
    if (typeof breakpointColsObject !== "object") {
      breakpointColsObject = {
        default: parseInt(breakpointColsObject) || DEFAULT_COLUMNS,
      };
    }

    let matchedBreakpoint = Infinity;
    let columns = breakpointColsObject.default || DEFAULT_COLUMNS;

    for (let breakpoint in breakpointColsObject) {
      const optBreakpoint = parseInt(breakpoint);
      const isCurrentBreakpoint =
        optBreakpoint > 0 && windowWidth <= optBreakpoint;

      if (isCurrentBreakpoint && optBreakpoint < matchedBreakpoint) {
        matchedBreakpoint = optBreakpoint;
        columns = breakpointColsObject[breakpoint];
      }
    }

    columns = Math.max(1, parseInt(columns) || 1);

    if (this.state.columnCount !== columns) {
      this.setState({
        columnCount: columns,
      });
    }
  }

  getMinIndex() {
    return this.state.columnsHeight.indexOf(_.min(this.state.columnsHeight));
  }

  generateItemsInColumns() {
    const { dataSource } = this.props;
    const currentColumnCount = this.state.columnCount;
    const itemsInColumns = [[], [], [], [], []];

    // Force children to be handled as an array
    const items = React.Children.toArray(this.props.children);

    if (!items.length) return [];
    console.log("items.length", items.length);
    for (let i = 0; i < items.length; i++) {
      // 初始化每列
      // const columnIndex = i % currentColumnCount;
      // if (!itemsInColumns[columnIndex]) {
      //   itemsInColumns[columnIndex] = [];
      // }
      //  判断每列最短，然后添加元素到数组中
      let lowestIndex = this.getMinIndex();
      console.log("lowestIndex", lowestIndex);
      console.log("itemsInColumns", itemsInColumns);
      itemsInColumns[lowestIndex].push(items[i]);

      const img = dataSource[i];
      const ratio = img.originHeight / img.originWidth;
      const afterHeight = (ratio * ContainerWidth) / this.state.columnCount;
      this.state.columnsHeight[lowestIndex] =
        this.state.columnsHeight[lowestIndex] + afterHeight;
    }

    return itemsInColumns;
  }

  renderColumns() {
    const { column, columnAttrs = {}, columnClassName } = this.props;
    const childrenInColumns = this.generateItemsInColumns();
    const columnWidth = `${100 / childrenInColumns.length}%`;
    let className = columnClassName;

    if (className && typeof className !== "string") {
      this.logDeprecated('The property "columnClassName" requires a string');

      // This is a deprecated default and will be removed soon.
      if (typeof className === "undefined") {
        className = "my-masonry-grid_column";
      }
    }

    const columnAttributes = {
      // NOTE: the column property is undocumented and considered deprecated.
      // It is an alias of the `columnAttrs` property
      ...column,
      ...columnAttrs,
      style: {
        ...columnAttrs.style,
        width: columnWidth,
      },
      className,
    };

    return childrenInColumns.map((items, i) => {
      return (
        <div {...columnAttributes} key={i}>
          {items}
        </div>
      );
    });
  }

  logDeprecated(message) {
    console.error("[Masonry]", message);
  }

  render() {
    const {
      // ignored
      children,
      breakpointCols,
      columnClassName,
      columnAttrs,
      column,

      // used
      className,

      ...rest
    } = this.props;

    let classNameOutput = className;

    if (typeof className !== "string") {
      this.logDeprecated('The property "className" requires a string');

      // This is a deprecated default and will be removed soon.
      if (typeof className === "undefined") {
        classNameOutput = "my-masonry-grid";
      }
    }

    return (
      <div {...rest} className={classNameOutput}>
        {this.renderColumns()}
      </div>
    );
  }
}

Masonry.defaultProps = defaultProps;

export default Masonry;
