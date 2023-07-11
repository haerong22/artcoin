import { ethers } from "ethers";
import { Factory__factory } from "../constants/typechain-types";
import { FACTORY_ADDRESSES } from "../constants/addresses";

export function getProvider() {
  return new ethers.providers.Web3Provider(window.ethereum);
}

export function getSigner() {
  return getProvider().getSigner();
}

export function getFactoryContract(networkId: number) {
  return Factory__factory.connect(FACTORY_ADDRESSES[networkId], getSigner());
}
