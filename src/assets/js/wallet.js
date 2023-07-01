import { ethers } from "ethers";
let provider = new ethers.BrowserProvider(window.ethereum);

import ADDRESS from './json/address.json'
import VERBOSE from './json/VerboseRouter.json'


const chainName = "Fantom Testnet";
const chainId = '0xfa2';
const rpcUrl = "https://rpc.testnet.fantom.network/";
const nativeCurrency = { name: "Fantom", decimals: 18, symbol: "FTM" };


// Global Variables
let account = undefined;
let address = undefined;
let verbose = undefined; // contract


async function connectContract() {
    verbose = new ethers.Contract(ADDRESS.verbose, VERBOSE.abi, provider);
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
        account = await provider.getSigner();
        address = account.address;
        await connectContract();

        return true;
    } else {
        alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
    }
    return false;
}

function getAddress() {
    return address;
}

export {
    connectMetamask, getAddress
}
