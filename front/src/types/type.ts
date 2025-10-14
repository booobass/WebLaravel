export type UserType = {
    id?: number;
    name: string;
    email: string;
    password: string;
}

export type SongType = {
    id: number;
    title: string;
    track_number: number;
}

export type AlbumType = {
    id: number;
    title: string;
    image: string;
    songs: SongType[]
}

export type TrackType = {
    id: number;
    name: string;
    describe: string;
    audio_path: string;
}

export type BandType = {
    id: number;
    name: string;
}

export type DjType = {
    id: number;
    name: string;
}

export type GigType = {
    id: number;
    date: string;
    place: string;
    open_time: string;
    start_time: string;
    adv_price: number;
    day_price: number;
    bands: BandType[];
    djs?: DjType[];
}

export type ProfileType = {
    id: number;
    homepage_name: string;
    description: string;
    background_color: string;
}