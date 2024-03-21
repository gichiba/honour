# Honour

We propose a peer-to-peer system of social credit. It is open, permissionless, and can be deployed on any EVM-compatible blockchain. The system assumes minimal structure. By virtue of four weird rules, we can invert how we represent money, in order to cultivate more healthy communal use. In short, entities hold this money as a liability that simultaneously grants access to high-bandwidth, authentic communication channels by which ongoing and lively relationships may be established.

You can find the app permanently on Arweave [here](https://arweave.net/x71LeozOUlN9u5ngk6XRsKlGhRxtqnl0HNfY4NvTdLY).

## De-Sign

1. All HON are the same.
2. I cannot create HON: they are minted only when I accept another’s proposal.
3. I can forgive as much HON as I currently hold.
4. HON are non-transferrable.

The system is instantiated by means of two, simple contracts. One adapts the ERC20 token standard by removing any ability to transfer, or approve other accounts to transfer on your behalf. This contract is responsible for creating and destroying HON, and tracking the balance associated with each account. The other contract holds the logic for proposing and forgiving HON, which is done via two simple mappings.

## Run the App

```bash
git clone https://github.com/kernel-community/honour.git
cd honour
yarn
yarn start
```

If you look in the package.json file at the top level of this repo, you will see that we only specify starting the frontend. It is possible to `cd` into either the `hardhat` or `subgraph` repos, but those are a bit more involved to work with. 

In particular, we recommend that you start the app, change the network in whatever wallet you like to use to Goerli and go from there. It should be easy enough to deploy your own local contracts, but this app also relies on a subgraph, and the one we are currently using is fetching data from the contract on Goerli.

## Notes

The two mappings you will find in the Honour.sol contract are not very gas-efficient means of storing information. There are two alternative ways to address this:

1. If we wanted to deploy on Ethereum mainnet, we could consider using a system of signed messages instead of mappings. That is, to make a proposal, you would sign a message with the recipient's address and amount proposed. They would then need to fetch that message, sign it themselves in a way which ensured they could use it once only, and then submit it to the contract which could do a double ECRECOVER to get all the information associated with the transaction and emit it as an event to be stored in a subgraph or similar place. 
    1. This leaves unsolved the issue of where to store such signed messages and how to fetch them efficiently. One solution is to use Arweave, and leverage their tag system and graphql endpoint to handle this, but then we need to pay for storing data there in AR and somehow ensure that the means by which we upload data cannot be easily abused, while still being essentially open and permissionless. This is not trivial to solve.

2. The other solution, and my preferred one, is simply to deploy this on Celo or a L2 like Optimism. Then, we can stick with the current simple and easy-to-understand structure given the lower fees on such networks, and still maintain rich histories onchain, which is important given the [underlying philosophy](https://docs.google.com/document/d/1mdWJhBFrGx0OBJbx5fceLZSEI1zvkVuJhQwgVhpxOas/edit?usp=sharing) of this work. In particular, Celo is a wonderful place to [experiment with currency design](https://www.youtube.com/watch?v=kKggE5OvyhE) as this work is stongly aligned with their principles and these contracts have been, in part, inspired by the work of people like Sep Kumvar (among many others).