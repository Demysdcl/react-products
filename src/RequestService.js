import axios from "axios";

export class RequestService {
  url = "";
  constructor(url) {
    this.url = url;
  }

  api = axios.create({
    baseURL: "http://localhost:3001/"
  })

  get = (params = "") => {
    return this.api.get(`${this.url}?${params}`);
  };

  post = data => {
    return this.api.post(this.url, data);
  };

  delete = id => {
    return this.api.delete(`${this.url}/${id}`);
  };
}
