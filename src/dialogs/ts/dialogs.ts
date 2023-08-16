import { openDialog } from "../../../lib/ts/lib";
import ConfirmDialog from "../components/ConfirmDialog.vue";
import ConfirmedInput from "../components/ConfirmedInput.vue";
import GenericDialog from "../components/GenericDialog.vue";
import TextDialog from "../components/TextDialog.vue";

/**
 * Opens a confirm dialog.
 */
export async function confirm(text: string) {
  return await openDialog(ConfirmDialog, {
    text,
  });
}

/**
 * Opens a prompt dialog.
 */
export async function promptText(label: string) {
  return await openDialog(TextDialog, {
    label,
  });
}

/**
 * Opens nested dialog.
 */
export async function nested(label: string) {
  return await openDialog(ConfirmedInput, {
    label,
  });
}

/**
 * Opens nested dialog.
 */
export async function generic<T extends string | number>(value: T) {
  const a = await openDialog(GenericDialog<T>, {
    genValue: value,
  });
  return a;
}
