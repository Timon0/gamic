import { ThrowStmt } from '@angular/compiler';
import { Inject, Injectable } from '@angular/core';
import Web3 from 'web3';
import { WEB3 } from '../web3.injection-token';

const ContractABI = require("../../../../../blockchain/artifacts/contracts/Greeter.sol/Greeter.json");

@Injectable({
    providedIn: 'root',
})
export class SmartContractService {

    private readonly ADRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    private contract: any;
    constructor(@Inject(WEB3) private web3: Web3) {
        this.contract = new this.web3.eth.Contract(ContractABI.abi, this.ADRESS);
    }

    async getGreeting(): Promise<string> {
        return await this.contract.methods.greet().call();
    }

    async setGreeting(greeting: string): Promise<any> {
        await (window as any).ethereum.enable();
        const accounts = await this.web3.eth.getAccounts();
        return this.contract.methods.setGreeting(greeting).send({from: accounts[0]});
    }
}
