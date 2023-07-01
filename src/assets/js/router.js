// Global Variables
let slippage = 0.5;


function getSlippage() {
    return slippage;
}

function setSlippage(newSlippage) {
    slippage = newSlippage;
}


export {
    getSlippage, setSlippage
}
