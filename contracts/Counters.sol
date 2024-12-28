// SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

library Counters {
    type Counter is uint256;

    function current(Counter counter) internal pure returns (uint256) {
        return Counter.unwrap(counter);
    }

    function increment(Counter counter) internal pure returns (Counter) {
        return Counter.wrap(Counter.unwrap(counter) + 1);
    }

    function decrement(Counter counter) internal pure returns (Counter) {
        uint256 value = Counter.unwrap(counter);
        // solhint-disable-next-line gas-custom-errors
        require(value > 0, "Counter: decrement overflow");

        return Counter.wrap(value - 1);
    }
}
