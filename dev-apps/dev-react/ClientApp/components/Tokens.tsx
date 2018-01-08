import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export interface ITokensState {

}

export class Tokens extends React.Component<RouteComponentProps<{}>, ITokensState> {

    render(): JSX.Element {
        var scopes: string[] = [
            "User.Read",
            "User.ReadWrite",
            "Mail.Read",
            "Mail.Send",
            "Calendars.Read",
            "Calendars.ReadWrite"
        ];

        return <div>
            <h1>Tokens</h1>

            {
                scopes.map((val) => {
                    return <div className="checkbox">
                        <label>
                            <input type="checkbox" value="" /> {val}
                        </label>
                    </div>;
                })
            }
        </div>;
    }

}