import {Component, shallowRef} from "vue";
import {DefineComponent} from "@vue/runtime-core";

export interface DialogInstance {
    comp?: any;
    dialog: Component;
    wrapper: string;
    props: any;
    resolve: (data: any) => void;
    reject: (err: Error) => void;
}

export class DismissedDialog extends Error {}

export const dialogRef = shallowRef<DialogInstance>();

/**
 * Closes the currently opened dialog, resolving the promise with the return value of the dialog, or with the given
 * data if any.
 */
export function resolveDialog(data?: any): void {
    if (data === undefined) {
        data = dialogRef.value.comp.returnValue();
    }
    dialogRef.value.resolve(data);
    dialogRef.value = null;
}

/**
 * Closes the currently opened dialog, rejecting the promise with a DismissedDialog error, or with the given
 * error if any.
 */
export function rejectDialog(err?: Error): void {
    dialogRef.value.reject(err ?? new DismissedDialog('Dialog was dismissed.'));
    dialogRef.value = null;
}

/**
 * This is kept for backward compatility. Call either `resolveDialog()` or `rejectDialog()` instead.
 * @deprecated
 */
export function closeDialog(data?: any): void {
    if (data instanceof Error) {
        rejectDialog(data);
    } else {
        resolveDialog(data);
    }
}

/**
 * Extracts the type of props from a component definition.
 */
type PropsType<C extends DefineComponent<any, any, any>> = InstanceType<C>["$props"];

/**
 * Extracts the return type of the dialog from the setup function.
 */
type BindingReturnType<C extends DefineComponent<any, any, any>> = C extends DefineComponent<any, infer X, any> ?
    (X extends { returnValue: () => infer Y } ? Y : never)
    : never;

/**
 * Extracts the return type of the dialog from the methods.
 */
type MethodReturnType<C extends DefineComponent<any, any, any, any, any>> = C extends DefineComponent<any, any, any, any, infer X> ?
    (X extends { returnValue: () => infer Y } ? Y : never)
    : never;

/**
 * Extracts the return type of the dialog either from the setup method or from the methods.
 */
type ReturnType<C extends DefineComponent<any, any, any, any, any>> = BindingReturnType<C> extends never ? MethodReturnType<C> : BindingReturnType<C>;

/**
 * Opens a dialog.
 * @param dialog The dialog you want to open.
 * @param props The props to be passed to the dialog.
 * @param wrapper The dialog wrapper you want the dialog to open into.
 * @return A promise that resolves when the dialog is closed
 */
export function openDialog<C extends DefineComponent<any, any, any, any, any>>(dialog: C, props?: PropsType<C>, wrapper: string = 'default'): Promise<ReturnType<C>> {
    return new Promise((resolve, reject) => {
        dialogRef.value = {
            dialog,
            props,
            wrapper,
            resolve,
            reject
        }
    });
}

export const PromiseDialog = {
    install: (app, options) => {
        app.config.globalProperties.$close = (comp, alternateValue) => {
            closeDialog(alternateValue);
        }
    }
}
