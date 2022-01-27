import {openDialogFunction} from "../../../lib/index";
import ConfirmBox from "../components/ConfirmBox.vue";

export const openConfirmDialog = openDialogFunction<{ text: string }, boolean>(ConfirmBox);

export async function confirm(text: string) {
    return await openConfirmDialog({text})
}