import { useSession } from 'next-auth/react';
import { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';
import useSpotify from '../hooks/useSpotify';
import { songReducer } from '../reducers/songReducer';
import { ISongContext, SongContextState, SongReducerActionType } from '../types';

interface songContextProviderProps {
    children: ReactNode;
}

const defaultSongContextState: SongContextState = {
    selectedSongId: undefined,
    selectedSong: null,
    isPlaying: false,
    volume: 50,
    deviceId: null,
};

export const SongContext = createContext<ISongContext>({
    songContextState: defaultSongContextState,
    dispatchSongAction: () => {},
});

export const useSongContext = () => useContext(SongContext);

const SongContextProvider = ({ children }: songContextProviderProps) => {
    const spotifyApi = useSpotify();

    const { data: session } = useSession();

    const [songContextState, dispatchSongAction] = useReducer(songReducer, defaultSongContextState);

    useEffect(() => {
        const setCurrentDevice = async () => {
            const availableDevicesRespose = await spotifyApi.getMyDevices();

            if (!availableDevicesRespose.body.devices.length) return;

            const { id: deviceId, volume_percent } = availableDevicesRespose.body.devices[0];

            dispatchSongAction({
                type: SongReducerActionType.SetDevice,
                payload: {
                    deviceId,
                    volume: volume_percent as number,
                },
            });

            await spotifyApi.transferMyPlayback([deviceId as string]);
        };

        if (spotifyApi.getAccessToken()) {
            setCurrentDevice();
        }
    }, [spotifyApi, session]);

    useEffect(() => {
        const getCurrentPlayingSong = async () => {
            const songInfo = await spotifyApi.getMyCurrentPlayingTrack();

            if (!songInfo.body) return;

            dispatchSongAction({
                type: SongReducerActionType.SetCurrentPlayingSong,
                payload: {
                    selectedSongId: songInfo.body.item?.id,
                    selectedSong: songInfo.body.item as SpotifyApi.TrackObjectFull,
                    isPlaying: songInfo.body.is_playing,
                },
            });
        };

        if (spotifyApi.getAccessToken()) {
            getCurrentPlayingSong();
        }
    }, [spotifyApi, session]);

    const songContextProviderData = {
        songContextState,
        dispatchSongAction,
    };
    return <SongContext.Provider value={songContextProviderData}>{children}</SongContext.Provider>;
};

export default SongContextProvider;
