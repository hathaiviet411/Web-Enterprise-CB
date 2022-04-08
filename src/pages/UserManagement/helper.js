import { MakeToast } from "@/toast/toastMessage";

export function isPassValidation(DATA = {}) {
  if (DATA) {
    if (DATA.username.length === 0) {
      MakeToast({
        variant: "warning",
        title: "Warning",
        content: "Username is required.",
      });
    } else if (/\s/g.test(DATA.username) === true) {
      MakeToast({
        variant: "warning",
        title: "Warning",
        content: "Username cannot contain space.",
      });
    } else if (DATA.email.length === 0) {
      MakeToast({
        variant: "warning",
        title: "Warning",
        content: "Email is required.",
      });
    } else if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(DATA.email) === false
    ) {
      MakeToast({
        variant: "warning",
        title: "Warning",
        content: "Email is invalid.",
      });
    } else if (DATA.name.length === 0) {
      MakeToast({
        variant: "warning",
        title: "Warning",
        content: "Name is required.",
      });
    } else if (DATA.role === null) {
      MakeToast({
        variant: "warning",
        title: "Warning",
        content: "Role is required.",
      });
    } else if (DATA.department === null) {
      MakeToast({
        variant: "warning",
        title: "Warning",
        content: "Department is required.",
      });
    } else if (DATA.password.length === 0) {
      MakeToast({
        variant: "warning",
        title: "Warning",
        content: "Password is required.",
      });
    } else if (DATA.password.length < 8) {
      MakeToast({
        variant: "warning",
        title: "Warning",
        content: "Password must be at least 8 characters long.",
      });
    } else {
      return true;
    }
  }

  return false;
}
