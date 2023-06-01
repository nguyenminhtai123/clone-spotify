import React from 'react';

interface Props {
    icon: React.ForwardRefExoticComponent<
        React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
            title?: string;
            titleId?: string;
        } & React.RefAttributes<SVGSVGElement>
    >;
    label: string;
}

const IconButton = ({ icon: Icon, label }: Props) => {
    return (
        <div>
            <button className="flex items-center space-x-2 hover:text-white">
                <Icon className="icon" />
                <span>{label}</span>
            </button>
        </div>
    );
};

export default IconButton;
