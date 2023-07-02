import { getVerbose, getFactory } from "./wallet";
import ADDRESS from './json/address.json';
import { ref } from 'vue';


// Global Variables
let slippage = 0.5;
let tokenASymbol = ref("select");
let tokenBSymbol = ref("select");


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
    if (tokenASymbol.value === "select" || tokenBSymbol.value === "select") {
        return false;
    }
    return tokenASymbol != tokenBSymbol;
}


function getTokenList() {
    // TODO: get token list
    return ['FTM', 'USDC'];
}

function getTokenAddress(symbol) {
    if (symbol.value === 'FTM') { return ADDRESS.wftm; }
    else if (symbol.value === 'USDC') { return ADDRESS.usdc; }
    else { return null; }
}

function getTokenA() {
    return tokenASymbol;
}

function setTokenA(newTokenASymbol) {
    tokenASymbol.value = newTokenASymbol;
    // console.log("tokenASymbol", tokenASymbol.value);
}

function getTokenB() {
    return tokenBSymbol;
}

function setTokenB(newTokenBSymbol) {
    tokenBSymbol.value = newTokenBSymbol;
    // console.log("tokenBSymbol", tokenBSymbol.value);
}


export {
    getSlippage, setSlippage, getPair, swap,
    isSwapAble,
    getTokenList, getTokenAddress,
    getTokenA, setTokenA, getTokenB, setTokenB
}
