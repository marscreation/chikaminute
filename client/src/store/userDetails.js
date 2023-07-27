function userData() {
  try {
    const user = JSON.parse(
      atob(sessionStorage.getItem("token").split(".")[1])
    );
    return user;
  } catch (error) {
    return {};
  }
}
export const User = userData();
