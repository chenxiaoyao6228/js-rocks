import { NodeTypes } from './ast';

const enum TagType {
  Start,
  End,
}

export function baseParse(content: string) {
  const context = createParserContext(content);
  return createRoot(parseChildren(context));
}

function parseChildren(context: any) {
  const nodes: any = [];

  let node;
  const s = context.source;
  while (!isEnd(context)) {
    if (s.startsWith('{{')) {
      node = parseInterpolation(context);
    } else if (s[0] === '<') {
      if (/[a-z]/i.test(s[1])) {
        node = parseElement(context);
      }
    }

    if (!node) {
      console.log('1111', 1111);
      node = parseText(context);
    }
    nodes.push(node);
  }

  return nodes;
}

function parseElement(context: any) {
  const element: any = parseTag(context, TagType.Start);

  const children = parseChildren(context);

  element.children = children;

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
  console.log('context.source1111', context.source);
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
function isEnd(context) {
  console.log('context inEnd', context);
  if (!context.source.length) {
    return true;
  }
  return false;
}
