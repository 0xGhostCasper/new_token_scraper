import { MongoClient } from 'mongodb';
import { env } from '../config/env.js';
import { IAuditedToken } from '../models/AuditedToken.js';
import { createLogger } from '../logging/logger.js';
import { detectAuditedTokenChanges } from '../services/changeTracker.js';

const DATABASE_NAME = 'new-tokens-scraper-database';
const COLLECTION_NAME = 'new-tokens';

const logger = createLogger('mongo-repository');

export class MongoRepository {
  _client: MongoClient;

  constructor() {
    this._client = new MongoClient(env.MONGODB_CONNECTION_STRING);
  }

  async syncAuditedToken(auditedToken: IAuditedToken) {
    try {
      logger.info(
        'Starting sync audited token to MongoDB, connecting to db...'
      );

      await this._client.connect();
      const database = this._client.db(DATABASE_NAME);
      const collection = database.collection(COLLECTION_NAME);

      let result = await collection.findOne<IAuditedToken>({
        address: auditedToken.address,
      });

      if (!result) {
        logger.info(
          'Audited token not found in MongoDB, inserting...' +
            auditedToken.address
        );
        await collection.updateOne(
          { address: auditedToken.address },
          { $set: auditedToken },
          { upsert: true }
        );
        logger.info('Audited token synced to MongoDB');

        return;
      }

      logger.info(
        'Audited token found in MongoDB ' +
          auditedToken.address +
          ', updating... ' +
          auditedToken.last_updated_iso_timestamp
      );

      let tokenWithAuditChanges = detectAuditedTokenChanges(
        auditedToken,
        result
      );

      await collection.updateOne(
        { address: auditedToken.address },
        {
          $set: {
            owner_address: tokenWithAuditChanges.owner_address,
            token_name: tokenWithAuditChanges.token_name,
            token_symbol: tokenWithAuditChanges.token_symbol,
            creator_address: tokenWithAuditChanges.creator_address,
            other_potential_risks: tokenWithAuditChanges.other_potential_risks,
            note: tokenWithAuditChanges.note,
            buy_tax: tokenWithAuditChanges.buy_tax,
            sell_tax: tokenWithAuditChanges.sell_tax,
            lp_holder_count: tokenWithAuditChanges.lp_holder_count,
            holder_count: tokenWithAuditChanges.holder_count,
            owner_balance: tokenWithAuditChanges.owner_balance,
            owner_percent: tokenWithAuditChanges.owner_percent,
            creator_balance: tokenWithAuditChanges.creator_balance,
            creator_percent: tokenWithAuditChanges.creator_percent,
            total_supply: tokenWithAuditChanges.total_supply,
            trading_cooldown: tokenWithAuditChanges.trading_cooldown,
            lp_total_supply: tokenWithAuditChanges.lp_total_supply,
            honeypot_with_same_creator:
              tokenWithAuditChanges.honeypot_with_same_creator,
            owner_change_balance: tokenWithAuditChanges.owner_change_balance,
            anti_whale_modifiable: tokenWithAuditChanges.anti_whale_modifiable,
            can_take_back_ownership:
              tokenWithAuditChanges.can_take_back_ownership,
            cannot_buy: tokenWithAuditChanges.cannot_buy,
            cannot_sell_all: tokenWithAuditChanges.cannot_sell_all,
            external_call: tokenWithAuditChanges.external_call,
            hidden_owner: tokenWithAuditChanges.hidden_owner,
            is_anti_whale: tokenWithAuditChanges.is_anti_whale,
            is_blacklisted: tokenWithAuditChanges.is_blacklisted,
            is_honeypot: tokenWithAuditChanges.is_honeypot,
            is_in_dex: tokenWithAuditChanges.is_in_dex,
            is_mintable: tokenWithAuditChanges.is_mintable,
            is_open_source: tokenWithAuditChanges.is_open_source,
            is_proxy: tokenWithAuditChanges.is_proxy,
            is_whitelisted: tokenWithAuditChanges.is_whitelisted,
            personal_slippage_modifiable:
              tokenWithAuditChanges.personal_slippage_modifiable,
            transfer_pausable: tokenWithAuditChanges.transfer_pausable,
            selfdestruct: tokenWithAuditChanges.selfdestruct,
            slippage_modifiable: tokenWithAuditChanges.slippage_modifiable,
            is_true_token: tokenWithAuditChanges.is_true_token,
            is_airdrop_scam: tokenWithAuditChanges.is_airdrop_scam,
            trust_list: tokenWithAuditChanges.trust_list,
            audit_changes: tokenWithAuditChanges.audit_changes,
            last_updated_iso_timestamp: auditedToken.last_updated_iso_timestamp,
          },
        }
      );
    } catch (e) {
      logger.error('Error syncing audited token to MongoDB', e);
    }
  }

  async getAuditedTokensToCheck() {
    try {
      logger.info(
        'Starting get audited tokens to check from MongoDB, connecting to db...'
      );

      await this._client.connect();
      const database = this._client.db(DATABASE_NAME);
      const collection = database.collection(COLLECTION_NAME);

      let checkDate = new Date();
      checkDate.setHours(checkDate.getHours() - 1);

      const auditedTokens = await collection
        .find<IAuditedToken>({
          last_updated_iso_timestamp: { $lt: checkDate.toISOString() },
        })
        .toArray();

      logger.info(
        `Got ${auditedTokens.length} audited tokens to check from MongoDB`
      );

      return auditedTokens;
    } catch (e) {
      logger.error('Error getting audited tokens to check from MongoDB', e);
      return [];
    }
  }
}
