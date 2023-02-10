import gql from 'graphql-tag';

export const GET_PAGINATED_MEMBER_RANKINGS = gql(`
    query GetMemberRankings($limit: Int!, $offset: Int!, $textFilter: String) {
        getMemberRankings(limit: $limit, offset: $offset, textFilter: $textFilter) {
            rows {
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
    query GetPaginatedAllMemberDetails {
        getPaginatedAllMemberDetails {
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
`);
