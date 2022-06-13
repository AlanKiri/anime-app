import { createContext } from "react";
import HttpImageClient from "./QueryStore/image.http.client";
import QueryStore from "./QueryStore/query.store";

const queryStore = new QueryStore(new HttpImageClient());
export const Store = createContext({ queryStore });
