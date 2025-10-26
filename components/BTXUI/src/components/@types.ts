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

export type DataTreeItem = {
    id: string,
    text: string,
    level?: number,
    checkbox?: boolean,
    selected?: boolean,
    spread?: boolean,
    children?: dataTreeItem[],
    prefix?: number,
    parent?: dataTreeItem,
}