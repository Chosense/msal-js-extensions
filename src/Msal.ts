import { UserAgentApplication} from "msal";
import { User } from "msal/lib-commonjs/User";

export class Msal {
    constructor(userAgentApp: UserAgentApplication) {
        this._userAgentApp = userAgentApp;
    }

    private _userAgentApp: UserAgentApplication;
    public get userAgentApp(): UserAgentApplication {
        return this._userAgentApp;
    }

}