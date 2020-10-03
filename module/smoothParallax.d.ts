declare class SmoothParallax {
    target: HTMLInputElement;
    dummy: HTMLInputElement | HTMLElement;
    currentTargetHeight: number;
    docY: number;
    lerpY: number;
    amount: number;
    reqId: number;
    items: Item[];
    constructor(target: string, amount: number, contents?: [], dummy?: string);
    static getPageYScroll: () => number;
    style: () => void;
    onScroll: () => number;
    update: () => void;
    reset: () => void;
    destroy: () => void;
}
declare class Item {
    ele: HTMLInputElement;
    startVal: number;
    endVal: number;
    constructor(ele: HTMLInputElement);
    update: (scrollVal: number) => void;
}
export default SmoothParallax;
