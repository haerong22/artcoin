import { ethers } from "ethers";

export function getProvider() {
  return new ethers.providers.Web3Provider(window.ethereum);
}
