export type IAddress = {
    addressLine1: string,
    city: string,
    state: string,
    zip: string
}

export type ILocation = {
    id: string,
    locationName: string;
    locationDetails: string;
    address: IAddress;
    locationType: string;
}
