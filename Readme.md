PoC app to listen and audit new Uniswap V2 pair shitcoins

1. Connect to RPC Node by using Websockets protocol and listen for Uniswap v2 Factory
   contract event PairCreated to detect new pairs and extract new token out of the pair

2. Run GoSign API to audit newly found token smart contract

3. Save newly found token with GoSign API audit results to data store of choice:

4. Run cron job every minute which checks the datastore for tokens where 24 hours still haven't
   passed since detection and last audit was longer than hour ago. For such tokens run GoSign API audit
   again and save last audit timestamp along with audit change log (if anything has changes). If after
   audit log change detection there are any tokens that match ape criteria, ape X WETH/USDC/USDT/DAI from
   wallet Y and send Telegram notification.
