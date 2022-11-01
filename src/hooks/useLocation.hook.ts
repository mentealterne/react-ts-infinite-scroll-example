import {useEffect, useState} from 'react';
import {ILocation} from "../types/types";

interface IUseLocations {
    locations: ILocation[];
    numberOfLocations: number;
    loading: boolean;
    error: any;

}

function useLocations(start: number, limit: number): IUseLocations {
    const [locations, setLocations] = useState<ILocation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [numberOfLocations, setNumberOfLocations] = useState<number>(0);
    const [error, setError] = useState<any>();


    const fetchLocations = async (start: number, limit: number) => {
        try {
            setLoading(true)
            const req = await fetch('/v2/confidence/locations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'username': 'amitphatak$r5labs.com'
                },
                body: JSON.stringify({start, limit})
            });
            const res: { locations: ILocation[], numberOfLocations: number } = await req.json();
            setLocations([...locations, ...res.locations]);
            setNumberOfLocations(res.numberOfLocations);

        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);

        }


    }

    useEffect(() => {
        fetchLocations(start, limit);
    }, [start, limit]);


    return {locations, numberOfLocations, loading, error};
}

export default useLocations;
