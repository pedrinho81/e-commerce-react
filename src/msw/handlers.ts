import { http, HttpResponse } from "msw";
import { Products } from "../mocks/index";
export const handlers = [
    http.get("/products", () => {
        return HttpResponse.json(Products)
    }),
    http.post("/submit", () => {
        return HttpResponse.json({success: true});
      })
];