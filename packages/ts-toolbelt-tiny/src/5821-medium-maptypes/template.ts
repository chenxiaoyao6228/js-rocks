interface MapConfig {
  mapFrom: unknown;
  mapTo: unknown;
}

type ComputeType<T, R extends MapConfig> = R extends { mapFrom: T } ? R['mapTo'] : never;

type MapTypes<T, R extends MapConfig> = {
  [P in keyof T]: [ComputeType<T[P], R>] extends [never] ? T[P] : ComputeType<T[P], R>;
};
