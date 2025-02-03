# Overview
Part of the timeline exploratoin, I have been considering the option of minting NFTs that allow the token's image to be updated as the timeline evolves.
This basic smart contract allows the deployer to mint new tokens and update their image via the updateSVG() function.
The image is sent as base64 encoded SVG.

# Contract summary
This smart contract, named OnChainSVG721, is an implementation of an ERC721 Non-Fungible Token (NFT) that stores SVG images directly on the blockchain. The contract allows the owner to mint new tokens and update the SVG images associated with these tokens. The SVG images are encoded in base64 format and stored on-chain.

# Key Components
## ERC721 and Ownable Inheritance:

The contract inherits from OpenZeppelin's ERC721 standard implementation and Ownable, which restricts certain functions to the contract owner.
Storage:

A mapping _tokenSVGs is used to store base64-encoded SVG strings for each token ID.

## Constructor:

Initializes the ERC721 token with the name "OnChainSVG721" and the symbol "SVG".
Sets the owner of the contract to a specified address (0x5B38Da6a701c568545dCfcB03FcB875f56beddC4).

## Minting Function:

mint(address to, uint256 tokenId, string memory base64SVG): Mints a new token with the given tokenId and assigns it to the specified address to. The base64-encoded SVG string is stored in the _tokenSVGs mapping.

## Updating the SVG:

updateSVG(uint256 tokenId, string memory base64SVG): Allows the owner to update the SVG image for an existing token by providing a new base64-encoded SVG string.

## Token URI Override:

tokenURI(uint256 tokenId): Overrides the default tokenURI function to return a JSON metadata object. This object includes the token's name, description, and the SVG image encoded as a data URL. The metadata is also base64-encoded.

## Base64 Encoding Library:

The Base64 library provides a function encode(bytes memory data) to encode byte data into a base64 string. This is used to encode the JSON metadata and SVG image data.

## Conclusion
This contract enables the creation and management of NFTs that store SVG images entirely on-chain. The images and metadata are accessible through the tokenURI function, which provides a base64-encoded JSON object containing the image data. Only the contract owner can mint new tokens and update their images.