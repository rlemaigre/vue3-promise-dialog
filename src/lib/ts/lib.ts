import {ComponentPublicInstance, shallowRef} from "vue";

interface DialogInstance {
    dialog: ComponentPublicInstance;
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

/**
 * Creates a function that opens the given dialog component with some props in the given wrapper. The function returns
 * a promise that will resolve when closeDialog(data) is called.
 */
export function openDialogFunction<P, R>(dialog: ComponentPublicInstance, wrapper: string = 'default'): (props: P) => Promise<R> {
    return (props: any) => new Promise(resolve => {
        dialogRef.value.dialog = dialog;
        dialogRef.value.props = props;
        dialogRef.value.wrapper = wrapper;
        dialogRef.value.resolve = resolve;
    });
}