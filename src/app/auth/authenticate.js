let isAuthenticated = false;
let userData = null;

if (typeof window !== 'undefined') {
  userData = sessionStorage.getItem("user");
}

if (userData) {
  isAuthenticated = true;
}

export default isAuthenticated