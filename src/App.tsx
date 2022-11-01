import React from 'react';
import './App.css';
import useLocations from "./hooks/useLocation.hook";
import InfiniteScroll from "./components/InfiniteScroll";
import Location from "./components/Location";

function App() {
    const [start, setStart] = React.useState(0);
    const {locations, loading, error, numberOfLocations} = useLocations(start, 3);
    if (error) return <div>Error</div>
    return (
        <div className="App w-screen min-h-screen  bg-gray-100">
            <div className="w-1/3   mx-auto">
                <InfiniteScroll onFetchMore={() => setStart(locations.length)} totalItems={numberOfLocations}
                                actualItemsLength={locations.length} isLoading={loading}>
                    {locations?.map((location, index) => {
                        return <Location location={location} key={location.id}/>
                    })}
                </InfiniteScroll>
            </div>
        </div>
    );
}

export default App;
