import { HTTPClient } from "../../Domine/IPatterns";

export class ClientAPI implements HTTPClient {
  private async http(request: RequestInfo): Promise<Response> {
    try {
      // Loading.show();
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 25000);
      const response: Response = await fetch(request, {
        signal: controller.signal,
      });
      clearTimeout(id);
      // Loading.hide();
      return response;
    } catch (err: any) {
      // Loading.hide();

      if (err.name === "TimeoutError") {
        throw Error("Timeout: It took more than 5 seconds to get the result!");
      } else if (err.name === "AbortError") {
        throw Error("Fetch aborted AbortSignal.timeout()");
      } else if (err.name === "TypeError") {
        throw Error(" method is not supported");
      } else {
        throw Error(`Error: type: ${err.name}, message: ${err.message}`);
      }
    }
  }

  private urlQueryParameter(urlBase: string, parameters: object): string {
    urlBase = urlBase.concat("?");
    for (const [key, value] of Object.entries(parameters)) {
      urlBase = urlBase.concat(key, "=", value, "&");
    }
    const fullUrl = urlBase.slice(0, -1);
    return fullUrl;
  }

  private validateUrl(url: string) {
    if (url === undefined || url === "") {
      throw new URIError("url is undefined");
    }
  }

  async GET(path: string, queryparams?: object): Promise<Response> {
    this.validateUrl(path);
    const args: RequestInit = {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    if (queryparams != undefined) {
      path = this.urlQueryParameter(path, queryparams);
    }
    const response = await this.http(new Request(path, args));
    return response;
  }

  async POST(path: string, body: unknown): Promise<Response> {
    this.validateUrl(path);
    const args: RequestInit = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await this.http(new Request(path, args));
  }

  async PUT(path: string, body: unknown): Promise<Response> {
    this.validateUrl(path);
    const args: RequestInit = {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await this.http(new Request(path, args));
  }

  async DELETE(path: string): Promise<Response> {
    this.validateUrl(path);
    const args: RequestInit = { method: "DELETE" };
    return await this.http(new Request(path, args));
  }
}
