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
  // 💥: the key point is to understand this diagram
  while (!isEnd(context, ancestors)) {
    // console.log('context.source', context.source);
    if (context.source.startsWith('{{')) {
      node = parseInterpolation(context);
    } else if (context.source[0] === '<') {
      if (/[a-z]/i.test(context.source[1])) {
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

  if (startsWithEndTagOpen(context.source, element.tag)) {
    parseTag(context, TagType.End);
  } else {
    throw new Error(`Missing endTag: ${element.tag}`);
  }
  return element;
}

// hi,{{message}}
function parseText(context: any) {
  let endIndex = context.source.length;
  const endTokens = ['{{', '</'];
  endTokens.forEach(endToken => {
    const index = context.source.indexOf(endToken);
    if (index !== -1 && endIndex > index) {
      endIndex = index;
    }
  });

  const content = parseTextData(context, endIndex);
  advanceBy(context, content.length);
  return {
    type: NodeTypes.TEXT,
    content,
  };
}

function parseTextData(context: any, length: number) {
  const content = context.source.slice(0, length);
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
    type: NodeTypes.ROOT,
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
  const s = context.source;
  if (s.startsWith('</')) {
    for (let i = ancestors.length - 1; i >= 0; i--) {
      const tag = ancestors[i].tag;
      if (startsWithEndTagOpen(s, tag)) {
        return true;
      }
    }
  }
  return false;
}

function startsWithEndTagOpen(source, tag) {
  return (
    source.startsWith('</') && source.slice(2, 2 + tag.length).toLowerCase() === tag.toLowerCase()
  );
}
