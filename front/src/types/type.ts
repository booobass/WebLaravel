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