const { exec } = require('child_process');

/**
 * Handles all interactions with child processes to npx hardhat and running virtualMintDeposits
 */
class FaucetHandler {

    static runVirtualMintDepositForAddress(address) {
        return new Promise(res => {
            let proc_0 = exec(`\
            cd ../bridge;\
            export TS_NODE_TRANSPILE_ONLY=1;\
            npx hardhat virtualMintDeposit \
            --deposit-owner-address ${address}\
            --deposit-amount 100000\
            --factory-address 0x9AC94eCFa6033bccDDc073e2Bd9F45d07Ccc9e4a \
            --network dev`, 
            (error, stdOut, stderr) => {
                if (!!error || !!stderr) {
                    return res({ error: stderr });
                }
                // Slice out txHash if no error
                let txHashStartIdx = stdOut.indexOf("transactionHash:")
                let txHashEndIdx = txHashStartIdx + 85;
                let txHashLine = stdOut.slice(txHashStartIdx, txHashEndIdx) 
                let actualHashStartIdx = txHashLine.indexOf("'") + 1;
                let actualHashEndIdx = actualHashStartIdx + 66;
                let txHash = txHashLine.slice(actualHashStartIdx, actualHashEndIdx);
                return res(txHash);
            });
            // proc_0.stdout.pipe(process.stdout);
        })
    }

}

module.exports = FaucetHandler;

