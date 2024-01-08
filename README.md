# Decentralised Voting App


Welcome to the Decentralised Voting App! This decentralized voting application is built using Next.js 13, React, Web3Storage (as IPFS database), Solidity, and Hardhat.

## Getting Started

### Prerequisites

Before you begin, make sure you have the following:

- [Node.js](https://nodejs.org/) installed
- Ethereum development environment using [Hardhat](https://hardhat.org/)
- [Web3Storage](https://web3.storage/) token. You can obtain it by signing up [here](https://web3.storage/login)

### Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/AmaanRaza28/VotingDapp
    cd your-repository
    ```

2. **Create a `.env` file in the project root with the following content:**

    ```env
    WEB3STORAGE_TOKEN=your-web3storage-token
    ```

    Replace `your-web3storage-token` with the token obtained from Web3Storage.

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Start the Hardhat Ethereum development environment:**

    ```bash
    npx hardhat node
    ```

5. **Deploy the smart contracts to the local Ethereum network:**

    ```bash
    npx hardhat run scripts/deploy.js --network localhost
    ```

6. **Run the application:**

    ```bash
    npm run dev
    ```

## Usage

Visit `http://localhost:3000` in your browser to access the Web3 Voting App. Use the decentralized voting features provided by the application.

## License

This project is licensed under the [MIT License](LICENSE).
