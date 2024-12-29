// SPDX-License-Identifier: MIT
// solhint-disable-next-line compiler-version
pragma solidity ^0.8.26;

/**
 * @dev Tooling for timepoints, timers and delays
 */
library Timers {
    struct BlockNumber {
        uint256 _at;
    }

    function get(BlockNumber memory timer) internal pure returns (uint256) {
        return timer._at;
    }

    function set(BlockNumber storage timer, uint256 timestamp) internal {
        timer._at = timestamp;
    }

    function reset(BlockNumber storage timer) internal {
        timer._at = 0;
    }

    function isUnset(BlockNumber memory timer) internal pure returns (bool) {
        return timer._at == 0;
    }

    function isStarted(BlockNumber memory timer) internal pure returns (bool) {
        return timer._at > 0;
    }

    function isPending(BlockNumber memory timer) internal view returns (bool) {
        return timer._at > block.number;
    }

    function isExpired(BlockNumber memory timer) internal view returns (bool) {
        return isStarted(timer) && timer._at <= block.number;
    }
}
