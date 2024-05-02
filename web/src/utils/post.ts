/**
 * POST data to the server.
 * @param url
 * @param data
 * @returns
 */

const baseURL = "http://localhost:3000/api/";
export async function post(path = "", data = {}) {
  const url = new URL(path, baseURL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
