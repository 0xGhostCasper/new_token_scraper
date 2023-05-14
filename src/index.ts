import { tokenSecurityWithRetries } from './api/goPlus/goPlus.js';
import { sendTelegramBotMessage } from './api/telegram/telegram.js';
import { env } from './config/env.js';
import { MongoRepository } from './db/mongo.js';
import { AuditedToken } from './models/AuditedToken.js';
import { isTokenGoodForAping } from './services/apeValidator.js';
import { runPeriodicCheckAuditedTokensJob } from './services/jobs.js';
import { UniswapV2FactoryListener } from './services/uniswapV2FactoryListener.js';

const listener = new UniswapV2FactoryListener(
  env.WS_PROVIDER_URL,
  env.UNISWAP_V2_FACTORY_ADDRESS
);

const db = new MongoRepository();

Promise.all([
  runPeriodicCheckAuditedTokensJob(),
  listener.listenForPairCreated(async (pairCreated) => {
    const auditResult = await tokenSecurityWithRetries(
      pairCreated.shitcoinAddress
    );

    if (
      !auditResult ||
      !auditResult.result ||
      !(pairCreated.shitcoinAddress in auditResult.result)
    ) {
      return;
    }

    let auditResultValue = auditResult.result[pairCreated.shitcoinAddress];

    const token = new AuditedToken(
      pairCreated.shitcoinAddress,
      pairCreated.pairAddress,
      auditResultValue
    );

    await db.syncAuditedToken(token);

    if (isTokenGoodForAping(token)) {
      sendTelegramBotMessage(
        `New shitcoin token that is potentially good for aping found, address: ${token.address}. Holders: ${token.holder_count}. LP holders: ${token.lp_holder_count}`
      );
    }
  }),
]);
