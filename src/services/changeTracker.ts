import { IAuditedToken } from '../models/AuditedToken.js';
import { AuditChangeType } from '../models/AuditChangeItem.js';

export const detectAuditedTokenChanges = (
  newUpdatedToken: IAuditedToken,
  oldToken: IAuditedToken
) => {
  if (!oldToken.audit_changes) {
    oldToken.audit_changes = [];
  }

  if (newUpdatedToken.owner_address != oldToken.owner_address) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.owner_address,
      old_value: oldToken.owner_address,
      new_value: newUpdatedToken.owner_address,
    });
  }

  if (newUpdatedToken.token_name != oldToken.token_name) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.token_name,
      old_value: oldToken.token_name,
      new_value: newUpdatedToken.token_name,
    });
  }

  if (newUpdatedToken.token_symbol != oldToken.token_symbol) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.token_symbol,
      old_value: oldToken.token_symbol,
      new_value: newUpdatedToken.token_symbol,
    });
  }

  if (newUpdatedToken.creator_address != oldToken.creator_address) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.creator_address,
      old_value: oldToken.creator_address,
      new_value: newUpdatedToken.creator_address,
    });
  }

  if (newUpdatedToken.other_potential_risks != oldToken.other_potential_risks) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.other_potential_risks,
      old_value: oldToken.other_potential_risks,
      new_value: newUpdatedToken.other_potential_risks,
    });
  }

  if (newUpdatedToken.note != oldToken.note) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.note,
      old_value: oldToken.note,
      new_value: newUpdatedToken.note,
    });
  }

  if (newUpdatedToken.buy_tax != oldToken.buy_tax) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.buy_tax,
      old_value: oldToken.buy_tax?.toString(),
      new_value: newUpdatedToken.buy_tax?.toString(),
    });
  }

  if (newUpdatedToken.sell_tax != oldToken.sell_tax) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.sell_tax,
      old_value: oldToken.sell_tax?.toString(),
      new_value: newUpdatedToken.sell_tax?.toString(),
    });
  }

  if (newUpdatedToken.lp_holder_count != oldToken.lp_holder_count) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.lp_holder_count,
      old_value: oldToken.lp_holder_count?.toString(),
      new_value: newUpdatedToken.lp_holder_count?.toString(),
    });
  }

  if (newUpdatedToken.holder_count != oldToken.holder_count) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.holder_count,
      old_value: oldToken.holder_count?.toString(),
      new_value: newUpdatedToken.holder_count?.toString(),
    });
  }

  if (newUpdatedToken.owner_balance != oldToken.owner_balance) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.owner_balance,
      old_value: oldToken.owner_balance?.toString(),
      new_value: newUpdatedToken.owner_balance?.toString(),
    });
  }

  if (newUpdatedToken.owner_percent != oldToken.owner_percent) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.owner_percent,
      old_value: oldToken.owner_percent?.toString(),
      new_value: newUpdatedToken.owner_percent?.toString(),
    });
  }

  if (newUpdatedToken.creator_balance != oldToken.creator_balance) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.creator_balance,
      old_value: oldToken.creator_balance?.toString(),
      new_value: newUpdatedToken.creator_balance?.toString(),
    });
  }

  if (newUpdatedToken.creator_percent != oldToken.creator_percent) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.creator_percent,
      old_value: oldToken.creator_percent?.toString(),
      new_value: newUpdatedToken.creator_percent?.toString(),
    });
  }

  if (newUpdatedToken.total_supply != oldToken.total_supply) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.total_supply,
      old_value: oldToken.total_supply?.toString(),
      new_value: newUpdatedToken.total_supply?.toString(),
    });
  }

  if (newUpdatedToken.trading_cooldown != oldToken.trading_cooldown) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.trading_cooldown,
      old_value: oldToken.trading_cooldown?.toString(),
      new_value: newUpdatedToken.trading_cooldown?.toString(),
    });
  }

  if (newUpdatedToken.lp_total_supply != oldToken.lp_total_supply) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.lp_total_supply,
      old_value: oldToken.lp_total_supply?.toString(),
      new_value: newUpdatedToken.lp_total_supply?.toString(),
    });
  }

  if (
    newUpdatedToken.honeypot_with_same_creator !=
    oldToken.honeypot_with_same_creator
  ) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.honeypot_with_same_creator,
      old_value: oldToken.honeypot_with_same_creator?.toString(),
      new_value: newUpdatedToken.honeypot_with_same_creator?.toString(),
    });
  }

  if (newUpdatedToken.owner_change_balance != oldToken.owner_change_balance) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.owner_change_balance,
      old_value: oldToken.owner_change_balance?.toString(),
      new_value: newUpdatedToken.owner_change_balance?.toString(),
    });
  }

  if (newUpdatedToken.anti_whale_modifiable != oldToken.anti_whale_modifiable) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.anti_whale_modifiable,
      old_value: oldToken.anti_whale_modifiable?.toString(),
      new_value: newUpdatedToken.anti_whale_modifiable?.toString(),
    });
  }

  if (
    newUpdatedToken.can_take_back_ownership != oldToken.can_take_back_ownership
  ) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.can_take_back_ownership,
      old_value: oldToken.can_take_back_ownership?.toString(),
      new_value: newUpdatedToken.can_take_back_ownership?.toString(),
    });
  }

  if (newUpdatedToken.cannot_buy != oldToken.cannot_buy) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.cannot_buy,
      old_value: oldToken.cannot_buy?.toString(),
      new_value: newUpdatedToken.cannot_buy?.toString(),
    });
  }

  if (newUpdatedToken.cannot_sell_all != oldToken.cannot_sell_all) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.cannot_sell_all,
      old_value: oldToken.cannot_sell_all?.toString(),
      new_value: newUpdatedToken.cannot_sell_all?.toString(),
    });
  }

  if (newUpdatedToken.external_call != oldToken.external_call) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.external_call,
      old_value: oldToken.external_call?.toString(),
      new_value: newUpdatedToken.external_call?.toString(),
    });
  }

  if (newUpdatedToken.hidden_owner != oldToken.hidden_owner) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.hidden_owner,
      old_value: oldToken.hidden_owner?.toString(),
      new_value: newUpdatedToken.hidden_owner?.toString(),
    });
  }

  if (newUpdatedToken.is_anti_whale != oldToken.is_anti_whale) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.is_anti_whale,
      old_value: oldToken.is_anti_whale?.toString(),
      new_value: newUpdatedToken.is_anti_whale?.toString(),
    });
  }

  if (newUpdatedToken.is_blacklisted != oldToken.is_blacklisted) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.is_blacklisted,
      old_value: oldToken.is_blacklisted?.toString(),
      new_value: newUpdatedToken.is_blacklisted?.toString(),
    });
  }

  if (newUpdatedToken.is_honeypot != oldToken.is_honeypot) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.is_honeypot,
      old_value: oldToken.is_honeypot?.toString(),
      new_value: newUpdatedToken.is_honeypot?.toString(),
    });
  }

  if (newUpdatedToken.is_in_dex != oldToken.is_in_dex) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.is_in_dex,
      old_value: oldToken.is_in_dex?.toString(),
      new_value: newUpdatedToken.is_in_dex?.toString(),
    });
  }

  if (newUpdatedToken.is_mintable != oldToken.is_mintable) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.is_mintable,
      old_value: oldToken.is_mintable?.toString(),
      new_value: newUpdatedToken.is_mintable?.toString(),
    });
  }

  if (newUpdatedToken.is_open_source != oldToken.is_open_source) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.is_open_source,
      old_value: oldToken.is_open_source?.toString(),
      new_value: newUpdatedToken.is_open_source?.toString(),
    });
  }

  if (newUpdatedToken.is_proxy != oldToken.is_proxy) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.is_proxy,
      old_value: oldToken.is_proxy?.toString(),
      new_value: newUpdatedToken.is_proxy?.toString(),
    });
  }

  if (newUpdatedToken.is_whitelisted != oldToken.is_whitelisted) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.is_whitelisted,
      old_value: oldToken.is_whitelisted?.toString(),
      new_value: newUpdatedToken.is_whitelisted?.toString(),
    });
  }

  if (
    newUpdatedToken.personal_slippage_modifiable !=
    oldToken.personal_slippage_modifiable
  ) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.personal_slippage_modifiable,
      old_value: oldToken.personal_slippage_modifiable?.toString(),
      new_value: newUpdatedToken.personal_slippage_modifiable?.toString(),
    });
  }

  if (
    newUpdatedToken.personal_slippage_modifiable !=
    oldToken.personal_slippage_modifiable
  ) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.personal_slippage_modifiable,
      old_value: oldToken.personal_slippage_modifiable?.toString(),
      new_value: newUpdatedToken.personal_slippage_modifiable?.toString(),
    });
  }

  if (newUpdatedToken.transfer_pausable != oldToken.transfer_pausable) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.transfer_pausable,
      old_value: oldToken.transfer_pausable?.toString(),
      new_value: newUpdatedToken.transfer_pausable?.toString(),
    });
  }

  if (newUpdatedToken.selfdestruct != oldToken.selfdestruct) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.selfdestruct,
      old_value: oldToken.selfdestruct?.toString(),
      new_value: newUpdatedToken.selfdestruct?.toString(),
    });
  }

  if (newUpdatedToken.slippage_modifiable != oldToken.slippage_modifiable) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.slippage_modifiable,
      old_value: oldToken.slippage_modifiable?.toString(),
      new_value: newUpdatedToken.slippage_modifiable?.toString(),
    });
  }

  if (newUpdatedToken.is_true_token != oldToken.is_true_token) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.is_true_token,
      old_value: oldToken.is_true_token?.toString(),
      new_value: newUpdatedToken.is_true_token?.toString(),
    });
  }

  if (newUpdatedToken.is_airdrop_scam != oldToken.is_airdrop_scam) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.is_airdrop_scam,
      old_value: oldToken.is_airdrop_scam?.toString(),
      new_value: newUpdatedToken.is_airdrop_scam?.toString(),
    });
  }

  if (newUpdatedToken.trust_list != oldToken.trust_list) {
    oldToken.audit_changes.push({
      detected_iso_timestamp: new Date().toISOString(),
      change_type: AuditChangeType.trust_list,
      old_value: oldToken.trust_list?.toString(),
      new_value: newUpdatedToken.trust_list?.toString(),
    });
  }

  return oldToken;
};
