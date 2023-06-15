import {
  AllowedComponentProps,
  Component,
  VNodeProps,
  shallowReactive,
} from "vue";

export interface DialogInstance {
  comp?: any;
  dialog: Component;
  wrapper: string;
  props: unknown;
  resolve: (data: unknown) => void;
}

export const dialogRefs = shallowReactive<DialogInstance[]>([]);

/**
 * Closes last opened dialog, resolving the promise with the return value of the dialog, or with the given
 * data if any.
 */
export function closeDialog(data?: unknown) {
  const lastDialog = dialogRefs.pop();
  if (data === undefined) {
    data = lastDialog.comp.returnValue();
  }
  lastDialog.resolve(data);
}

/**
 * Extracts the type of props from a component definition.
 */
type PropsType<C extends Component> = C extends new (...args: any) => any
  ? Omit<
      InstanceType<C>["$props"],
      keyof VNodeProps | keyof AllowedComponentProps
    >
  : C extends (__VLS_props: infer U) => any
  ? U
  : never;

/**
 * Extracts the return type of the dialog from the setup function.
 */
type BindingReturnType<C extends Component> = C extends new (
  ...args: any
) => any
  ? InstanceType<C> extends { returnValue: () => infer Y }
    ? Y
    : never
  : C extends (
      __VLS_props: any,
      __VLS_ctx: any,
      __VLS_setup: { expose: (exposed: { returnValue: () => infer Y }) => any }
    ) => any
  ? Y
  : never;

/**
 * Opens a dialog.
 * @param dialog The dialog you want to open.
 * @param props The props to be passed to the dialog.
 * @param wrapper The dialog wrapper you want the dialog to open into.
 * @return A promise that resolves when the dialog is closed
 */
export function openDialog<C extends Component>(
  dialog: C,
  props?: PropsType<C>,
  wrapper: string = "default"
): Promise<BindingReturnType<C>> {
  return new Promise((resolve) => {
    dialogRefs.push({
      dialog,
      props,
      wrapper,
      resolve,
    });
  });
}

export const PromiseDialog = {
  install: (app) => {
    app.config.globalProperties.$close = (comp, alternateValue) => {
      closeDialog(alternateValue);
    };
  },
};
