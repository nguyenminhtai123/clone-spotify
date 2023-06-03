import { SongContextState, SongReducerAction, SongReducerActionType } from '../types';

export const songReducer = (state: SongContextState, { type, payload }: SongReducerAction) => {
    switch (type) {
        case SongReducerActionType.SetDevice:
            return {
                ...state,
                deviceId: payload.deviceId,
                volumn: payload.volume,
            };
        case SongReducerActionType.ToggleIsPlaying:
            return {
                ...state,
                isPlaying: payload,
            };

        case SongReducerActionType.SetCurrentPlayingSong:
            const { selectedSongId, selectedSong, isPlaying } = payload;
            return {
                ...state,
                selectedSongId,
                selectedSong,
                isPlaying,
            };

        default:
            return state;
    }
};
