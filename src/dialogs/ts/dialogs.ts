import {openDialog} from "../../../lib/ts/lib";
import ConfirmBox from "../components/ConfirmBox.vue";
import TextBox from "../components/TextBox.vue";

/**
 * Opens a confirm dialog.
 */
export async function confirm(text: string) {
    return await openDialog(ConfirmBox, {text});
}

/**
 * Opens a prompt dialog.
 */
export async function promptText(label: string) {
    return await openDialog(TextBox, {label});
}