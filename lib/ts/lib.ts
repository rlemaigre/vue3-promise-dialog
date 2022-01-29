import {Component, shallowRef} from "vue";
import {DefineComponent} from "@vue/runtime-core";

interface DialogInstance {
    dialog: Component;
    wrapper: string;
    props: any;
    resolve: (data: any) => void;
}

export const dialogRef = shallowRef<DialogInstance>();

/**
 * Closes the currently opened dialog, resolving the promise with the given data.
 */
export function closeDialog(data: any) {
    dialogRef.value.resolve(data);
    dialogRef.value = null;
}

type PropsType<C extends DefineComponent<any, any, any>> = InstanceType<C>["$props"];

type ReturnType<C extends DefineComponent<any, any, any>> = C extends DefineComponent<any, infer X, any> ?
    (X extends { returnValue: () => infer Y } ? Y : never)
    : never;

export function openDialog<C extends DefineComponent<any, any, any, any, any>>(dialog: C, props?: PropsType<C>, wrapper: string = 'default'): Promise<ReturnType<C>> {
    return new Promise(resolve => {
        dialogRef.value = {
            dialog,
            props,
            wrapper,
            resolve
        }
    });
}
