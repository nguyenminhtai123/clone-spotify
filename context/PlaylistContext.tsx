import { useSession } from 'next-auth/react';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import { IPlaylistContext, PlaylistContextState } from '../types';

interface playlistContextProviderProps {
    children: ReactNode;
}

const defaultPlaylistContextState: PlaylistContextState = {
    playlists: [],
};

export const PlaylistContext = createContext<IPlaylistContext>({
    playlistContextState: defaultPlaylistContextState,
});

export const usePlaylistContext = () => useContext(PlaylistContext);

const PlaylistContextProvider = ({ children }: playlistContextProviderProps) => {
    const spotifyApi = useSpotify();

    const { data: session } = useSession();

    const [playlistContextState, setPlaylistContextState] = useState(defaultPlaylistContextState);

    useEffect(() => {
        const getUserPlaylists = async () => {
            const userPlaylistResponse = await spotifyApi.getUserPlaylists();
            setPlaylistContextState({
                playlists: userPlaylistResponse.body.items,
            });
        };

        if (spotifyApi.getAccessToken()) {
            getUserPlaylists();
        }
    }, [session, spotifyApi]);

    const playlistContextProviderData = {
        playlistContextState,
    };

    return <PlaylistContext.Provider value={playlistContextProviderData}>{children}</PlaylistContext.Provider>;
};

export default PlaylistContextProvider;
