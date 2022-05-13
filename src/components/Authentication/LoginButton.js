import * as React from 'react';
import AppConfigs from "../../config/app_configs"

const LoginButton = (props) => {
    return (
        <a className="btn btn-primary btn-lg" href={`https://discord.com/oauth2/authorize?client_id=${AppConfigs.client_id}&redirect_uri=${AppConfigs.server_url}/api/callback&response_type=code&scope=identify`} role="button">
            <img src="https://mee6.xyz/assets/a219956caf348a5bc3434b17fce51349.svg" alt="RC" className="px-2" />
            Login with Discord
        </a>
    )
}

export default LoginButton
