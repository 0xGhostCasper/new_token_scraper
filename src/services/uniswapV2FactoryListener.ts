import { Contract, WebSocketProvider } from 'ethers';
import { IPairCreated } from './models/PairCreated.js';
import winston, { format } from 'winston';
import { env } from '../config/env.js';
import { createLogger } from '../logging/logger.js';

const abi = [
  'event PairCreated(address indexed token0, address indexed token1, address pool, uint256 noname)',
];

const liquid_token_addresses = [
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
  '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT
  '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
];

const PAIR_CREATED_EVENT_NAME = 'PairCreated';

const logger = createLogger('uniswap-v2-factory-listener');

export interface IUniswapV2FactoryListener {
  listenForPairCreated(callback: () => Promise<void>): void;
}

export class UniswapV2FactoryListener implements IUniswapV2FactoryListener {
  private _ws_provider_url: string;
  private _factory_address: string;

  constructor(ws_provider_url: string, factory_address: string) {
    this._ws_provider_url = ws_provider_url;
    this._factory_address = factory_address;
  }
  async listenForPairCreated(
    callback: (pairCreated: IPairCreated) => Promise<void>
  ): Promise<void> {
    try {
      logger.info('Starting listening to Uniswap v2 factory address');

      const provider = new WebSocketProvider(this._ws_provider_url);

      const contract = new Contract(this._factory_address, abi, provider);

      await contract.getAddress();

      contract.on(
        PAIR_CREATED_EVENT_NAME,
        async (token0, token1, pair, noname, event) => {
          const blockNumber = await provider.getBlockNumber();

          logger.info(
            `Received new PairCreated event at block: ${blockNumber}, token0: ${token0} token1: ${token1}, pair: ${pair}`
          );

          await callback({
            liquidTokenAddress: liquid_token_addresses.some((a) => a === token0)
              ? token0.toLowerCase()
              : token1.toLowerCase(),
            shitcoinAddress: liquid_token_addresses.some((a) => a === token0)
              ? token1.toLowerCase()
              : token0.toLowerCase(),
            pairAddress: pair.toLowerCase(),
            blockNumber: blockNumber,
          });
        }
      );
    } catch (error) {
      logger.error('UniswapV2FactoryListener failed with error: ' + error);
      throw error;
    }
  }
}
