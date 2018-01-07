import { UserAgentApplication } from "msal";

export class UserAgentApplicationFactory {

    public static defaultInstance(): UserAgentApplication {
        return new UserAgentApplication("", "", () => {}, {
            redirectUri: "http:localhost:5000"
        });
    }
    
}