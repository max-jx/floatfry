import {createContext} from "react";
import {LoginRepository} from "./data/LoginRepository";

export const RegisterContext = createContext<LoginRepository | undefined>(undefined)