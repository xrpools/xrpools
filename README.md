# XRPools 

[ Video - XRPools a project explanation](https://youtu.be/j6P_SvBxrfE)

## Pitch Description
Bridge crypto holdings with traditional finance to earn interest without asset transfer. A transparent, secure platform for crypto investors and institutions to grow together.
- Unlock Crypto Earnings, Stabilize Markets
- Earn interest on crypto securely, without losing it.

### Problem Statement
The crypto market lacks stable, secure avenues for holders to earn interest on their assets without risking ownership, while traditional financial institutions miss out on tapping into the growing cryptocurrency assets due to regulatory and compliance risks.

### Solution Statement
Our platform leverages the XRPL escrow function to allow crypto holders to safely earn interest on their assets, held in term-based pools, without transferring ownership. Institutions can access these assets for balance sheet enhancement, offering competitive interest rates to crypto investors.

## Potential Users

- **Financial institutions: Banks, fintechs, asset managers looking to diversify and stabilize their asset bases with cryptocurrency, without direct exposure or regulatory complexity.
- **Liquidity providers: Crypto investors seeking low-risk interest on their holdings without sacrificing asset control.

## Features

- Wallet whitelisting 
- KYC compliance 
- interest-earning crypto pools
- transparent transactions, and secure asset holding

### POC 

The POC contains basic wallet integration, mockup of asset pools, simulated interest earnings, and a simple inteface for both liquidity providers and institutionals.

A bank creates a pool by chhosing a currency (XRP, ETH, WBTC, USDT...) and an interest rate (5%), and requirements (Non US Person, KYC requirements, High Net Worth Individual...).

Liquidity providers can lock assets into one of the available pools and earn interest at settlement time .


The execution plan is as such :
- XRPL: For escrow-based holding of assets and the secure, transparent handling of cryptocurrency assets.
- Frontend: Basic web technologies for the interface (React, Next, Tailwind, Crossmark wallet, xrpl.js library).
- Backend: Node.js for server-side KYC hashing into a merkle tree

#### Implementation

A pool is represented by a XRPL `Account` owned by the institution. All extra parameters (name, currency, interest rate, locking duration) should be made available somehow as metadata of the account.

An asset locking is made through an `Escrow` object, with the pool account as its `Destination`. The `CancelAfter` parameter shows the time until the assets will be locked. There is no `FinishAfter` and the `Condition` will never be revealed.

The sum of all escrows amount pointing to the account is the reserve. Its decreasing over time can be foreseen as the escrows becomes cancealable.


### Future paths

Future States: Expansion to include a broader range of cryptocurrencies, deeper integration with traditional financial products, and advanced smart contract functionalities for automated pool management and payouts.

#### Enforce the interest payments

- Use a reverse escrow locking the interest
- Use a [sidechain EVM](https://opensource.ripple.com/docs/evm-sidechain/intro-to-evm-sidechain/) smart contract 
- Use the [Xahau](https://xahau.network/) hooks


#### Provide KYCs infrastructure 

- Through [Decentralised ID](https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/did/) and a merkle tree.


## Conclusion
Our platform uniquely positions itself at the intersection of cryptocurrency and traditional finance, offering a novel solution to the dual challenges of earning potential for crypto holders and asset diversification for institutions. By leveraging the secure, transparent capabilities of XRPL, we propose a future where crypto assets are not just stored but actively contribute to market stability and individual growth.

<br>
<br>


![Guardian_KYC](https://github.com/challet/CSEP/assets/29208274/97cb1857-24a9-49ef-b4ec-3e0221be7da7)
