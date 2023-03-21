// use bit operation to update

export type Flags = number;

// bitmask
export const NoFlags = 0b0000000;
export const Placement = 0b0000001;
export const Update = 0b0000010;
export const Deletion = 0b0000100;
export const ChildDeletion = 0b00001000;
