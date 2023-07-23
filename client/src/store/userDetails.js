const { firstname, lastname, email, id } = JSON.parse(
    atob(sessionStorage.getItem("token").split(".")[1])
);
export const User = { id, firstname, lastname, email };
