declare function SimpleVue<D, C, M>(options: {
  data(this: {}): D;
  computed: C & ThisType<D>;
  methods: M &
    ThisType<
      D &
        M & {
          [k in keyof C]: C[k] extends (...args: any[]) => infer R ? R : never;
        }
    >;
}): any;
