interface Request_All {
    key: string,
    latitude: number,
    longitude: number
}

interface Quest_Sight {
    title: string,
    distance: number,
    id: string
}

interface Quest_Event {
    title: string,
    distance: number,
    id: string,

    start_time: string,
    end_time: string,
    web_link: string | null,
    event_id: string,
    is_happening: boolean,
}

interface Quest_Activity {
    title: string,
    distance: number,
    date: string,
    id: string
}

interface Response_All {
    key: string,
    sights: Quest_Sight[],
    events: Quest_Event[],
    activity: Quest_Activity[],
    need_update: boolean
}

interface Claim {
    key: string,
    latitude: number,
    longitude: number,
    id: string,
    version: string
}

interface Response_Claim {
    key: string,
    valid: boolean,
    need_update: boolean
}