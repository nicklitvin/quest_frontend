import { DateFormat, Units, constants } from "../GlobalConstants";
import { convert_distance, extract_time, make_claim_text, make_distance_text, make_event_date_text } from "../components/QuestButton"

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

        const event_km = make_distance_text(distance,true,Units.km);
        expect(event_km).toEqual(`0km.`);

        const not_event_km = make_distance_text(distance,true,Units.km);
        expect(not_event_km == `0km`).toEqual(false);
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
})