// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.6.0;

import "../contracts/Counters.sol";

contract $Counters {
    bytes32 public constant __hh_exposed_bytecode_marker = "hardhat-exposed";

    constructor() payable {
    }

    function $current(Counters.Counter counter) external pure returns (uint256 ret0) {
        (ret0) = Counters.current(counter);
    }

    function $increment(Counters.Counter counter) external pure returns (Counters.Counter ret0) {
        (ret0) = Counters.increment(counter);
    }

    function $decrement(Counters.Counter counter) external pure returns (Counters.Counter ret0) {
        (ret0) = Counters.decrement(counter);
    }

    function $toUint256(Counters.Counter counter) external pure returns (uint256 ret0) {
        (ret0) = Counters.toUint256(counter);
    }

    function $toCounter(uint256 counter) external pure returns (Counters.Counter ret0) {
        (ret0) = Counters.toCounter(counter);
    }

    receive() external payable {}
}
