export type State = string | null;

export type States = { [key: string]: string | {
    class?: string,
    ani?: string,
} };

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