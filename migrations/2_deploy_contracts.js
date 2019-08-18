var Election = artifacts.require('Election');

module.exports = (deployer, network, accounts) => {
    deployer.deploy(Election, accounts[0], accounts[1], accounts[2], 0, 50, 0, 50);
}