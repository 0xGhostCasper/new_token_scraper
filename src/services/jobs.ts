import schedule from 'node-schedule';
import { MongoRepository } from '../db/mongo.js';
import { createLogger } from '../logging/logger.js';
import { tokenSecurityWithRetries } from '../api/goPlus/goPlus.js';
import { splitArray } from '../utilities/arrayUtils.js';
import { AuditedToken, IAuditedToken } from '../models/AuditedToken.js';
import { isTokenGoodForAping } from './apeValidator.js';
import { sendTelegramBotMessage } from '../api/telegram/telegram.js';

const db = new MongoRepository();
const logger = createLogger('run-periodic-check-audited-tokens-job');

export const runPeriodicCheckAuditedTokensJob = async () => {
  schedule.scheduleJob('* * * * *', async function () {
    logger.info('Starting periodic check audited tokens job');

    let tokens = await db.getAuditedTokensToCheck();
    let tokensFoundWithinLastDay = tokens?.filter(
      (t) =>
        t.detected_iso_timestamp >
        new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    );
    if (!tokensFoundWithinLastDay || tokensFoundWithinLastDay.length === 0) {
      logger.info('No tokens found that must be checked');
      return;
    }
    logger.info(`Got ${tokens.length} tokens to check for audit changes`);

    const chunks = splitArray(tokens, 50);

    for (let chunk in chunks) {
      logger.info(`Checking chunk ${chunk}`);

      await Promise.all(chunks[chunk].map((token) => checkAuditedToken(token)));
    }
  });
};

const checkAuditedToken = async (token: IAuditedToken) => {
  logger.info(`Checking token: ${token.address}`);

  let tokenSecurityResult = await tokenSecurityWithRetries(token.address);
  if (
    !tokenSecurityResult ||
    !tokenSecurityResult.result ||
    !(token.address in tokenSecurityResult.result)
  ) {
    logger.info(`Token ${token.address} not found in Goplus API`);
    return;
  }

  logger.info(
    `Token ${token.address} found in Goplus API with code ${tokenSecurityResult.code}`
  );

  let auditResultValue = tokenSecurityResult.result[token.address];

  const tokenWithUpdatedAudit = new AuditedToken(
    token.address,
    token.lp_address,
    auditResultValue
  );

  tokenWithUpdatedAudit.detected_iso_timestamp = token.detected_iso_timestamp;
  tokenWithUpdatedAudit.last_updated_iso_timestamp = new Date().toISOString();

  await db.syncAuditedToken(tokenWithUpdatedAudit);

  if (isTokenGoodForAping(tokenWithUpdatedAudit)) {
    sendTelegramBotMessage(
      `New shitcoin token that is potentially good for aping found, address: ${token.address}. Holders: ${token.holder_count}. LP holders: ${token.lp_holder_count}`
    );
  }
};
