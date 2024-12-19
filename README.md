# Governance experiment
![image](https://github.com/hyphacoop/governance-experiment/assets/631268/468b3e0b-ab1a-4a61-a631-01bd008d930d)

This repository hosts Hypha's collaborative governance experiment, a project exploring decentralized decision-making, participatory processes, and visual storytelling. The experiment combines historical insights, interactive tools, and decentralized voting mechanisms to foster better governance and collective lore creation.

The project comprises two main components:
- [**Dashboard**](./dashboard): A frontend interface for collaborative decision-making, visualizing proposals, and vote results.
- [**Timeline**](./timeline): A visual representation of key moments in Hypha's history, co-created through participatory processes.


1. **Parse Archive and Extract Insights:**
   - Gather as many insights as possible from the meeting notes.
   - Examples of Insights: Number of consecutive monthly all-hands meetings, longest meeting in character count, number of projects in project updates, notable moments, and fun facts.
2. **Pre-filter and Parse Meetings:**
   - Review meeting notes to extract and pre-filter insights.
   - Ensure insights are significant and relevant to the cooperative.
3. **Consultation with a Small Group:**
   - Present pre-filtered insights to a small group for initial review.
   - Select the top 5 insights based on their relevance and interest.
4. **Group Deliberation:**
   - Present insights to the entire cooperative or a designated decision-making body.
   - Decide on whether the insight is an interesting fact about the coop, needs redaction or encryption, or should be edited or altered aesthetically.
5. **Approval Process:**
   - Reach consensus on whether the insight should be approved, redacted, encrypted, or edited.
   - Record decisions and rationale for transparency.
6. **Minting as On-Chain SVG NFT Tokens:**
   - Mint approved insights as on-chain SVG NFT tokens.
   - Preserve important milestones and notable moments as digital artifacts.

#### Key Factors

- **Transparency:** Decide on the level of transparency for each insight.
- **Historical Record:** Mint important milestones as NFTs to create a digital archive.
- **Collaborative Decision-Making:** Test and refine generative decision processes within the cooperative.

### Tools Used for the Experiment

- Matrix chat
- Earthstar voting tool
- Solidity smart contract
- Python scripts

These tools have been chosen for their simplicity. Some of these will be used only by myself, such as the Python script for generating visuals and parsing meeting notes. Other tools will be used by all participants to discuss, argue, propose and vote on what makes the cut as official Hypha lore.

### Matrix

Matrix will be central to these experiments. I will create a new room to host this project's discussions and deliberations. We will use chat to describe the project, gather suggestions, and deliberate on what elements need to be canonized. For quick votes, we will use emoji reactions in Matrix. For votes that are more controversial, we will use the Earthstar voting tool I built. Once items and their metadata (image and description) are collectively approved, they will be minted on-chain as NFTs.

### Earthstar-based Voting Tool

For more sensitive votes, we can use the Earthstar-based voting tool I built, which allows for anonymous voting. This tool is ideal for scenarios where voter privacy is essential, ensuring that votes remain confidential while still allowing for accurate and fair decision-making.

### On-chain

For this initial experiment, I suggest 2 options. Either we mint the tokens on testnet or on Polygon. Testnet will be free and might reduce some financial pressure. Alternatively, if we choose to go with Polygon, we can consider the option of minting these tokens as collectibles for the broader public. Orb seems like an interesting option where these items could exist for the public to collect (Orb being a web3 social platform part of the Lens protocol).

In the end, these options are not mutually exclusive. We could run the governance experiment on testnet and also mint them as collectible NFTs on another chain.

In summary, these NFTs could exist both on Ethereum testnet or on a cheap EVM chain such as Polygon. I decided to keep votes and other decisions off-chain for this early phase. Instead of having the entire process live on the blockchain, I opted to only bring its final output on-chain. This means that the prior steps are designed as a mechanism for deciding what we want to bring on-chain.

I imagine this will simplify the process for everyone and will allow us to focus on the decision-making process itself instead of technical details such as tokens, chains, and wallet interactions.

### Conclusion

### Conclusion

Through this process, we aim to learn how to better deliberate, make proposals, and make decisions. The result will be an enhanced decision-making process and also, some content and images about the cooperative's history — essentially, creating the co-op lore. This low-stakes exercise will help us test out generative decision processes and provide ideas on how to better work together. This process will also lead to what we reveal and to what extent. Some of these insights might be important but too sensitive to be shared in public. In such cases, we could decide to encrypt or hash the data to conceal or obfuscate certain details. This experiment also offers an opportunity to preserve and celebrate our cooperative's history through the minting of digital artifacts.

By simplifying the process and not using DAO tooling, we can focus more on the decision-making aspect itself, ensuring the process is accessible and straightforward for all participants. This technical detail could always be revised and integrated if there is an interest to bring more of the decision process on-chain.
