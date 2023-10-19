import { constants } from "../GlobalConstants";
import { DateFormat, Units } from "../components/CustomTypes";
import { convert_distance, extract_time, is_time_claimable, make_claim_text, make_distance_text, make_event_date_text, open_event_url, open_map_url } from "../components/QuestButton"
import { opened_links } from "../mocks/jest.setup";

describe("quest_button", () => {
    it("should convert distance" , async () => {
        const meters = 1000;
        
        const km = convert_distance(meters,Units.km);
        expect(km).toEqual(meters * constants.meter_to_km);

        const mi = convert_distance(meters,Units.mi);
        expect(mi).toEqual(meters * constants.meter_to_mi);

    })

    it("should make distance text", async () => {
        const distance = 1;

        const km_text = make_distance_text(distance,false,Units.km);
        expect(km_text).toEqual(`${distance}km.`)

        const mi_text = make_distance_text(distance,false,Units.mi);
        expect(mi_text).toEqual(`${distance}mi.`);
    })

    it("should change 0 distance", async () => {
        const distance = 0;

        const zero_allowed = make_distance_text(distance,true,Units.km);
        expect(zero_allowed).toEqual(`0km.`);

        const not_allowed = make_distance_text(distance,false,Units.km);
        expect(not_allowed == `0km.`).toEqual(false);
    })

    it("should round distance", async () => {
        const distance = 12.3456;

        const rounded = make_distance_text(distance,false,Units.km);
        expect(rounded).toEqual(`12.3km.`);
    })

    // assuming PST in jest.setup.tsx
    it("should extract time", async () => {
        // normal pm time
        const utc_time = "2023-10-15T21:09:59Z"; 
        const result = extract_time(utc_time);

        expect(result.day).toEqual("15");
        expect(result.month).toEqual("10");
        expect(result.year).toEqual("2023");
        expect(result.hour).toEqual("2");
        expect(result.minute).toEqual("09");
        expect(result.time_type).toEqual("pm");

        // different day
        const utc_time_1 = "2023-10-16T01:09:59Z"; 
        const result_1 = extract_time(utc_time_1);

        expect(result_1.day).toEqual("15");
        expect(result_1.month).toEqual("10");
        expect(result_1.year).toEqual("2023");
        expect(result_1.hour).toEqual("6");
        expect(result_1.minute).toEqual("09");
        expect(result_1.time_type).toEqual("pm");

        //normal am
        const utc_time_2 = "2023-10-15T14:09:59Z"; 
        const result_2 = extract_time(utc_time_2);

        expect(result_2.day).toEqual("15");
        expect(result_2.month).toEqual("10");
        expect(result_2.year).toEqual("2023");
        expect(result_2.hour).toEqual("7");
        expect(result_2.minute).toEqual("09");
        expect(result_2.time_type).toEqual("am");
    })

    it("should make claim_text", async () => {
        const utc_time = "2023-10-15T21:09:59Z"; 

        const dmy_time = make_claim_text(utc_time,DateFormat.dmy);
        expect(dmy_time).toEqual(`Claimed on 15/10/2023`);

        const mdy_time = make_claim_text(utc_time,DateFormat.mdy);
        expect(mdy_time).toEqual(`Claimed on 10/15/2023`);

        const ymd_time = make_claim_text(utc_time,DateFormat.ymd);
        expect(ymd_time).toEqual(`Claimed on 2023/10/15`);
    })

    it("should make event text", () => {
        const start_time = "2023-10-15T21:09:59Z";
        const end_time = "2023-11-13T21:09:59Z";

        const dmy_time = make_event_date_text(start_time,end_time,DateFormat.dmy);
        const mdy_time = make_event_date_text(start_time,end_time,DateFormat.mdy);
        const ymd_time = make_event_date_text(start_time,end_time,DateFormat.ymd);

        const dmy_expect = `15/10 2:09pm - 13/11 1:09pm`;
        expect(dmy_time).toEqual(dmy_expect);

        const other_expect = `10/15 2:09pm - 11/13 1:09pm`
        expect(mdy_time).toEqual(other_expect);
        expect(ymd_time).toEqual(other_expect);
    })

    it("should open map url", () => {
        expect(opened_links.length).toEqual(0);
        open_map_url("place_id");
        expect(opened_links.length).toEqual(1);
    })

    it("should claim if time is good", () => {
        const before_long = new Date(Date.now() - 10**8).toISOString();
        const before_short = new Date(Date.now() - 10**6).toISOString();
        const after_short = new Date(Date.now() + 10**6).toISOString();
        const after_long =  new Date(Date.now() + 10**8).toISOString();

        expect(is_time_claimable(before_long,before_short)).toEqual(false);
        expect(is_time_claimable(after_short,after_long)).toEqual(false);
        expect(is_time_claimable(before_short,after_short)).toEqual(true);
    })

    it("should open map if no event url", async () => {
        const map_id = "map_id";
        open_event_url(null,map_id);

        expect(opened_links.length).toEqual(1);
        expect(opened_links[0].includes(map_id)).toEqual(true);
    })

    it("should open map if bad event url", async () => {
        const bad_url = "bad"
        const map_id = "map_id";
        open_event_url(bad_url,map_id);

        expect(opened_links.length).toEqual(1);
        expect(opened_links[0].includes(map_id)).toEqual(true);
    })

    it("should open url", async () => {
        const url = "http://whatever";
        const url1 = "https://";
        const map_id = "map_id";
        open_event_url(url,map_id);
        open_event_url(url1,map_id);

        expect(opened_links[0]).toEqual(url);
        expect(opened_links[1]).toEqual(url1);
    })
})