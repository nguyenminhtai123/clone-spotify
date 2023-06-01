import React from 'react';
import IconButton from './IconButton';
import {
    HomeIcon,
    HeartIcon,
    BuildingLibraryIcon,
    PlusCircleIcon,
    RssIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';

const Divider = () => <hr className="border-t-[0.1px] border-gray-900" />;

const Sidebar = () => {
    const { data: session } = useSession();
    return (
        <div className="text-gray-500 px-5 pt-5 pb-36 text-xs lg:text-sm border-gray-900 h-screen overflow-y-scroll scrollbar-hidden first:sm:max-w-[12rem] lg:max-w-[15rem] hidden md:block">
            <div className="space-y-4">
                {session?.user && <button onClick={() => signOut()}>{session.user.name} - Log Out</button>}
                <IconButton icon={HomeIcon} label="Home" />
                <IconButton icon={MagnifyingGlassIcon} label="Search" />
                <IconButton icon={BuildingLibraryIcon} label="Your Library" />

                <Divider />

                <IconButton icon={PlusCircleIcon} label="Create Playlist" />
                <IconButton icon={HeartIcon} label="Liked Songs" />
                <IconButton icon={RssIcon} label="Your episodes" />

                <Divider />

                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
                <p className="cursor-pointer hover:text-white">PLAYLIST</p>
            </div>
        </div>
    );
};

export default Sidebar;
