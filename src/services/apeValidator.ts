//https://docs.gopluslabs.io/reference/token-security-api-response-detail

const BLACK_HOLE_ADDRESS = '0x0000000000000000000000000000000000000000';

import { log } from 'console';
import { createLogger } from '../logging/logger.js';
import { IAuditedToken } from '../models/AuditedToken.js';

const logger = createLogger('ape-validator');

export const isTokenGoodForAping = (token: IAuditedToken) => {
  if (
    checkIfContractSecurityIsGood(token) &&
    checkIfTradingSecurityIsGood(token) &&
    checkIfInfoSecurityIsGood(token)
  ) {
    logger.info('Token was analyzed and IS GOOD for aping!: ' + token.address);
    return true;
  }

  logger.info(
    'Token was analyzed and IS NOT GOOD for aping!: ' + token.address
  );

  return false;
};

const checkIfContractSecurityIsGood = (token: IAuditedToken) => {
  if (!token.is_open_source) {
    logger.info('Token is not open source ' + token.address);
    return false;
  }

  if (token.is_proxy === true) {
    logger.info('Token is proxy ' + token.address);
    return false;
  }

  if (token.is_mintable === true) {
    logger.info('Token is mintable ' + token.address);
    return false;
  }

  if (
    token.owner_address &&
    token.owner_address !== BLACK_HOLE_ADDRESS &&
    token.owner_address !== ''
  ) {
    logger.info(
      'Token has owner address' +
        token.address +
        'owner: ' +
        token.owner_address
    );
    return false;
  }

  if (token.can_take_back_ownership === true) {
    logger.info('Token can take back ownership ' + token.address);
    return false;
  }

  if (token.owner_change_balance === true) {
    logger.info('Token owner can change balance ' + token.address);
    return false;
  }

  if (token.hidden_owner === true) {
    logger.info('Token has hidden owner ' + token.address);
    return false;
  }

  if (token.selfdestruct === true) {
    logger.info('Token can selfdestruct ' + token.address);
    return false;
  }

  if (token.external_call === true) {
    logger.info('Token can make external call ' + token.address);
    return false;
  }

  return true;
};

const checkIfTradingSecurityIsGood = (token: IAuditedToken) => {
  if (token.buy_tax && token.buy_tax > 0.1) {
    logger.info('Token has buy tax ' + token.address + 'tax: ' + token.buy_tax);
    return false;
  }

  if (token.sell_tax && token.sell_tax > 0.1) {
    logger.info(
      'Token has sell tax ' + token.address + 'tax: ' + token.sell_tax
    );
    return false;
  }

  if (token.cannot_buy === true) {
    logger.info('Token cannot be bought ' + token.address);
    return false;
  }

  if (token.cannot_sell_all === true) {
    logger.info('Token cannot be sold all ' + token.address);
    return false;
  }

  if (token.slippage_modifiable === true) {
    logger.info('Token slippage is modifiable ' + token.address);
    return false;
  }

  if (token.is_honeypot === true) {
    logger.info('Token is honeypot ' + token.address);
    return false;
  }

  if (token.transfer_pausable === true) {
    logger.info('Token transfer is pausable ' + token.address);
    return false;
  }

  if (token.is_whitelisted === true) {
    logger.info('Token is whitelisted ' + token.address);
    return false;
  }

  //   if (token.is_blacklsited === true) {
  //     return false;
  //   }

  if (!token.is_in_dex) {
    logger.info('Token is not in dex ' + token.address);
    return false;
  }

  if (token.personal_slippage_modifiable === true) {
    logger.info('Token personal slippage is modifiable ' + token.address);
    return false;
  }

  return true;
};

const checkIfInfoSecurityIsGood = (token: IAuditedToken) => {
  if (
    token.holder_count &&
    (token.holder_count < 10 || token.holder_count > 200)
  ) {
    logger.info(
      'Token has holder count ' +
        token.address +
        'holders: ' +
        token.holder_count
    );
    return false;
  }

  if (token.owner_percent && token.owner_percent > 0) {
    logger.info(
      'Token has owner percent ' +
        token.address +
        'percent: ' +
        token.owner_percent
    );
    return false;
  }

  if (token.creator_percent && token.creator_percent > 0) {
    logger.info('Token has creator percent greater than zero ' + token.address);
    return false;
  }

  if (token.lp_holder_count && token.lp_holder_count < 1) {
    logger.info('Token has lp holder count zero ' + token.address);
    return false;
  }

  if (token.is_true_token === false) {
    logger.info('Token is not true token ' + token.address);
    return false;
  }

  if (token.is_airdrop_scam === true) {
    logger.info('Token is airdrop scam ' + token.address);
    return false;
  }

  if (token.other_potential_risks) {
    logger.info('Token has other potential risks ' + token.address);
    return false;
  }

  return true;
};
