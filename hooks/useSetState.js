import { useState } from 'react';

export const useSetState = (initial) => {
  const [set, setSet] = useState(new Set(initial));
  return {
    add: (el) =>
      setSet((set) => {
        if (set.has(el)) return set;
        set.add(el);
        return new Set(set);
      }),
    delete: (el) => {
      setSet((set) => {
        if (!set.has(el)) return set;
        set.delete(el);
        return new Set(set);
      });
    },
    has: (el) => set.has(el),
    clear: () => setSet(new Set()),
    forEach: (fn) => set.forEach(fn),
    keys: () => set.keys(),
    values: () => set.values(),
  };
};
