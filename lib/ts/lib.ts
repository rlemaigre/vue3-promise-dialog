import { Component, shallowReactive } from "vue";
import { DefineComponent } from "@vue/runtime-core";

export interface DialogInstance {
  comp?: any;
  dialog: Component;
  wrapper: string;
  props: any;
  resolve: (data: any) => void;
}

export const dialogRefs = shallowReactive<DialogInstance[]>([]);

/**
 * Closes last opened dialog, resolving the promise with the return value of the dialog, or with the given
 * data if any.
 */
export function closeDialog(data?: any) {
  const lastDialog = dialogRefs.pop();
  if (data === undefined) {
    data = lastDialog.comp.returnValue();
  }
  lastDialog.resolve(data);
}

/**
 * Extracts the type of props from a component definition.
 */
type PropsType<C extends DefineComponent<any, any, any>> =
  InstanceType<C>["$props"];

/**
 * Extracts the return type of the dialog from the setup function.
 */
type BindingReturnType<C extends DefineComponent<any, any, any>> =
  C extends DefineComponent<any, infer X, any>
    ? X extends { returnValue: () => infer Y }
      ? Y
      : never
    : never;

/**
 * Extracts the return type of the dialog from the methods.
 */
type MethodReturnType<C extends DefineComponent<any, any, any, any, any>> =
  C extends DefineComponent<any, any, any, any, infer X>
    ? X extends { returnValue: () => infer Y }
      ? Y
      : never
    : never;

/**
 * Extracts the return type of the dialog either from the setup method or from the methods.
 */
type ReturnType<C extends DefineComponent<any, any, any, any, any>> =
  BindingReturnType<C> extends never
    ? MethodReturnType<C>
    : BindingReturnType<C>;

/**
 * Opens a dialog.
 * @param dialog The dialog you want to open.
 * @param props The props to be passed to the dialog.
 * @param wrapper The dialog wrapper you want the dialog to open into.
 * @return A promise that resolves when the dialog is closed
 */
export function openDialog<C extends DefineComponent<any, any, any, any, any>>(
  dialog: C,
  props?: PropsType<C>,
  wrapper: string = "default"
): Promise<ReturnType<C>> {
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
