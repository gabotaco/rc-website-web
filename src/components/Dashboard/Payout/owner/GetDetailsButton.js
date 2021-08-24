import React, {useState} from 'react';
import { Button } from 'reactstrap';
import LoadingIcon from '../../../_presentational/LoadingIcon';
import ReferralDetails from './ReferralDetails';

const GetDetailsButton = (props) => {
    const [loading, setLoading] = useState(false)
    const [details, setDetails] = useState(null);

    function updateLoading(status) {
        if (status !== loading) setLoading(status)
    }
    function getDetails() {
        setLoading(true)
        setDetails(<ReferralDetails setLoading={updateLoading} referred_id={props.data.in_game_id} name={props.data.in_game_name} paid={props.paid} />)
    }

    return (
        <React.Fragment>
            <Button color="info" onClick={getDetails} disabled={loading}>{loading ? <LoadingIcon sizeClass={'glimpsicon-32'} /> : 'Details'}</Button>
            {details}
        </React.Fragment>
    )
}

export default GetDetailsButton
