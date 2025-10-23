import { l as computed } from "./index-DcwkHxen.js";
const useDarkProps = {
  dark: {
    type: Boolean,
    default: null
  }
};
function useDark(props, $q) {
  return computed(() => props.dark === null ? $q.dark.isActive : props.dark);
}
export {
  useDark as a,
  useDarkProps as u
};
//# sourceMappingURL=use-dark-XRAlznJ5.js.map
