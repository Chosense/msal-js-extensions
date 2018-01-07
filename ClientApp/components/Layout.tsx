import * as React from 'react';
import { NavMenu } from './NavMenu';
import { MsalService } from "../../src/MsalService";
import { UserAgentApplication } from 'msal';


export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    constructor() {
        super();

        MsalService.initCurrent(
            new UserAgentApplication("44d3dc9d-6185-40ff-9d5b-e32042d8b272", "https://login.microsoftonline.com/common", undefined, {
                redirectUri: "http://localhost:5000"
            })
        );
    }


    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-3'>
                    <NavMenu />
                </div>
                <div className='col-sm-9'>
                    { this.props.children }
                </div>
            </div>
        </div>;
    }
}
