export enum AuditChangeType {
  owner_address = 'owner_address',
  token_name = 'token_name',
  token_symbol = 'token_symbol',
  creator_address = 'creator_address',
  other_potential_risks = 'other_potential_risks',
  note = 'note',
  buy_tax = 'buy_tax',
  sell_tax = 'sell_tax',
  lp_holder_count = 'lp_holder_count',
  holder_count = 'holder_count',
  owner_balance = 'owner_balance',
  owner_percent = 'owner_percent',
  creator_balance = 'creator_balance',
  creator_percent = 'creator_percent',
  total_supply = 'total_supply',
  trading_cooldown = 'trading_cooldown',
  lp_total_supply = 'lp_total_supply',
  honeypot_with_same_creator = 'honeypot_with_same_creator',
  owner_change_balance = 'owner_change_balance',
  anti_whale_modifiable = 'anti_whale_modifiable',
  can_take_back_ownership = 'can_take_back_ownership',
  cannot_buy = 'cannot_buy',
  cannot_sell_all = 'cannot_sell_all',
  external_call = 'external_call',
  hidden_owner = 'hidden_owner',
  is_anti_whale = 'is_anti_whale',
  is_blacklisted = 'is_blacklisted',
  is_honeypot = 'is_honeypot',
  is_in_dex = 'is_in_dex',
  is_mintable = 'is_mintable',
  is_open_source = 'is_open_source',
  is_proxy = 'is_proxy',
  is_whitelisted = 'is_whitelisted',
  personal_slippage_modifiable = 'personal_slippage_modifiable',
  transfer_pausable = 'transfer_pausable',
  selfdestruct = 'selfdestruct',
  slippage_modifiable = 'slippage_modifiable',
  is_true_token = 'is_true_token',
  is_airdrop_scam = 'is_airdrop_scam',
  trust_list = 'trust_list',
}

export interface IAuditChangeItem {
  detected_iso_timestamp: string;
  change_type: AuditChangeType;
  old_value?: string;
  new_value?: string;
}
