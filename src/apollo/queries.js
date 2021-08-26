import gql from "graphql-tag";

export const GET_AUTH_USER = gql(`
  query GetAuthUser {
        authorizedUser {
            avatar,
            id,
            username,
            discriminator,
            ttpermission,
            in_game_id,
            permission,
            permission_title
	    }
	}
`);

export const GET_AUTH_USER_STATUS = gql(`
    query GetAuthUserStatus {
        getAuthUserStatus {
            status
        }
    }
`)

export const GET_ALL_MEMBERS = gql(`
    query GetAllMembers {
        getAllMembers {
            members {
                in_game_id,
                company,
                rank
            },
            managers {
                in_game_id
            },
            applicants {
                in_game_id
            }
        }
    }
`)

export const GET_ALL_MEMBERS_SIMPLE = gql(`
    query GetAllMembers {
        getAllMembers {
            members {
                in_game_id
            }
        }
    }
`)

export const GET_AUTH_USER_PROGRESS = gql(`
    query GetAuthUserProgress {
        getAuthUserProgress {
            member {
                company,
                in_game_name,
                in_game_id,
                fire_reason,
                deadline,
                last_turnin
            },
            pigs {
                vouchers,
                worth
            },
            rts {
                vouchers,
                worth
            },
            company {
                pigs_rank,
                rts_rank,
                total_members
            }
        }
    }
`)

export const GET_AUTH_USER_PIGS_VOUCHERS = gql(`
    query GetAuthUserPigsVouchers {
        getAuthUserPigsVouchers {
            vouchers
        }
    }
`)

export const GET_AUTH_USER_TURNINS = gql(`
    query GetAuthUserTurnins {
        getAuthUserTurnins {
            manager {
                member {
                    in_game_name,
                    in_game_id
                }
            },
            company,
            amount,
            worth,
            createdAt
        }
    }
`)

export const GET_AUTH_USER_PAYOUTS = gql(`
    query GetAuthUserPayouts {
        getAuthUserPayouts {
            member {
                in_game_name,
                in_game_id
            }
            company,
            amount,
            worth,
            createdAt
        }
    }
`)

export const GET_AUTH_USER_CASHOUT = gql(`
    query GetAuthUserCashout {
        getAuthUserCashout {
            rts_cashout,
            rts_cashout_worth,
            pigs_cashout,
            pigs_cashout_worth,
            total_money
        }
    }
`)

export const GET_WEB_USERS = gql(`
    query GetWebUsers {
        getWebUsers {
            id,
            discord_id,
            in_game_id,
            permission
        }
    }
`)

export const SET_USER_PERM = gql(`
    mutation SetUserPerm($id: Int!, $perm: Int!) {
        setUserPerm: set_user_perm(id: $id, perm: $perm)
    }
`)

export const SET_USER_ID = gql(`
    mutation SetUserId($id: Int!, $in_game_id: Int!) {
        setUserId: set_user_in_game_id(id: $id, in_game_id: $in_game_id)
    }
`)

export const SET_APPLICANT_CONTACTED = gql(`
    mutation SetApplicantContacted($id: Int!) {
        setApplicantContacted: set_applicant_contacted(id: $id)
    }
`)

export const SET_APPLICANT_REJECTED = gql(`
    mutation SetApplicantRejected($id: Int!, $reason: String!) {
        setApplicantRejected: set_applicant_rejected(id: $id, reason: $reason)
    }
`)

export const SET_REF_PAID = gql(`
    mutation SetRefPaid($id: Int!) {
        setRefPaid: set_ref_paid(id: $id)
    }
`)

export const GET_ACTIVE_APPLICANTS = gql(`
    query GetActiveApplicants {
        getActiveApplicants {
            id,
            in_game_name,
            in_game_id,
            company,
            country,
            status,
            status_info,
            createdAt
        }
    }
`)

export const UPDATE_APPLICANT_STATUS_INFO = gql(`
    mutation UpdateApplicantStatusInfo($id: Int!, $status_info: String!) {
        updateApplicantStatusInfo: update_applicant_status_info(id: $id, status_info: $status_info)
    }
`)

export const GET_ACTIVE_MANAGERS = gql(`
    query GetActiveManagers {
        getActiveManagers {
            id,
            member {
                in_game_id,
                in_game_name,
                discord_id
            }
        }
    }
`)

export const GET_MANAGER_PAYOUTS = gql(`
    query GetManagerPayouts($manager_id: Int!) {
        getManagerPayouts(manager_id: $manager_id) {
            company,
            amount,
            createdAt,
            worth,
            member {
                in_game_id,
                in_game_name
            }
        }
    }
`)

export const GET_COMPLETED_REFERRALS = gql(`
    query GetCompletedReferrals {
        getCompletedReferrals {
            paid {
                in_game_name,
                in_game_id,
                discord_id
            },
            unpaid {
                in_game_name,
                in_game_id,
                discord_id
            },
            both {
                in_game_name,
                in_game_id,
                discord_id
            },
            moneyOwned
        }
    }
`)

export const GET_REFERRAL_DETAILS = gql(`
    query GetReferralDetails($referred_id: Int!, $paid: String!) {
        getReferralDetails (referred_id: $referred_id, paid: $paid) {
            in_game_name,
            in_game_id,
            discord_id,
            total_vouchers
        }
    }
`)

export const GET_ACTIVE_REFERRALS = gql(`
    query GetAciveReferrals {
        getActiveReferrals {
            app_id,
            employee_name,
            employee_id,
            total_vouchers,
            re_name,
            re_in_game_id,
            re_discord_id
        }
    }
`)

export const GET_AUTH_USER_ACTIVE_REFERRALS = gql(`
    query GetAuthUserActiveReferrals {
        getAuthUserActiveReferrals {
            employee_name,
            employee_id,
            total_vouchers,
        }
    }
`)

export const SET_REFERRER_ID = gql(`
    mutation SetReferrerID($app_id: Int!, $new_id: Int!) {
        setReferrerID: set_referrer_id(app_id: $app_id, new_id: $new_id)
    }
`)

export const GET_CURRENT_EMPLOYEES = gql(`
    query GetCurrentEmployees {
        getCurrentEmployees {
            id,
            in_game_id,
            in_game_name,
            discord_id
        }
    }
`)