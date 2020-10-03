declare class UserAgent {
    ua: string;
    constructor();
    isIE: () => boolean;
    isFireFox: () => boolean;
    isSafari: () => boolean;
    isiOS: () => boolean;
    deviceType: () => 'sp' | 'tab' | 'pc';
}
export { UserAgent };
