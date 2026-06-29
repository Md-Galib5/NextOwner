export const saveToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("nextowner-token", token);
  }
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("nextowner-token");
  }
  return null;
};

export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("nextowner-token");
  }
};