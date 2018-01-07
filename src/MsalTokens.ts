
import { UserAgentApplication } from "msal";

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


}