
import { UserAgentApplication } from "msal";

/**
 * Provides methods for working with access tokens.
 */
export class TokenFactory {
    /**
     * Creates a new instance of the class.
     * @param userAgentApp The UserAgentApplication instance to use in the TokenFactory class.
     */
    constructor(userAgentApp: UserAgentApplication) {
        this.uaa = userAgentApp;
    }

    private uaa: UserAgentApplication;


}