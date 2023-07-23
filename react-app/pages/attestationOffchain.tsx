import {
  EAS,
  Offchain,
  SchemaEncoder,
} from "@ethereum-attestation-service/eas-sdk";

import { useEffect, useState } from "react";
import { useProvider, useSigner, useAccount } from "wagmi";

export const EASContractAddress = "0x1a5650d0ecbca349dd84bafa85790e3e6955eb84"; // GoerliOptimism v0.26

export default function Home() {
  const provider = useProvider();
  const { data: signer, isError, isLoading } = useSigner();
  const [name, setName] = useState("");
  const eas = new EAS(EASContractAddress);

  const [recipient, setRecipient] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [receivedBenefits, setReceivedBenefits] = useState("");
  const [regulationId, setRegulationId] = useState("");
  const account = useAccount();

  // Initialize SchemaEncoder with the schema string

  const schemaEncoder = new SchemaEncoder(
    "string organizationName, bool receivedBenefits, string regulationId"
  );
  const encodedData = schemaEncoder.encodeData([
    { name: "organizationName", value: organizationName, type: "string" },
    { name: "receivedBenefits", value: receivedBenefits, type: "bool" },
    { name: "regulationId", value: regulationId, type: "string" },
  ]);

  const schemaUID =
    "0x414e0aa4156ff21f53b2eed7ae7541cdb2524d20687a3481fb49c68654fd3423";

  const createAttestation = async () => {
    console.log(organizationName, receivedBenefits, regulationId);
    const offchain = await eas.getOffchain();

    const offchainAttestation = await offchain.signOffchainAttestation(
      {
        recipient: account.address,
        // Unix timestamp of when attestation expires. (0 for no expiration)
        expirationTime: 0,
        // Unix timestamp of current time
        time: 1671219636,
        revocable: false,
        version: 1,
        nonce: 0,
        schema: schemaUID,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000",
        data: encodedData,
      },
      signer
    );

    console.log("New attestation UID:", offchainAttestation.uid);
  };

  return (
    <div>
      <form className="space-y-6" action="#" method="POST">
        <div>
          <div className="mt-2 mr-4 flex flex-row">
            <label className="block text-m mr-4 mt-2 leading-6 font-medium text-gray-900">
              Organization Name
            </label>
            <input
              id="organizationName"
              name="organizationName"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setOrganizationName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="mt-2 mr-4 flex flex-row ">
            <label className="block text-m mr-4 mt-2 leading-6 font-medium text-gray-900">
              Received Benefits
            </label>
            <input
              id="receivedBenefits"
              name="receivedBenefits"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setReceivedBenefits(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="mt-2 mr-4 flex flex-row ">
            <label className="block text-m mr-4 mt-2 leading-6 font-medium text-gray-900">
              Regulation ID
            </label>
            <input
              id="regulationId"
              name="regulationId"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setRegulationId(e.target.value)}
            />
          </div>
        </div>
      </form>
      <div>
        <button
          className="inline-flex w-60 justify-center rounded-full border px-5 my-5 py-2 text-md font-medium border-wood bg-gypsum text-black hover:bg-snow"
          onClick={() => createAttestation()}
        >
          {"Create Attestation"}
        </button>
      </div>
    </div>
  );
}
