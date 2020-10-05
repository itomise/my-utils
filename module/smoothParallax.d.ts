declare type ContentType = {
    wrap: string;
    min: number;
    max: number;
    isRandom?: boolean;
};
declare class SmoothParallax {
    target: HTMLInputElement;
    dummy: HTMLInputElement | HTMLElement;
    docY: number;
    lerpY: number;
    ease: number;
    reqId: number;
    items: Item[];
    constructor(target: string, ease: number, contents?: ContentType[], dummy?: string);
    static getPageYScroll: () => number;
    style: () => void;
    onScroll: () => number;
    update: () => void;
    reset: () => void;
    destroy: () => void;
}
declare class Item {
    wrap: HTMLInputElement;
    min: number;
    max: number;
    winHeight: number;
    isVisible: boolean;
    constructor(wrap: HTMLInputElement, min: number, max: number, isRandom?: boolean);
    update: () => void;
    reset: () => void;
}
export default SmoothParallax;
