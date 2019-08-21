const Elections = artifacts.require("Elections");
module.exports = deployer => {
    deployer.deploy(Elections);
};