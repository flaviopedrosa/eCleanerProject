import { k as createComponent, aE as useAlignProps, aF as useAlign, l as computed, m as h, n as hSlot } from "./index-DcwkHxen.js";
const QCardActions = createComponent({
  name: "QCardActions",
  props: {
    ...useAlignProps,
    vertical: Boolean
  },
  setup(props, { slots }) {
    const alignClass = useAlign(props);
    const classes = computed(
      () => `q-card__actions ${alignClass.value} q-card__actions--${props.vertical === true ? "vert column" : "horiz row"}`
    );
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
export {
  QCardActions as Q
};
//# sourceMappingURL=QCardActions-kxyzVYOt.js.map
