const supportsSymbol = typeof Symbol === 'function' && Symbol.for;

export const REACT_ELEMENT_TYPE = supportsSymbol ? Symbol.for('react.element') : 0xeac7;
