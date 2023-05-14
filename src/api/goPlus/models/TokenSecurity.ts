// https://docs.gopluslabs.io/reference/token-security-api-response-detail/contract-security

export interface ITokenSecurityResult {
  code?: number;
  message?: string;
  result?: { [contract_address: string]: ITokenSecurityResultItem };
}

export interface ITokenSecurityResultItem {
  anti_whale_modifiable?: string;
  buy_tax?: string;
  can_take_back_ownership?: string;
  is_true_token?: string;
  is_airdrop_scam?: string;
  trust_list?: string;
  note?: string;
  other_potential_risks?: string;
  cannot_buy?: string;
  cannot_sell_all?: string;
  creator_address?: string;
  creator_balance?: string;
  creator_percent?: string;
  external_call?: string;
  hidden_owner?: string;
  holder_count?: string;
  honeypot_with_same_creator?: string;
  is_anti_whale?: string;
  is_blacklsited?: string;
  is_honeypot?: string;
  is_in_dex?: string;
  is_mintable?: string;
  is_open_source?: string;
  is_proxy?: string;
  is_whitelisted?: string;
  lp_holder_count?: string;
  lp_total_supply?: string;
  owner_address?: string;
  owner_balance?: string;
  owner_change_balance?: string;
  owner_percent?: string;
  personal_slippage_modifiable?: string;
  selfdestruct?: string;
  sell_tax?: string;
  slippage_modifiable?: string;
  token_name?: string;
  token_symbol?: string;
  total_supply?: string;
  trading_cooldown?: string;
  transfer_pausable?: string;
  dex?: IDexResult[];
  holders?: IHolderResult[];
  lp_holders?: ILpHolderResult[];
}

export interface IDexResult {
  name?: string;
  liquidity?: string;
  pair?: string;
}

interface IGeneicHolderResult {
  address?: string;
  tag?: string;
  is_contract?: boolean;
  balance?: string;
  percent?: string;
  is_locked?: boolean;
}

export interface IHolderResult extends IGeneicHolderResult {}

export interface ILpHolderResult extends IGeneicHolderResult {}
