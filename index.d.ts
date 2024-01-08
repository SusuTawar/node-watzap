export default class WatZap {
    private apiKey;
    private baseUrl;
    constructor(apiKey?: string, baseUrl?: string);
    setKey(apiKey: string): void;
    private url;
    private body;
    status(): Promise<import("undici").Response>;
    validate(numberKey: string, phoneNo: string): Promise<import("undici").Response>;
    groups(numberKey: string): Promise<import("undici").Response>;
    send(numberKey: string, receiver: string, message: string, toGroup?: boolean): Promise<import("undici").Response>;
    image(numberKey: string, receiver: string, imageUrl: string, caption?: string, separateCaption?: boolean, toGroup?: boolean): Promise<import("undici").Response>;
    file(numberKey: string, receiver: string, fileUrl: string, toGroup?: boolean): Promise<import("undici").Response>;
    setWebhook(numberKey: string, endpoint: string): Promise<import("undici").Response>;
    getWebhook(numberKey: string): Promise<import("undici").Response>;
    removeWebhook(numberKey: string): Promise<import("undici").Response>;
}
