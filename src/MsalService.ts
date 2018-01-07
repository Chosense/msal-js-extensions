import { UserAgentApplication } from "msal";
import { User } from "msal/lib-commonjs/User";

/**
 * Defines the options object for the MsalService class.
 */
export interface IMsalServiceOptions {
    /** Required. The ID of the application (ClientId) to connect to Azure AD as. */
    clientId: string;

    /** Optional. The Azure AD instance to connect to. Defaults to 'https://login.microsoftonline.com' */
    aadInstance?: string;

    /** The tenant to use to connect to Azure AD with. Defaults to 'common' */
    tenant?: string;

    /** Optional. The URL to use to redirect clients back after authentication. Defaults to the current URL. */
    redirectUrl?: string;
}

/**
 * Tools and utilities for working with MSAL.js.
 */
export class MsalService {
    /**
     * Creates a new instance of the class.
     * @param options The options object.
     */
    constructor(options: IMsalServiceOptions) {
        if(!options) throw "Options are required.";

        var instance: string = options.aadInstance ? options.aadInstance : "https://login.microsoftonline.com";
        var tenant: string = options.tenant ? options.tenant : "common";
        var authority = instance + "/" + tenant;

        this._userAgentApp = new UserAgentApplication(options.clientId, authority, undefined, {
            redirectUri: options.redirectUrl
        });
    }

    private static _current: MsalService;
    /** 
     * Returns the currently initialized instance of the MsalService class. Use the initCurrent()
     * method to initialize the instance.
     * After the current instance has been initialized, you can conveniently use it in your
     * application with MsalService.current.
     * */
    public static get current(): MsalService {
        return MsalService._current;
    }

    /**
     * Initializes the current instance of the MsalService.
     * @param options The options to use to initialize the MsalService with.
     */
    public static initCurrent(options: IMsalServiceOptions) {
        MsalService._current = new MsalService(options);
    }

    
    private _userAgentApp: UserAgentApplication;
    /**
     * Returns the current UserAgentApplication instance that the MsalService is using.
     */
    public get userAgentApp(): UserAgentApplication {
        return this._userAgentApp;
    }





    /**
     * Attempts to get the current user. If the current user is known, we return that user right away.
     * If the user has not authenticated, then a popup window is used to authenticate the user
     * and then the user information is returned.
     * 
     * @param scopes Optional. The scopes you want the user to consent to. Defaults to ["user.read"].
     */
    public tryGetUserPopup(scopes?: string[]): Promise<User> {
        var usr = this.userAgentApp.getUser();
        
        if(usr) {
            return Promise.resolve(usr);
        }
        else {
            return this.userAgentApp.loginPopup(this.fixScopes(scopes))
                .then(idToken => {
                    usr = this.userAgentApp.getUser();
                })
                .then(() => {
                    return usr;
                });
        }
    }



    private fixScopes(scopes?: string[]): string[] {
        if(scopes && scopes.length) return scopes;
        return ["user.read"];
    }


}