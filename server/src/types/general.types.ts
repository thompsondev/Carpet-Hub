import { Request } from "express";

export interface AppRequest<K = unknown, T = Record<string, unknown>>
  extends Request {
  currentUser?: K; // Optional currentUser property
  body: T; // Body of the request with type T
}
