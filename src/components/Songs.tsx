import React from 'react';
import { usePlaylistContext } from '../../context/PlaylistContext';
import Song from './Song';

const Songs = () => {
    const {
        playlistContextState: { selectedPlaylist },
    } = usePlaylistContext();

    console.log(selectedPlaylist);

    if (!selectedPlaylist) return null;
    return (
        <div className="flex flex-col space-y-1 px-8 pb-28">
            {selectedPlaylist.tracks.items.map((item, index) => (
                <Song key={item.track?.id} item={item} itemIndex={index} />
            ))}
        </div>
    );
};

export default Songs;
