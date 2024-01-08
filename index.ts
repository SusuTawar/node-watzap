import { fetch } from "undici";

export default class WatZap {
  private apiKey;
  private baseUrl;

  constructor(apiKey: string = "", baseUrl: string = "") {
    this.apiKey = { api_key: apiKey };
    this.baseUrl = baseUrl.replace(/\/+$/, "");
  }

  setKey(apiKey: string) {
    this.apiKey = { api_key: apiKey };
  }

  private url(endpoint: string) {
    return `${this.baseUrl}/${endpoint.replace(/^\/+/, "")}`;
  }

  private body(obj: any = {}) {
    return JSON.stringify({
      ...this.apiKey,
      ...obj,
    });
  }

  status() {
    return fetch(this.url("checking_key"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: this.body(),
    });
  }

  validate(numberKey: string, phoneNo: string) {
    return fetch(this.url("validate_number"), {
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

  groups(numberKey: string) {
    return fetch(this.url("groups"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: this.body({
        number_key: numberKey,
      }),
    });
  }

  send(
    numberKey: string,
    receiver: string,
    message: string,
    toGroup: boolean = false
  ) {
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
    return fetch(url, content);
  }

  image(
    numberKey: string,
    receiver: string,
    imageUrl: string,
    caption: string = "",
    separateCaption: boolean = false,
    toGroup: boolean = false
  ) {
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
    return fetch(url, content);
  }

  file(
    numberKey: string,
    receiver: string,
    fileUrl: string,
    toGroup: boolean = false
  ) {
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
    return fetch(url, content);
  }

  setWebhook(numberKey: string, endpoint: string) {
    return fetch(this.url("set_webhook"), {
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

  getWebhook(numberKey: string) {
    return fetch(this.url("get_webhook"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: this.body({
        number_key: numberKey,
      }),
    });
  }

  removeWebhook(numberKey: string) {
    return fetch(this.url("unset_webhook"), {
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
