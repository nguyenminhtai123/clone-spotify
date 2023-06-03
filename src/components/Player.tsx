import {
    ArrowsRightLeftIcon,
    ArrowUturnLeftIcon,
    BackwardIcon,
    ForwardIcon,
    PauseIcon,
    PlayIcon,
    ViewColumnsIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import React from 'react';
import { useSongContext } from '../../context/SongContext';
import useSpotify from '../../hooks/useSpotify';
import { SongReducerActionType } from '../../types';

const Player = () => {
    const spotifyApi = useSpotify();

    const {
        songContextState: { isPlaying, selectedSong, deviceId, volume },
        dispatchSongAction,
    } = useSongContext();

    console.log(selectedSong);

    const handlePlayPause = async () => {
        const response = await spotifyApi.getMyCurrentPlaybackState();

        if (!response.body) return;

        if (response.body.is_playing) {
            await spotifyApi.pause();
            dispatchSongAction({
                type: SongReducerActionType.ToggleIsPlaying,
                payload: false,
            });
        } else {
            await spotifyApi.play();
            dispatchSongAction({
                type: SongReducerActionType.ToggleIsPlaying,
                payload: true,
            });
        }
    };

    return (
        <div className="h-24 bg-gradient-to-b from-black to-gray-900 grid grid-cols-3 text-xs md:text-base px-2 md:px-8 ">
            {/* left */}
            <div className="flex items-center space-x-4">
                {selectedSong && (
                    <>
                        <div className="hidden md:block">
                            <Image
                                src={selectedSong.album.images[0].url}
                                alt={`Album cover for ${selectedSong.name}`}
                                width="40"
                                height="40"
                            />
                        </div>

                        <div>
                            <h3>{selectedSong.name}</h3>
                            <p>{selectedSong.artists[0].name}</p>
                        </div>
                    </>
                )}
            </div>
            {/* Center */}
            <div className="flex justify-evenly items-center">
                <ArrowsRightLeftIcon className="icon-playback" />
                <BackwardIcon className="icon-playback" />
                {isPlaying ? (
                    <PauseIcon className="icon-playback" onClick={handlePlayPause} />
                ) : (
                    <PlayIcon className="icon-playback" onClick={handlePlayPause} />
                )}
                <ForwardIcon className="icon-playback" />
                <ArrowUturnLeftIcon className="icon-playback" />
            </div>
            {/* Right */}
            <div className="flex justify-end items-center pr-5 space-x-3 md:space-x-4">
                <ViewColumnsIcon className="icon-playback" />
                <input type="range" min={0} max={100} className="w-20 md:w-auto" />
            </div>
        </div>
    );
};

export default Player;
