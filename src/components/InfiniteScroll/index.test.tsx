import {render, screen} from "@testing-library/react";
import InfiniteScroll from "./index";
import Location from "../Location";
import {ILocation} from "../../types/types";

const locations: ILocation[] = [
    {
        id: 'first',
        locationName: "first",
        locationType: "type1",
        locationDetails: "details1",
        address: {
            addressLine1: "address1",
            city: "city1",
            zip: "zip1",
            state: "state1"

        }
    },
    {
        id: 'second',
        locationName: "second",
        locationType: "type2",
        locationDetails: "details2",
        address: {
            addressLine1: "address2",
            city: "city2",
            zip: "zip2",
            state: "state2"

        }

    },
    {
        id: 'third',
        locationName: "third",
        locationType: "type3",
        locationDetails: "details3",
        address: {
            addressLine1: "address3",
            city: "city3",
            zip: "zip3",
            state: "state3"
        }
    },

]

beforeEach(() => {

    (window as any).IntersectionObserver = function () {
        return {
            observe: jest.fn(),
            disconnect: jest.fn(),
        };
    };
});
describe("InfiniteScroll", () => {
    test("renders the component with a children list of three locations ", () => {

        render(
            <InfiniteScroll onFetchMore={() => {
            }} totalItems={locations.length} actualItemsLength={0} isLoading={false}>
                {locations.slice(0, 3).map((location, index) => {
                    return <Location location={location} key={location.id}/>
                })}
            </InfiniteScroll>);

        expect(screen.getByText("first")).toBeInTheDocument();
        expect(screen.getByText("second")).toBeInTheDocument();
        expect(screen.getByText("third")).toBeInTheDocument();
    })

    test("if actualItemsLength is equal to totalItemsLength, it should render no more results message", () => {
        render(
            <InfiniteScroll
                onFetchMore={() => {
                }}
                totalItems={locations.length}
                actualItemsLength={locations.length}
                isLoading={false}
            >
                {locations.slice(0, 3).map((location, index) => {
                    return <Location location={location} key={location.id}/>;
                })}
            </InfiniteScroll>)

        expect(screen.getByText("No more results")).toBeInTheDocument();

    })

    test("if isLoading is true, an item with data-test id loader should be in the document", () => {
        render(
            <InfiniteScroll
                onFetchMore={() => {
                }}
                totalItems={locations.length}
                actualItemsLength={0}
                isLoading={true}
            >
                {locations.slice(0, 3).map((location, index) => {
                    return <Location location={location} key={location.id}/>;
                })}
            </InfiniteScroll>
        );

        expect(screen.getByTestId("loader")).toBeInTheDocument();
    })
})



