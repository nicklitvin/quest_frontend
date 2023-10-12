import { rest } from "msw";
import { urls } from "../GlobalConstants";

export const sample_data = {
    [urls.test] : "hello"
}

export const handlers = [
    rest.get(urls.base + urls.test, (req,res,ctx) => {
        return res(
            ctx.json(sample_data[urls.test])
        );
    })
]