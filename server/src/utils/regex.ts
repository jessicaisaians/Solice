export const phoneRegex = /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/;
export const strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
export const usernameRegex = /^(?=.*[A-Za-z])[A-Za-z0-9_.]{1,30}$/;
export const firstNameRegex = /^[\u0600-\u06FFa-zA-Z\s]{3,}$/;

export const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
