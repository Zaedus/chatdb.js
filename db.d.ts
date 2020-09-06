export interface ChatTableRow {
    ROWID: number;
    guid: string;
    style: number;
    state: number;
    account_id?: null;
    properties: Buffer;
    chat_identifier: string;
    service_name: string;
    room_name?: null;
    account_login: string;
    is_archived: number;
    last_addressed_handle: string;
    display_name?: null;
    group_id: string;
    is_filtered: number;
    successful_query: number;
    engram_id?: null;
    server_change_token: string;
    ck_sync_state: number;
    original_group_id: string;
    last_read_message_timestamp: number;
    sr_server_change_token?: null;
    sr_ck_sync_state: number;
    cloudkit_record_id: string;
    sr_cloudkit_record_id?: null;
    last_addressed_sim_id?: null;
    is_blackholed: number;
}