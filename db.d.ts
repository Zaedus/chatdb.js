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
export interface HandleTableRow {
    ROWID: number;
    id: string;
    country: string;
    service: string;
    uncanonicalized_id?: null;
    person_centric_id?: null;
}

export interface MessageTableRow {
    ROWID: number;
    guid: string;
    text: string;
    replace: number;
    service_center?: null;
    handle_id: number;
    subject?: null;
    country?: null;
    attributedBody: Buffer;
    version: number;
    type: number;
    service: string;
    account?: null;
    account_guid: string;
    error: number;
    date: number;
    date_read: number;
    date_delivered: number;
    is_delivered: number;
    is_finished: number;
    is_emote: number;
    is_from_me: number;
    is_empty: number;
    is_delayed: number;
    is_auto_reply: number;
    is_prepared: number;
    is_read: number;
    is_system_message: number;
    is_sent: number;
    has_dd_results: number;
    is_service_message: number;
    is_forward: number;
    was_downgraded: number;
    is_archive: number;
    cache_has_attachments: number;
    cache_roomnames: string;
    was_data_detected: number;
    was_deduplicated: number;
    is_audio_message: number;
    is_played: number;
    date_played: number;
    item_type: number;
    other_handle: number;
    group_title?: null;
    group_action_type: number;
    share_status: number;
    share_direction: number;
    is_expirable: number;
    expire_state: number;
    message_action_type: number;
    message_source: number;
    associated_message_guid?: null;
    associated_message_type: number;
    balloon_bundle_id?: null;
    payload_data?: null;
    expressive_send_style_id?: null;
    associated_message_range_location: number;
    associated_message_range_length: number;
    time_expressive_send_played: number;
    message_summary_info?: null;
    ck_sync_state: number;
    ck_record_id: string;
    ck_record_change_tag: string;
    destination_caller_id: string;
    sr_ck_sync_state: number;
    sr_ck_record_id: string;
    sr_ck_record_change_tag: string;
    is_corrupt: number;
    reply_to_guid?: null;
    sort_id: number;
    is_spam: number;
}
  

export interface AttachmentTableRow {
    ROWID: number;
    guid: string;
    created_date: number;
    start_date: number;
    filename: string;
    uti: string;
    mime_type: string;
    transfer_state: number;
    is_outgoing: number;
    user_info: Buffer;
    transfer_name: string;
    total_bytes: number;
    is_sticker: number;
    sticker_user_info?: null;
    attribution_info: Buffer;
    hide_attachment: number;
    ck_sync_state: number;
    ck_server_change_token_blob: Buffer;
    ck_record_id: string;
    original_guid: string;
    sr_ck_sync_state: number;
    sr_ck_server_change_token_blob: Buffer;
    sr_ck_record_id: string;
}

interface ChatMessageJoinTable {
    chat_id: number,
    message_id: number,
    message_date: number
}