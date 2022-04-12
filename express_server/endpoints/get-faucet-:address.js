const { ethers } = require("ethers");
const { errorResponse, invalidReqResponse } = require("../api-util");
const FaucetHandler = require('../../faucet_handler/FaucetHandler');

module.exports = async function (req, res) {
    let address = req.params["address"];
    if (!address) { return invalidReqResponse(res); }
    let checkedAddress;
    try {
        checkedAddress = ethers.utils.getAddress(address);
        if (checkedAddress.length !== 42) {
            throw new Error({ customMsg: "invalid address length expecting 40 or 42 hexadecimal characters" });
        }
        // If address is okay, submit request for virtualMintDeposit
        console.log(`Deposit to ${address} initiated with new hardhat task process ...`);
        let deposit = await FaucetHandler.runVirtualMintDepositForAddress(address);
        if (deposit.error) {
            console.error("Internal error during deposit:=", deposit.error);
            throw new Error(`could not complete deposit to ${address}`);
        } else {
            console.log(`Deposit to ${address} for 100,000 tokens successful w/ txHash: ${deposit}`)
            return res.send({ depositedTo: address, txHash: deposit, error: false })
        }
    } catch (ex) {
        if (ex.reason) {
            return res.send(errorResponse(ex.reason));
        }
        if (ex.message) {
            return res.send(errorResponse(ex.message));
        }
        res.send(errorResponse("an unknown error ocurred"));
    }
};