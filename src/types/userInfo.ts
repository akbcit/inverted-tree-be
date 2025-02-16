import { UserLocation } from "./userLocation";

export class User {

    private _email: string;
    private _userLocation: UserLocation;

    constructor(email: string, userLocation: UserLocation) {
        this._email = email;
        this._userLocation = userLocation;
    }

    get email(): string {
        return this._email;
    }

    get userLocation(): UserLocation {
        return this._userLocation;
    }

}