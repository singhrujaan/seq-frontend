export function getToken(): string | any {
  if (typeof window !== 'undefined' && window.localStorage) {
    // Access localStorage here
    // For example:
    // localStorage.setItem('key', 'value');
    var token = localStorage.getItem("token");
  
  if (!token) {
    localStorage.clear();
    window.location.href = "/login";
    return;
  }
  return `${token}`;
}
}

export function getHeaders(): any {
  const token: string = getToken();
  const headers: any = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (token) {
    headers["x-token"] = token;
  }
  return headers;
}