interface Request_All {
    key: string,
    latitude: number,
    longitude: number
}

interface Activity {
    title: string,
    latitude: number,
    longitude: number,
    distance: number,
    radius: number,
    id: string,

    start_time: string,
    end_time: string,
    web_link: string,
    event_id: string,
    is_happening: boolean,

    date: string
}

interface Response_All {
    key: string,
    locations: Activity[],
    events: Activity[],
    activity: Activity[],
    need_update: boolean
}