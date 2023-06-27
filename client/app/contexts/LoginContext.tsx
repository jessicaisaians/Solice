import { Dispatch, SetStateAction, createContext } from "react";

interface LoginContext {
  noRedirect: boolean;
  isLogin: boolean;
  mobile: string;
  hasPassword: boolean;
  setHasPassword: Dispatch<SetStateAction<boolean>>;
  setMobile: Dispatch<SetStateAction<string>>;
  setComponentToRender: Dispatch<any>;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  setNoRedirect: Dispatch<SetStateAction<boolean>>;
}
const defaultState = {
  noRedirect: false,
  isLogin: true,
  mobile: "",
  hasPassword: false,
  setHasPassword: () => {},
  setMobile: () => {},
  setComponentToRender: () => {},
  setIsLogin: () => {},
  setNoRedirect: () => {},
};
export const LoginContext = createContext<LoginContext>(defaultState);
// export const LoginContext = createContext<Partial<LoginContext>>(defaultState);
