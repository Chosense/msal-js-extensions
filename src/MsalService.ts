import { UserAgentApplication } from "msal";
import { User } from "msal/lib-commonjs/User";


/**
 * Tools and utilities for working with MSAL.js.
 */
export class MsalService {
    /**
     * Creates a new instance of the class.
     * @param userAgentApp An instance of the UserAgentApplication class that the MsalService instance will use.
     */
    constructor(userAgentApp: UserAgentApplication) {
        this._userAgentApp = userAgentApp;
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
     * @param userAgentApp The UserAgentApplication instance to init the current MsalService with.
     */
    public static initCurrent(userAgentApp: UserAgentApplication) {
        MsalService._current = new MsalService(userAgentApp);
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