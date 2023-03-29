export function canUseDOM() {
  return !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );
}

// 深度取值
export const getIn = (
  path: Array<string | number>,
  object,
  defaultValue?: any
) => {
  const isTrue = (v) => !!v || v === 0;
  return path.reduce(
    (xs, x) => (isTrue(xs) && isTrue(xs[x]) ? xs[x] : defaultValue),
    object
  );
};
