import {
  EAS,
  Offchain,
  SchemaEncoder,
  SchemaRegistry,
} from "@ethereum-attestation-service/eas-sdk";
import { log } from "console";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useProvider, useSigner, useAccount } from "wagmi";

export const EASContractAddress = "0x1a5650d0ecbca349dd84bafa85790e3e6955eb84"; // GoerliOptimism v0.26

export default function Home() {
  const provider = useProvider();
  const { data: signer, isError, isLoading } = useSigner();
  const eas = new EAS(EASContractAddress);

  const account = useAccount();

  eas.connect(provider);
  const uid =
    "0x575ebecf88d2844da065e2596c08b0705abaaf4df5c593e030de1fa09c243ebd";

  const getAttestation = async () => {
    const attestation = await eas.getAttestation(uid);

    console.log("New attestation UID:", attestation);
  };

  useEffect(() => {
    getAttestation();
  }, []);

  return (
    <div>
      <div></div>
    </div>
  );
}
