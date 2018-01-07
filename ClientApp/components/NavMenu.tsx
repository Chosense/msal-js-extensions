import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MsalTokens } from "../../src/MsalTokens";
import { Home } from "./Home";
import { User } from 'msal/lib-commonjs/User';

export interface IMenuState {
    isLoggedIn?: boolean
}

export class NavMenu extends React.Component<{}, IMenuState> {
    constructor() {
        super();

        this.state = { isLoggedIn: false };
        this.tokens = new MsalTokens(Home.defaultUserAgentApplication());
    }

    private tokens: MsalTokens;

    

    public render() {
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
                        <li>
                            <a onClick={ this.onLogin.bind(this) } ><span className='glyphicon glyphicon-log-in'></span> Log in</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }

    private onLogin(): Promise<User> {
        return this.tokens.tryGetUserPopup()
            .then(u => {
                return u;
            });
    }
}
