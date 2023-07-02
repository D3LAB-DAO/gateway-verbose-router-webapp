import { getVerbose, getFactory } from "./wallet";
import ADDRESS from './json/address.json';


// Global Variables
let slippage = 0.5;
let tokenASymbol = 'select';
let tokenBSymbol = 'select';


function getSlippage() {
    return slippage;
}

function setSlippage(newSlippage) {
    slippage = newSlippage;
}

async function getPair(tokenASymbol, tokenBSymbol) {
    if (isSwapAble(tokenASymbol, tokenBSymbol)) { return null; }

    const factory = getFactory();
    const pair = await factory.getPair(
        getTokenAddress(tokenASymbol),
        getTokenAddress(tokenBSymbol)
    );
    return pair;
}

async function swap(tokenASymbol, tokenBSymbol, slippage) {
    if (isSwapAble(tokenASymbol, tokenBSymbol)) { return null; }


}

function isSwapAble(tokenASymbol, tokenBSymbol) {
    return tokenASymbol != tokenBSymbol;
}


function getTokenList() {
    // TODO: get token list
    return ['FTM', 'USDC'];
}

function getTokenAddress(symbol) {
    if (symbol === 'FTM') { return ADDRESS.wftm; }
    else if (symbol === 'USDC') { return ADDRESS.usdc; }
    else { return null; }
}

function getTokenA() {
    return tokenASymbol;
}

function setTokenA(newTokenASymbol) {
    tokenASymbol = newTokenASymbol;
    console.log(tokenASymbol);
}

function getTokenB() {
    return tokenBSymbol;
}

function setTokenB(newTokenBSymbol) {
    tokenBSymbol = newTokenBSymbol;
    console.log(tokenBSymbol);
}


export {
    getSlippage, setSlippage, getPair, swap,
    isSwapAble,
    getTokenList, getTokenAddress,
    getTokenA, setTokenA, getTokenB, setTokenB,
    tokenASymbol, tokenBSymbol
}
