import {openDialogFunction} from "../../../lib/index";
import ConfirmBox from "../components/ConfirmBox.vue";
import TextBox from "../components/TextBox.vue";

export const openConfirmDialog = openDialogFunction<{ text: string }, boolean>(ConfirmBox);

export async function confirm(text: string) {
    return await openConfirmDialog({text})
}

export const openTextDialog = openDialogFunction<{ label: string }, string>(TextBox);

export async function promptText(label: string) {
    return await openTextDialog({label})
}