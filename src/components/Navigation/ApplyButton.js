import React from 'react'
import {Button} from "reactstrap";
import {withRouter} from "react-router";
import {Query} from "react-apollo";
import * as queries from "../../apollo/queries";
import LoadingIcon from "../_presentational/LoadingIcon";

const ApplyButton = ({history, authorizedUser}) => {
    return (
        <>
            <Query query={queries.GET_AUTH_USER_STATUS}>
                {
                    ({loading, error, data}) => {
                        if (loading) return <LoadingIcon sizeClass={'glimpsicon-32'} />
                        if (error) {
                            return null
                        }
                        const {status} = data;
                        if (status) {
                            return <Button color="success" type="button" size="lg" disabled>{status}</Button>
                        } else {
                            if (authorizedUser.permission === 0) {
                                return <Button color="warning" type="button" size="lg" onClick={() => history.push("/app/apply")}>Apply!</Button>
                            } else {
                                return <Button color="success" type="button" size="lg" onClick={() => history.push("/app/apply")}>Rejoin RC</Button>
                            }
                        }
                    }
                }
            </Query>    
        </>
    )
}

export default withRouter(ApplyButton)
