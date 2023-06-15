export type ChainId = "eth" | "avax" | "sol" | "juno" | "kava" | "axl" | string;
export type keplrChainId = "axelar-dojo-1" | "juno-1" | "kava_2222-10";

export type Chain = {
  id: ChainId;
  name: string;
  icon: string;
};

export interface KeplrChainId extends Chain {
  keplrChainId: keplrChainId;
}
