"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const undici_1 = require("undici");
class WatZap {
    constructor(apiKey = "", baseUrl = "") {
        this.apiKey = { api_key: apiKey };
        this.baseUrl = baseUrl.replace(/\/+$/, "");
    }
    setKey(apiKey) {
        this.apiKey = { api_key: apiKey };
    }
    url(endpoint) {
        return `${this.baseUrl}/${endpoint.replace(/^\/+/, "")}`;
    }
    body(obj = {}) {
        return JSON.stringify(Object.assign(Object.assign({}, this.apiKey), obj));
    }
    status() {
        return (0, undici_1.fetch)(this.url("checking_key"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: this.body(),
        });
    }
    validate(numberKey, phoneNo) {
        return (0, undici_1.fetch)(this.url("validate_number"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: this.body({
                number_key: numberKey,
                phone_no: phoneNo,
            }),
        });
    }
    groups(numberKey) {
        return (0, undici_1.fetch)(this.url("groups"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: this.body({
                number_key: numberKey,
            }),
        });
    }
    send(numberKey, receiver, message, toGroup = false) {
        const url = this.url(toGroup ? "send_message_group" : "send_message");
        const content = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: this.body({
                number_key: numberKey,
                message,
                [toGroup ? "group_id" : "phone_no"]: receiver,
            }),
        };
        return (0, undici_1.fetch)(url, content);
    }
    image(numberKey, receiver, imageUrl, caption = "", separateCaption = false, toGroup = false) {
        const url = this.url(toGroup ? "send_image_group" : "send_image_url");
        const content = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: this.body({
                number_key: numberKey,
                url: imageUrl,
                message: caption,
                separate_caption: separateCaption ? 1 : 0,
                [toGroup ? "group_id" : "phone_no"]: receiver,
            }),
        };
        return (0, undici_1.fetch)(url, content);
    }
    file(numberKey, receiver, fileUrl, toGroup = false) {
        const url = this.url(toGroup ? "send_file_group" : "send_file_url");
        const content = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: this.body({
                number_key: numberKey,
                url: fileUrl,
                [toGroup ? "group_id" : "phone_no"]: receiver,
            }),
        };
        return (0, undici_1.fetch)(url, content);
    }
    setWebhook(numberKey, endpoint) {
        return (0, undici_1.fetch)(this.url("set_webhook"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: this.body({
                number_key: numberKey,
                endpoint_url: endpoint,
            }),
        });
    }
    getWebhook(numberKey) {
        return (0, undici_1.fetch)(this.url("get_webhook"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: this.body({
                number_key: numberKey,
            }),
        });
    }
    removeWebhook(numberKey) {
        return (0, undici_1.fetch)(this.url("unset_webhook"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: this.body({
                number_key: numberKey,
            }),
        });
    }
}
exports.default = WatZap;
//# sourceMappingURL=index.js.map