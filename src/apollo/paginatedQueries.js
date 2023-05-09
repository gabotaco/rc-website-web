import { gql } from '@apollo/client';

export const GET_PAGINATED_MEMBER_RANKINGS = gql(`
    query GetPaginatedMemberRankings($limit: Int!, $offset: Int!, $textFilter: String) {
        getPaginatedMemberRankings(limit: $limit, offset: $offset, textFilter: $textFilter) {
            rows {
                id,
                in_game_id,
                rank,
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
            count
        }
        getTotalMembers
    }
`);

export const GET_PAGINATED_ALL_MEMBER_DETAILS = gql(`
    query GetPaginatedAllMemberDetails($limit: Int!, $offset: Int!, $textFilter: String, $filter: String) {
        getPaginatedAllMemberDetails(limit: $limit, offset: $offset, textFilter: $textFilter, filter: $filter) {
            rows {
                id,
                rank,
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
            count
        }
        getTotalMembers
    }
`);

export const GET_PAGINATED_WEB_USERS = gql(`
    query GetPaginatedWebUsers($limit: Int!, $offset: Int!, $textFilter: String) {
        getPaginatedWebUsers(limit: $limit, offset: $offset, textFilter: $textFilter) {
            rows {
                id,
                discord_id,
                in_game_id,
                permission
            }
            count
        }
        getTotalWebUsers
    }
`);
