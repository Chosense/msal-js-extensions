
import { UserAgentApplication } from "msal";
import { User } from "msal/lib-commonjs/User";

/**
 * Provides methods for working with access tokens.
 */
export class MsalTokens {
    /**
     * Creates a new instance of the class.
     * @param userAgentApp The UserAgentApplication instance to use in the MsalTokens class.
     */
    constructor(userAgentApp: UserAgentApplication) {
        this.uaa = userAgentApp;
    }

    private uaa: UserAgentApplication;


    public tryGetUserPopup(): Promise<User> {
        var usr = this.uaa.getUser();

        if(usr) {
            return Promise.resolve(usr);
        }
        else {
            return this.uaa.loginPopup(["user.read"])
                .then(idToken => {
                    usr = this.uaa.getUser();
                })
                .then(() => {
                    return usr;
                });
        }
    }
}