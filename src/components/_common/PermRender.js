// @flow
import * as React from 'react'
import {Query} from "react-apollo";
import * as queries from "../../apollo/queries";
import LoadingIcon from "../_presentational/LoadingIcon";

const PermRender = (props) => {
    function handle(authorizedUser) {
        if (props.perms) {
            return props.perms.includes(authorizedUser.permission)
            ? (
                <React.Fragment>
                    {props.children}
                </React.Fragment>
            )
            : null
        } else {
            return props.ttperms.includes(authorizedUser.ttpermission)
            ? (
                <React.Fragment>
                    {props.children}
                </React.Fragment>
            )
            : null
        }
    }

    return (
        props.authorizedUser ? handle(props.authorizedUser) :
        <Query query={queries.GET_AUTH_USER}>
                {
                    ({loading, error, data}) => {
                        if (loading) return <LoadingIcon sizeClass={'glimpsicon-32'} />
                        if (error) {
                            return null
                        }
                        const {authorizedUser} = data

                        return handle(authorizedUser)
                }
            }
        </Query>
    )
}

export default PermRender
