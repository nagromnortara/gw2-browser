import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useCookies} from 'react-cookie';

import {wrappedFetch} from '../utils/urlHelper';

export default function Account(props) {
    const [{gw2ApiKey}] = useCookies(['gw2ApiKey']);
    const [account, setAccount] = useState({});
    const [error, setError] = useState(undefined);

    useEffect(() => {
        if(gw2ApiKey) {
            wrappedFetch('/account', setAccount, setError)
        }
    }, [gw2ApiKey])

    if(error) {
        return <div className="error">{error}</div>;
    }
    return (<div className="account">
        <fieldset>
            <legend>Account:</legend>
            <span>Name: {account.name}</span>
        </fieldset>
        <fieldset>
            <legend>Guilds:</legend>
            <ul>
                {(account.guilds || []).map(guildId => (<li><Link to={`/guild/${guildId}`}>{guildId}</Link></li>))}
            </ul>
        </fieldset>
    </div>);
}