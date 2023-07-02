import { getAccount, getAddress, getVerbose, getFactory } from "./wallet";
import { ref } from 'vue';

import { ethers } from "ethers";
let provider = new ethers.BrowserProvider(window.ethereum);

import ADDRESS from './json/address.json';
import ERC20 from './json/IERC20.json';


// Global Variables
let slippage = 0.5;
let tokenA = ref("select");
let tokenB = ref("select");
let inputA = ref(0);
let inputB = ref(0);
let lastUpdatedIndex = ref(null);


function getSlippage() {
    return slippage;
}

function setSlippage(newSlippage) {
    slippage = newSlippage;
}

async function getPair() {
    if (await isSwapAble()) { return null; }

    const factory = getFactory();
    const pair = await factory.getPair(
        getTokenAddress(tokenA.value),
        getTokenAddress(tokenB.value)
    );
    return pair;
}

async function swap() {
    if (!(await isSwapAble())) { return false; }

    const verbose = getVerbose();
    const isTokenANative = isNative(tokenA);
    const isTokenBNative = isNative(tokenB);
    const amount = getAmountFromLastUpdate();

    console.log(amount);

    const path = [getTokenAddress(tokenA.value), getTokenAddress(tokenB.value)];
    const to = await getAddress();

    if (getLastUpdatedIndex().value === 0) {  // ExactTokenForToken
        const swapAmount = BigInt(amount);
        // console.log(swapAmount);

        if (isTokenANative) {
            console.log("swapExactFTMForTokens");
            let res = await verbose.swapExactFTMForTokens(path, to, { value: swapAmount });
            await res.wait();
        } else if (isTokenBNative) {
            console.log("swapExactTokensForFTM");
            let res = await verbose.swapExactTokensForFTM(swapAmount, path, to);
            await res.wait();
        } else {
            console.log("swapExactTokensForTokens");
            let res = await verbose.swapExactTokensForTokens(swapAmount, path, to);
            await res.wait();
        }
    } else { // TokenForExactToken
        const swapAmount = BigInt(amount);
        // console.log(swapAmount);

        if (isTokenANative) {
            console.log("swapFTMForExactTokens");
            let res = await verbose.swapFTMForExactTokens(swapAmount, path, to);
            await res.wait();
        } else if (isTokenBNative) {
            console.log("swapTokensForExactFTM");
            let res = await verbose.swapTokensForExactFTM(swapAmount, path, to);
            await res.wait();
        } else {
            console.log("swapTokensForExactTokens");
            let res = await verbose.swapTokensForExactTokens(swapAmount, path, to);
            await res.wait();
        }
    }
}

function isNative(token) {
    const address = getTokenAddress(token.value);
    if (address !== null) {
        if (address === ADDRESS.wftm) { return true; }
        else { return false; }
    } else { return null; }
}

async function isSwapAble() {
    // console.log(tokenA.value, tokenB.value);
    // console.log(inputA.value, inputB.value);

    if (tokenA.value === "select" || tokenB.value === "select") {
        // console.log(1);
        return false;
    } else if (tokenA.value === tokenB.value) {
        // console.log(2);
        return false;
    } else if (BigInt(inputA.value) <= BigInt(0) || BigInt(inputB.value) <= BigInt(0)) {
        // console.log(3);
        return false;
    } else if (BigInt(inputA.value) > BigInt(await getTokenBalance(tokenA.value))) {
        // console.log(4);
        return false;
    }
    return true;
}

function change() {
    const tempTokenASymbol = getTokenA().value;
    const tempTokenBSymbol = getTokenB().value;
    tokenA.value = tempTokenBSymbol;
    tokenB.value = tempTokenASymbol;

    const tempInputA = getInputA().value;
    const tempInputB = getInputB().value;
    inputA.value = tempInputB;
    inputB.value = tempInputA;

    if (lastUpdatedIndex.value === 0) {
        lastUpdatedIndex.value === 1;
    } else if (lastUpdatedIndex.value === 1) {
        lastUpdatedIndex.value === 0;
    }
}

function getTokenList() {
    // TODO: get token list
    return ['FTM', 'USDC'];
}

function getTokenAddress(token) {
    if (token === 'FTM') { return ADDRESS.wftm; }
    else if (token === 'USDC') { return ADDRESS.usdc; }
    else { return null; }
}

async function getTokenBalance(token) {
    const address = getTokenAddress(token);
    if (address !== null) {
        if (address === ADDRESS.wftm) {
            // console.log("FTM balance");
            return await provider.getBalance(await getAddress());
        } else {
            // console.log("USDC balance");
            const erc20 = new ethers.Contract(address, ERC20.abi, provider);
            return await erc20.balanceOf(getAddress());
        }
    } else { return null; }
}

async function getTokenDecimals(token) {
    const address = getTokenAddress(token);
    if (address !== null) {
        if (address === ADDRESS.wftm) {
            // console.log("FTM decimals");
            return 18;
        } else {
            // console.log("USDC balance");
            const erc20 = new ethers.Contract(address, ERC20.abi, provider);
            return await erc20.decimals();
        }
    } else { return null; }
}

function getTokenA() {
    return tokenA;
}

function setTokenA(newTokenSymbol) {
    tokenA.value = newTokenSymbol;
    // console.log("tokenA", tokenA.value);
}

function getTokenB() {
    return tokenB;
}

function setTokenB(newTokenSymbol) {
    tokenB.value = newTokenSymbol;
    // console.log("tokenB", tokenB.value);
}

function getInputA() {
    return inputA;
}

function getInputB() {
    return inputB;
}

function setInputA(newInput) {
    inputA.value = newInput;
    // console.log("inputA", inputA.value)
}

function setInputB(newInput) {
    inputB.value = newInput;
    // console.log("inputB", inputB.value)
}

function getLastUpdatedIndex() {
    return lastUpdatedIndex;
}

function setLastUpdatedIndex(index) {
    lastUpdatedIndex.value = index;
}

function getAmountFromLastUpdate() {
    if (lastUpdatedIndex.value === 0) {
        return inputA.value;
    } else if (lastUpdatedIndex.value === 1) {
        return inputB.value;
    }
    return null;
}


export {
    getSlippage, setSlippage, getPair, swap, isSwapAble,
    change, getTokenList, getTokenAddress, getTokenBalance, getTokenDecimals,
    getTokenA, setTokenA, getTokenB, setTokenB,
    getInputA, getInputB, setInputA, setInputB,
    getLastUpdatedIndex, setLastUpdatedIndex
}
