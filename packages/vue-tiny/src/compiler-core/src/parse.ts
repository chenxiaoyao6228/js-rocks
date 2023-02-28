import { NodeTypes } from './ast';

const enum TagType {
  Start,
  End,
}

export function baseParse(content: string) {
  const context = createParserContext(content);
  // parse ancestors array recursively
  return createRoot(parseChildren(context, []));
}

// main state transition diagram
function parseChildren(context: any, ancestors) {
  const nodes: any = [];

  let node;
  const s = context.source;
  // 💥: the key pointer is to understand this diagram
  while (!isEnd(context, ancestors)) {
    console.log('context.source', context.source);
    if (s.startsWith('{{')) {
      node = parseInterpolation(context);
    } else if (s[0] === '<') {
      if (/[a-z]/i.test(s[1])) {
        node = parseElement(context, ancestors);
      }
    }

    if (!node) {
      node = parseText(context);
    }
    nodes.push(node);
  }

  return nodes;
}
// parse startTag, children and endTag
function parseElement(context: any, ancestors) {
  const element: any = parseTag(context, TagType.Start);

  ancestors.push(element);

  const children = parseChildren(context, ancestors);
  element.children = children;

  ancestors.pop();

  parseTag(context, TagType.End);

  return element;
}

// hi,{{message}}
function parseText(context: any) {
  let endIndex = context.source.length;
  const endToken = '{{';
  const index = context.source.indexOf(endToken);
  if (index !== -1) {
    endIndex = index;
  }

  const content = parseTextData(context, endIndex);
  advanceBy(context, content.length);
  return {
    type: NodeTypes.TEXT,
    content,
  };
}

function parseTextData(context: any, length: number) {
  const content = context.source.slice(0, length);
  advanceBy(context, length);
  return content;
}

// tag element and attribute
function parseTag(context: any, type: TagType) {
  const match: any = /^<\/?([a-z]*)/i.exec(context.source);
  const tag = match[1];

  advanceBy(context, match[0].length);
  advanceBy(context, 1);

  if (type === TagType.End) return;

  return {
    type: NodeTypes.ELEMENT,
    tag,
  };
}

// {{message}}
function parseInterpolation(context: any) {
  const openDelimiter = '{{';
  const closeDelimiter = '}}';

  const closeIndex = context.source.indexOf(closeDelimiter, openDelimiter.length);

  advanceBy(context, openDelimiter.length);

  const rawContentLength = closeIndex - openDelimiter.length;

  const rawContent = parseTextData(context, rawContentLength);
  const content = rawContent.trim();

  advanceBy(context, rawContentLength + closeDelimiter.length);

  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      content: content,
    },
  };
}

function advanceBy(context: any, length: number) {
  context.source = context.source.slice(length);
}

function createRoot(children) {
  return {
    children,
  };
}

function createParserContext(content: string): any {
  return {
    source: content,
  };
}

function isEnd(context, ancestors) {
  //💥: Termination condition : 1. input source empty 2. when encounter end tag of parent
  if (!context.source.length) {
    return true;
  }
  const parent = ancestors[ancestors.length - 1];
  if (parent && context.source.startsWith(`</${parent.tag}`)) {
    return true;
  }

  return false;
}
