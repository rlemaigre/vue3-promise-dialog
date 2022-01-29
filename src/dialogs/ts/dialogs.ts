import {openDialog} from "../../../lib/ts/lib";
import ConfirmDialog from "../components/ConfirmDialog.vue";
import TextDialog from "../components/TextDialog.vue";

/**
 * Opens a confirm dialog.
 */
export async function confirm(text: string) {
    return await openDialog(ConfirmDialog, {text});
}

/**
 * Opens a prompt dialog.
 */
export async function promptText(label: string) {
    return await openDialog(TextDialog, {label});
}