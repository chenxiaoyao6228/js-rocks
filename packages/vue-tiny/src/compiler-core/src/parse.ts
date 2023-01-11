import { NodeTypes } from './ast';

const enum TagType {
  Start,
  End,
}

export function baseParse (content: string) {
  const context = createParserContext(content);
  return createRoot(parseChildren(context));
}

function parseChildren (context: any) {
  const nodes: any = [];

  let node;
  const s = context.source;
  if (s.startsWith('{{')) {
    node = parseInterpolation(context);
  } else if (s[0] === '<') {
    if (/[a-z]/i.test(s[1])) {
      node = parseElement(context);
    }
  }

  if (!node) {
    node = parseText(context);
  }

  nodes.push(node);

  return nodes;
}

function parseText (context: any) {
  const content = parseTextData(context, context.source.length);
  return {
    type: NodeTypes.TEXT,
    content,
  };
}

function parseTextData (context: any, length: number) {
  const content = context.source.slice(0, length);
  advanceBy(context, length);
  return content;
}

function parseElement (context: any) {
  const element = parseTag(context, TagType.Start);

  parseTag(context, TagType.End);

  return element;
}

// <div></div>
function parseTag (context: any, type: TagType) {
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
function parseInterpolation (context: any) {
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

function advanceBy (context: any, length: number) {
  context.source = context.source.slice(length);
}

function createRoot (children) {
  return {
    children,
  };
}

function createParserContext (content: string): any {
  return {
    source: content,
  };
}