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
                        if (loading) return <LoadingIcon />
                        if (error) {
                            console.error(error)
                            return "Error getting your application status"
                        }
                        if (data.getAuthUserStatus) {
                            var {status} = data.getAuthUserStatus;
                        }
                        if (status) {
                            return <Button color="success" type="button" size="lg" disabled>{status}</Button>
                        } else {
                            if (authorizedUser.permission === 0) {
                                return <Button color="warning" type="button" size="lg" onClick={() => history.push("/home/apply")}>Apply!</Button>
                            } else {
                                return <Button color="success" type="button" size="lg" onClick={() => history.push("/home/apply")}>Re-Join RC</Button>
                            }
                        }
                    }
                }
            </Query>    
        </>
    )
}

export default withRouter(ApplyButton)
