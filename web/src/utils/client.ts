/**
 * POST data to the server.
 * @param url
 * @param data
 * @returns
 */
import { throwHttpError } from "../types/httpErrors";

const baseURL = "http://localhost:8080/api/";
export async function get(path = "") {
  const url = new URL(path, baseURL);
  const response = await fetch(url, {
    credentials: "include",
  });
  if (!response.ok) {
    throwHttpError(response.status);
  }
  return response.json();
}

export async function post(path = "", data = {}) {
  const url = new URL(path, baseURL);
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throwHttpError(response.status);
  }
  return response.json();
}
