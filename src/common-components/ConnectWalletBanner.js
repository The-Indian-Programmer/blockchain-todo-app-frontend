import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
const ConnectWalletBanner = () => {

    const [account, setAccount] = useState("");
    const [chainId, setChainId] = useState("");


    useEffect(() => {
        const checkConnection = async () => {
            // Check if the user has already connected their wallet
            const isAlreadyConnected = localStorage.getItem("isConnected") === "true";

            if (isAlreadyConnected) {
                try {
                    // Connect to the provider using the stored provider URL
                    const provider = new ethers.providers.JsonRpcProvider(`HTTP://127.0.0.1:7545`);

                    // Get the signer from the provider
                    const signer = provider.getSigner();

                    // Get the user's address
                    const address = await signer.getAddress();

                    // Get the chain ID
                    const network = await provider.getNetwork();
                    const chainId = network.chainId;

                    // Update the state
                    setAccount(address);
                    setChainId(chainId);
                } catch (error) {
                    console.log(error);
                }
            }
        };

        checkConnection();
    }, []);


    const connectWallet = async () => {
        try {
            // Connect to the provider using window.ethereum
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            // Prompt the user to connect their wallet
            await window.ethereum.request({ method: "eth_requestAccounts" });

            // Get the signer from the provider
            const signer = provider.getSigner();

            // Get the user's address
            const address = await signer.getAddress();

            // Get the chain ID
            const network = await provider.getNetwork();
            const chainId = network.chainId;

            // Update the state
            setAccount(address);
            setChainId(chainId);

            // Store the wallet connection status in local storage
            localStorage.setItem("isConnected", true);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 ">
            <div className="w-full container h-10">
                <div className="bg-blue-500 rounded-lg shadow-lg py-16 text-center">
                    <p className="text-white font-bold text-lg mb-4">Please connect your wallet</p>
                    <button onClick={connectWallet} className="bg-blue-500 text-white px-4 py-2 rounded-md border-2">
                        <svg className="inline-block w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM8.5 14.5l-.3.3c-.4.4-.4 1 0 1.4l4.3 4.3c.4.4 1 .4 1.4 0l4.3-4.3c.4-.4.4-1 0-1.4l-.3-.3c-.4-.4-1-.4-1.4 0L15 16.6V10c0-.6-.4-1-1-1s-1 .4-1 1v6.6l-1.1-1.1c-.4-.4-1-.4-1.4 0z" />
                        </svg>
                        <span>Connect Metamask</span>
                    </button>

                </div>
            </div>
        </div>

    )
}

export default ConnectWalletBanner
