import {closeDialog} from "../ts/lib";

export default {
    install: (app, options) => {
        app.config.globalProperties.$close = (comp, alternateValue) => {
            if (alternateValue !== undefined) {
                closeDialog(alternateValue);
            } else {
                closeDialog(comp.returnValue());
            }
        }
    }
}