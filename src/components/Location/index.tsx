import React from "react";
import {ILocation} from "../../types/types";

interface IProps {
    location: ILocation;
}

const Location: React.FC<IProps> = ({location}) => {
    return (
        <div className="bg-white p-4  h-80 flex flex-row gap-4 items-center w-full justify-between rounded-md shadow-md"
             key={location.id}>
            <h1 className="text-2xl font-bold text-orange-600 w-3/5 text-left">{location.locationName}</h1>
            <ul className={'flex flex-col gap-4 text-left w-2/5'}>
                {location.locationDetails && <li><strong>Details: </strong>{location.locationDetails}</li>}
                <li><strong>Location type: </strong>{location.locationType}</li>
                <li>
                    <ul>
                        <li>{location.address.addressLine1}</li>
                        <li>{location.address.city}</li>
                        <li>{location.address.zip}</li>
                        <li>{location.address.state}</li>

                    </ul>
                </li>

            </ul>

        </div>
    );
}

export default Location
