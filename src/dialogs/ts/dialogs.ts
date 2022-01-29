import {openDialog} from "../../../lib/ts/lib";
import ConfirmBox from "../components/ConfirmBox.vue";
import TextBox from "../components/TextBox.vue";

export async function confirm(text: string) {
    return await openDialog(ConfirmBox, {text});
}

export async function promptText(label: string) {
    return await openDialog(TextBox, {label});
}