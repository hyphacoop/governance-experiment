// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OnChainSVG721 is ERC721, Ownable {
    // Mapping from token ID to base64-encoded SVG
    mapping(uint256 => string) private _tokenSVGs;

    constructor() ERC721("OnChainSVG721", "SVG") Ownable(address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4)) {}

    // Function to mint a new token
    function mint(address to, uint256 tokenId, string memory base64SVG) public onlyOwner {
        _safeMint(to, tokenId);
        _tokenSVGs[tokenId] = base64SVG;
    }

    // Function to update the SVG of a token
    function updateSVG(uint256 tokenId, string memory base64SVG) public onlyOwner {
        require(_ownerOf(tokenId) != address(0), "ERC721: SVG update for nonexistent token");
        _tokenSVGs[tokenId] = base64SVG;
    }

    // Override tokenURI to return the SVG as base64-encoded JSON
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "ERC721Metadata: URI query for nonexistent token");

        string memory base64SVG = _tokenSVGs[tokenId];
        string memory json = Base64.encode(bytes(string(abi.encodePacked('{"name": "OnChainSVG721 #', Strings.toString(tokenId), '", "description": "An SVG stored entirely on-chain", "image": "data:image/svg+xml;base64,', base64SVG, '"}'))));
        return string(abi.encodePacked('data:application/json;base64,', json));
    }
}

/// @title Base64
/// @dev Provides a function for encoding bytes in base64
library Base64 {
    bytes internal constant TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    function encode(bytes memory data) internal pure returns (string memory) {
        if (data.length == 0) return "";

        // load the table into memory
        bytes memory table = TABLE;

        // multiply by 4/3 rounded up
        uint256 encodedLen = 4 * ((data.length + 2) / 3);

        // add some extra buffer at the end required for the writing
        bytes memory result = new bytes(encodedLen + 32);

        assembly {
            let tablePtr := add(table, 1)
            let resultPtr := add(result, 32)

            for {
                let dataPtr := data
                let endPtr := add(data, mload(data))
            } lt(dataPtr, endPtr) {

            } {
                dataPtr := add(dataPtr, 3)
                let input := mload(dataPtr)

                mstore(resultPtr, shl(248, mload(add(tablePtr, and(shr(18, input), 0x3F)))))
                resultPtr := add(resultPtr, 1)
                mstore(resultPtr, shl(248, mload(add(tablePtr, and(shr(12, input), 0x3F)))))
                resultPtr := add(resultPtr, 1)
                mstore(resultPtr, shl(248, mload(add(tablePtr, and(shr(6, input), 0x3F)))))
                resultPtr := add(resultPtr, 1)
                mstore(resultPtr, shl(248, mload(add(tablePtr, and(input, 0x3F)))))
                resultPtr := add(resultPtr, 1)
            }

            switch mod(mload(data), 3)
            case 1 {
                mstore(sub(resultPtr, 2), shl(240, 0x3d3d))
            }
            case 2 {
                mstore(sub(resultPtr, 1), shl(248, 0x3d))
            }

            mstore(result, encodedLen)
        }

        return string(result);
    }
}
