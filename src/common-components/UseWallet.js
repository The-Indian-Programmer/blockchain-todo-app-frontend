import { useState, useEffect } from "react";
import { ethers } from "ethers";

export function useWallet() {
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    async function connectWallet() {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);

        try {
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setAddress(address);

          const network = await provider.getNetwork();
          setChainId(network.chainId);

          setIsConnected(true);
        } catch (err) {
          setIsConnected(false);
        }
      } else {
        setIsConnected(false);
      }
    }

    connectWallet();
  }, []);

  return { isConnected, provider, chainId, address };
}
