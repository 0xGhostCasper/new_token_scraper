import { ITokenSecurityResultItem } from '../api/goPlus/models/TokenSecurity.js';
import { IAuditChangeItem } from './AuditChangeItem.js';

export interface IAuditedToken {
  detected_iso_timestamp: string;
  last_updated_iso_timestamp: string;

  address: string;
  lp_address: string;

  owner_address?: string;
  token_name?: string;
  token_symbol?: string;
  creator_address?: string;
  other_potential_risks?: string;
  note?: string;

  buy_tax?: number;
  sell_tax?: number;
  lp_holder_count?: number;
  holder_count?: number;
  owner_balance?: number;
  owner_percent?: number;
  creator_balance?: number;
  creator_percent?: number;
  total_supply?: number;
  trading_cooldown?: number;
  lp_total_supply?: number;
  honeypot_with_same_creator?: number;

  owner_change_balance?: boolean;
  anti_whale_modifiable?: boolean;
  can_take_back_ownership?: boolean;
  cannot_buy?: boolean;
  cannot_sell_all?: boolean;
  external_call?: boolean;
  hidden_owner?: boolean;
  is_anti_whale?: boolean;
  is_blacklisted?: boolean;
  is_honeypot?: boolean;
  is_in_dex?: boolean;
  is_mintable?: boolean;
  is_open_source?: boolean;
  is_proxy?: boolean;
  is_whitelisted?: boolean;
  personal_slippage_modifiable?: boolean;
  transfer_pausable?: boolean;
  selfdestruct?: boolean;
  slippage_modifiable?: boolean;
  is_true_token?: boolean;
  is_airdrop_scam?: boolean;
  trust_list?: boolean;

  audit_changes?: IAuditChangeItem[];
}

export class AuditedToken implements IAuditedToken {
  constructor(
    address: string,
    lp_address: string,
    tokenSecurityResultItem: ITokenSecurityResultItem
  ) {
    this.detected_iso_timestamp = new Date().toISOString();
    this.last_updated_iso_timestamp = new Date().toISOString();

    this.address = address;
    this.lp_address = lp_address;
    this.owner_address = tokenSecurityResultItem.owner_address;
    this.token_name = tokenSecurityResultItem.token_name;
    this.token_symbol = tokenSecurityResultItem.token_symbol;
    this.creator_address = tokenSecurityResultItem.creator_address;
    this.other_potential_risks = tokenSecurityResultItem.other_potential_risks;
    this.note = tokenSecurityResultItem.note;

    this.buy_tax = tokenSecurityResultItem.buy_tax
      ? parseFloat(tokenSecurityResultItem.buy_tax)
      : undefined;
    this.sell_tax = tokenSecurityResultItem.sell_tax
      ? parseFloat(tokenSecurityResultItem.sell_tax)
      : undefined;
    this.lp_holder_count = tokenSecurityResultItem.lp_holder_count
      ? parseInt(tokenSecurityResultItem.lp_holder_count)
      : undefined;
    this.holder_count = tokenSecurityResultItem.holder_count
      ? parseInt(tokenSecurityResultItem.holder_count)
      : undefined;
    this.owner_balance = tokenSecurityResultItem.owner_balance
      ? parseInt(tokenSecurityResultItem.owner_balance)
      : undefined;
    this.owner_percent = tokenSecurityResultItem.owner_percent
      ? parseFloat(tokenSecurityResultItem.owner_percent)
      : undefined;
    this.creator_balance = tokenSecurityResultItem.creator_balance
      ? parseInt(tokenSecurityResultItem.creator_balance)
      : undefined;
    this.creator_percent = tokenSecurityResultItem.creator_percent
      ? parseFloat(tokenSecurityResultItem.creator_percent)
      : undefined;
    this.total_supply = tokenSecurityResultItem.total_supply
      ? parseInt(tokenSecurityResultItem.total_supply)
      : undefined;
    this.trading_cooldown = tokenSecurityResultItem.trading_cooldown
      ? parseInt(tokenSecurityResultItem.trading_cooldown)
      : undefined;
    this.lp_total_supply = tokenSecurityResultItem.lp_total_supply
      ? parseInt(tokenSecurityResultItem.lp_total_supply)
      : undefined;
    this.honeypot_with_same_creator =
      tokenSecurityResultItem.honeypot_with_same_creator
        ? parseInt(tokenSecurityResultItem.honeypot_with_same_creator)
        : undefined;

    this.is_true_token = tokenSecurityResultItem.is_true_token
      ? Boolean(JSON.parse(tokenSecurityResultItem.is_true_token))
      : undefined;
    this.is_airdrop_scam = tokenSecurityResultItem.is_airdrop_scam
      ? Boolean(JSON.parse(tokenSecurityResultItem.is_airdrop_scam))
      : undefined;
    this.trust_list = tokenSecurityResultItem.trust_list
      ? Boolean(JSON.parse(tokenSecurityResultItem.trust_list))
      : undefined;
    this.owner_change_balance = tokenSecurityResultItem.owner_change_balance
      ? Boolean(JSON.parse(tokenSecurityResultItem.owner_change_balance))
      : undefined;
    this.anti_whale_modifiable = tokenSecurityResultItem.anti_whale_modifiable
      ? Boolean(JSON.parse(tokenSecurityResultItem.anti_whale_modifiable))
      : undefined;
    this.can_take_back_ownership = tokenSecurityResultItem.anti_whale_modifiable
      ? Boolean(JSON.parse(tokenSecurityResultItem.anti_whale_modifiable))
      : undefined;
    this.cannot_buy = tokenSecurityResultItem.cannot_buy
      ? Boolean(JSON.parse(tokenSecurityResultItem.cannot_buy))
      : undefined;
    this.cannot_sell_all = tokenSecurityResultItem.cannot_sell_all
      ? Boolean(JSON.parse(tokenSecurityResultItem.cannot_sell_all))
      : undefined;
    this.external_call = tokenSecurityResultItem.external_call
      ? Boolean(JSON.parse(tokenSecurityResultItem.external_call))
      : undefined;
    this.hidden_owner = tokenSecurityResultItem.hidden_owner
      ? Boolean(JSON.parse(tokenSecurityResultItem.hidden_owner))
      : undefined;
    this.is_anti_whale = tokenSecurityResultItem.is_anti_whale
      ? Boolean(JSON.parse(tokenSecurityResultItem.is_anti_whale))
      : undefined;
    this.is_blacklisted = tokenSecurityResultItem.is_blacklsited
      ? Boolean(JSON.parse(tokenSecurityResultItem.is_blacklsited))
      : undefined;
    this.is_honeypot = tokenSecurityResultItem.is_honeypot
      ? Boolean(JSON.parse(tokenSecurityResultItem.is_honeypot))
      : undefined;
    this.is_in_dex = tokenSecurityResultItem.is_in_dex
      ? Boolean(JSON.parse(tokenSecurityResultItem.is_in_dex))
      : undefined;
    this.is_mintable = tokenSecurityResultItem.is_mintable
      ? Boolean(JSON.parse(tokenSecurityResultItem.is_mintable))
      : undefined;
    this.is_open_source = tokenSecurityResultItem.is_open_source
      ? Boolean(JSON.parse(tokenSecurityResultItem.is_open_source))
      : undefined;
    this.is_proxy = tokenSecurityResultItem.is_proxy
      ? Boolean(JSON.parse(tokenSecurityResultItem.is_proxy))
      : undefined;
    this.is_whitelisted = tokenSecurityResultItem.is_whitelisted
      ? Boolean(JSON.parse(tokenSecurityResultItem.is_whitelisted))
      : undefined;
    this.personal_slippage_modifiable =
      tokenSecurityResultItem.personal_slippage_modifiable
        ? Boolean(
            JSON.parse(tokenSecurityResultItem.personal_slippage_modifiable)
          )
        : undefined;
    this.transfer_pausable = tokenSecurityResultItem.transfer_pausable
      ? Boolean(JSON.parse(tokenSecurityResultItem.transfer_pausable))
      : undefined;
    this.selfdestruct = tokenSecurityResultItem.selfdestruct
      ? Boolean(JSON.parse(tokenSecurityResultItem.selfdestruct))
      : undefined;
    this.slippage_modifiable = tokenSecurityResultItem.slippage_modifiable
      ? Boolean(JSON.parse(tokenSecurityResultItem.slippage_modifiable))
      : undefined;
  }
  detected_iso_timestamp: string;
  last_updated_iso_timestamp: string;

  lp_address: string;
  address: string;
  owner_address?: string;
  token_name?: string;
  token_symbol?: string;
  creator_address?: string;
  note?: string;
  other_potential_risks?: string;

  buy_tax?: number;
  sell_tax?: number;
  lp_holder_count?: number;
  holder_count?: number;
  owner_balance?: number;
  owner_change_balance?: boolean;
  owner_percent?: number;
  creator_balance?: number;
  creator_percent?: number;
  total_supply?: number;
  trading_cooldown?: number;
  lp_total_supply?: number;
  honeypot_with_same_creator?: number;

  anti_whale_modifiable?: boolean;
  can_take_back_ownership?: boolean;
  cannot_buy?: boolean;
  cannot_sell_all?: boolean;
  external_call?: boolean;
  hidden_owner?: boolean;
  is_anti_whale?: boolean;
  is_blacklisted?: boolean;
  is_honeypot?: boolean;
  is_in_dex?: boolean;
  is_mintable?: boolean;
  is_open_source?: boolean;
  is_proxy?: boolean;
  is_whitelisted?: boolean;
  personal_slippage_modifiable?: boolean;
  transfer_pausable?: boolean;
  selfdestruct?: boolean;
  slippage_modifiable?: boolean;
  is_true_token?: boolean;
  is_airdrop_scam?: boolean;
  trust_list?: boolean;

  audit_changes?: IAuditChangeItem[];
}
