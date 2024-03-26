export type State = string | null;

export interface ViewData {
    class?: any,
    state?: State,
    states?: { [key: string]: any },
    bgImg?: string,
    matrix?: {
        translate?: string,
        scale?: string,
        rotate?: string,
        skew?: string
    },
    cname?: string
};