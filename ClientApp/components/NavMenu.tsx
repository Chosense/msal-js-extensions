import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MsalService } from "../../src/MsalService";
import { User } from 'msal/lib-commonjs/User';

export interface IMenuState {
    isLoggedIn?: boolean
}

export class NavMenu extends React.Component<{}, IMenuState> {
    constructor() {
        super();

        this.state = { isLoggedIn: false };
    }

    

    public render() {
        var usr = MsalService.current.userAgentApp.getUser();

        var loginElem: JSX.Element = usr ?
            <li>
                <button type="button" className="btn navbar-btn" onClick={ this.onLogout.bind(this) }><span className='glyphicon glyphicon-log-out'></span> Log out</button>
            </li>
            :
            <li>
                <button type="button" className="btn navbar-btn" onClick={ this.onLogin.bind(this) }><span className='glyphicon glyphicon-log-in'></span> Log in</button>
            </li>;


        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>msal_js_extensions</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={ '/' } exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/counter' } activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Counter
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/fetchdata' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Fetch data
                            </NavLink>
                        </li>
                        { loginElem }
                    </ul>
                </div>
            </div>
        </div>;
    }

    private onLogin(): Promise<User> {
        return MsalService.current.userAgentApp.loginPopup(["user.read"])
            .then(idToken => {
                var usr = MsalService.current.userAgentApp.getUser();
                this.setState({
                    isLoggedIn: usr && true
                });
                return usr;
            });
    }

    private onLogout(): void {
        MsalService.current.userAgentApp.logout();
    }
}
