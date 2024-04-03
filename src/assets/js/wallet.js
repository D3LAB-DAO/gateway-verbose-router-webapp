import { ref } from 'vue';

import { ethers } from "ethers";
let provider = new ethers.BrowserProvider(window.ethereum);

import ADDRESS from './json/address.json';
import VERBOSE from './json/VerboseRouter.json';
import FACTORY from './json/IVerboseFactory.json';


const chainName = "Fantom Testnet";
const chainId = '0xfa2';
const rpcUrl = "https://rpc.ankr.com/fantom_testnet";
const nativeCurrency = { name: "Fantom", decimals: 18, symbol: "FTM" };


// Global Variables
let verbose = undefined; // contract
let factory = undefined; // contract
let isConnected = ref(false);


async function connectContract() {
    verbose = new ethers.Contract(ADDRESS.verbose, VERBOSE.abi, await getAccount());
    factory = new ethers.Contract(ADDRESS.factory, FACTORY.abi, await getAccount());
}

async function connectMetamask() {
    if (provider) {
        const { currentChainId } = await provider.getNetwork()

        if (currentChainId != chainId) {
            try {
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: chainId }]
                });
            } catch (e) {
                if (e.code === 4902) {
                    await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [{
                            chainId: chainId,
                            chainName: chainName,
                            rpcUrls: [rpcUrl],
                            nativeCurrency: nativeCurrency,
                        }],
                    });
                } else {
                    console.error("Fail to switch network");
                }
            } finally {
                provider = new ethers.BrowserProvider(window.ethereum);
            }
        }

        await provider.send('eth_requestAccounts', []); // this promps user to connect metamask
        await connectContract();
        isConnected.value = true;

        return true;
    } else {
        alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
    }
    return false;
}

async function getAccount() {
    return (await provider.getSigner());
}

async function getAddress() {
    return (await getAccount()).address;
}

function getVerbose() {
    return verbose;
}

function getFactory() {
    return factory;
}

function getIsConnected() {
    return isConnected;
}


export {
    connectMetamask, getAccount, getAddress,
    getVerbose, getFactory,
    getIsConnected
}
