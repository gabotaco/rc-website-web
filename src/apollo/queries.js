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

export const GET_MEMBER_RANKINGS = gql(`
    query GetMemberRankings {
        getMemberRankings {
            in_game_id,
            in_game_name,
            company,
            last_turnin,
            pigs {
                vouchers
            },
            rts {
                vouchers
            }
        }
    }
`)

export const GET_ALL_MEMBER_DETAILS = gql(`
    query GetAllMemberDetails {
        getAllMemberDetails {
            id,
            discord_id,
            fire_reason,
            pigs {
                vouchers
            },
            rts {
                vouchers
            },
            in_game_id,
            in_game_name,
            company,
            welcome,
            last_turnin,
            deadline,
            vouchers_turned_in,
            pigs_rank,
            rts_rank,
            manager
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

export const GET_MEMBER_PAYOUTS = gql(`
    query GetMemberPayouts($member_id: Int!) {
        getMemberPayouts(member_id: $member_id) {
            id,
            company,
            amount,
            createdAt,
            worth,
            manager {
                member {
                    in_game_name,
                    in_game_id    
                }
            }
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

export const GET_ALL_MANAGERS = gql(`
    query GetAllManagers {
        getAllManagers {
            id,
            active,
            rts_cashout,
            rts_cashout_worth,
            pigs_cashout,
            pigs_cashout_worth,
            total_money,
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
        set_referrer_id(app_id: $app_id, new_id: $new_id) {
            id
            referred_id
        }
    }
`)

export const SET_MEMBER_IDENTIFIERS = gql(`
    mutation SetMemberIdentifiers($uid: Int!, $new_name: String!, $new_id: Int!, $new_discord: String!) {
        set_member_identifiers(uid: $uid, new_name: $new_name, new_id: $new_id, new_discord: $new_discord) {
            id
            in_game_name
            in_game_id
            discord_id
        }
    }
`)

export const SET_MEMBER_MANAGER = gql(`
    mutation SetMemberManager($uid: Int!, $manager: Boolean!) {
        set_member_manager(uid: $uid, manager: $manager) {
            id
            manager
        }
    }
`)

export const SET_MEMBER_COMPANY = gql(`
    mutation SetMemberCompany($uid: Int!, $company: String!) {
        set_member_company(uid: $uid, company: $company) {
            id
            company
        }
    }
`)

export const SET_MEMBER_DEADLINE = gql(`
    mutation SetMemberDeadline($uid: Int!, $deadline: String!) {
        set_member_deadline(uid: $uid, deadline: $deadline) {
            id
            deadline
        }
    }
`)

export const SET_MEMBER_WELCOME = gql(`
    mutation SetMemberWelcome($uid: Int!, $welcome: Boolean!) {
        set_member_welcome(uid: $uid, welcome: $welcome) {
            id
            welcome
        }
    }
`)

export const FIRE_MEMBER = gql(`
    mutation FireMember($uid: Int!, $reason: String!, $welcome: Boolean!) {
        fire_member(uid: $uid, reason: $reason, welcome: $welcome) {
            id
            company
            fire_reason
            welcome
            deadline
        }
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

export const GET_TOP_TURNINS = gql(`
    query GetTopTurnins($num_players: Int!, $from: String!, $to: String!, $company: String!) {
        getTopTurnins (num_players: $num_players, from: $from, to: $to, company: $company) {
            in_game_name,
            in_game_id,
            place,
            vouchers,
            money
        }
    }
`)

