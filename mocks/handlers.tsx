import { rest } from "msw";
import { urls } from "../GlobalConstants";

export const test_response : string = "hello";
export const get_all_response : Response_All = {
    key: "sample_key",
    activity: [],
    events: [],
    locations: [],
    need_update: false
}

export const handlers = [
    rest.get(urls.base + urls.test, (req,res,ctx) => {
        return res(
            ctx.json(test_response)
        );
    }),
    rest.post(urls.base + urls.get_all, (req,res,ctx) => {
        return res(
            ctx.json(get_all_response)
        )
    })
]