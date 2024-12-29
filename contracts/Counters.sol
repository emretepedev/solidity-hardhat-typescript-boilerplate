// SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

library Counters {
    type Counter is uint256;

    function current(Counter counter) internal pure returns (uint256) {
        return toUint256(counter);
    }

    function increment(Counter counter) internal pure returns (Counter) {
        return toCounter(toUint256(counter) + 1);
    }

    function decrement(Counter counter) internal pure returns (Counter) {
        uint256 value = toUint256(counter);

        // solhint-disable-next-line gas-custom-errors
        require(value > 0, "Counter: decrement overflow");

        return toCounter(value - 1);
    }

    function toUint256(Counter counter) internal pure returns (uint256) {
        return Counter.unwrap(counter);
    }

    function toCounter(uint256 counter) internal pure returns (Counter) {
        return Counter.wrap(counter);
    }
}
