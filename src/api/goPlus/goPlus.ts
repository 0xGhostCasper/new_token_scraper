import axios from 'axios';

import { ITokenSecurityResult } from './models/TokenSecurity.js';
import { createLogger } from '../../logging/logger.js';

const api = 'https://api.gopluslabs.io/api/v1';

const logger = createLogger('goplus-api-client');

export const tokenSecurity: (
  contract_address: string
) => Promise<ITokenSecurityResult | null> = async (
  contract_address: string
) => {
  const path = `${api}/token_security/1?contract_addresses=${contract_address}`;

  logger.info('Calling Goplus Token Security API with path: ' + path);

  try {
    let result = await axios.get(path);
    if (result.status !== 200)
      throw new Error(
        'Invalid response status code from Goplus Token Security API'
      );

    if (result.data.message !== 'OK')
      throw new Error(
        'Invalid response message from Goplus Token Security API. Returned message: ' +
          result.data.message
      );

    logger.debug(
      'Goplus Token Security API returned: ' + JSON.stringify(result.data)
    );

    return {
      code: result.data.code,
      message: result.data.message,
      result: result.data.result,
    };
  } catch (error) {
    logger.error(
      'Error calling Goplus Token Security API with path: ' +
        path +
        '. Error: ' +
        error
    );
    return null;
  }
};

export const tokenSecurityWithRetries: (
  contract_address: string
) => Promise<ITokenSecurityResult | null> = async (
  contract_address: string
) => {
  let result: ITokenSecurityResult | null = null;
  let i = 0;

  do {
    if (i > 0) {
      logger.warn(
        'Retrying Calling Goplus Token Security API, iteration: + ' + i
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    result = await tokenSecurity(contract_address);
    if (result?.result && contract_address in result?.result && i >= 5) {
      break;
    }
    i++;
  } while (
    (!result?.result || !(contract_address in result?.result)) &&
    i < 99
  );

  if (!result?.result || !(contract_address in result?.result)) {
    logger.error(
      'Error calling Goplus Token Security API with path: ' +
        contract_address +
        '. Retried ' +
        i +
        ' times. Error: ' +
        result?.message
    );
  }
  return result;
};
