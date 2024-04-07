export type Label = string | [string, string];

export interface CheckboxData {
    selected: boolean,
    class?: string,
    actColor?: {
        text?: string,
        bg?: string,
        icon?: string,
    },
    label?: Label,
};