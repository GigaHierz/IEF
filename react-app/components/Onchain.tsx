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
  const [name, setName] = useState("");
  const [regulation, setRegulation] = useState("");
  const [date, setDate] = useState("");
  const [inFavor, setInFavor] = useState("");
  const account = useAccount();

  eas.connect(signer);
  // Initialize SchemaEncoder with the schema string
  // const schemaEncoder = new SchemaEncoder(
  //   "uint64 date, string Name_of_legistlator, string Regulation_ID, bool Position"
  // );
  const schemaEncoder = new SchemaEncoder(
    "string nameLegislator, string regulationID, bool inFavor"
  );
  const encodedData = schemaEncoder.encodeData([
    // { name: "date", value: date, type: "uint265" },
    { name: "nameLegislator", value: name, type: "string" },
    { name: "regulationID", value: regulation, type: "string" },
    { name: "inFavor", value: inFavor, type: "bool" },
  ]);

  const schemaUID =
    "0x7a53cce1da56b6d60c492fbcc5bca60d8d7c76bacf247a223bad50b1859c261d";

  const createAttestation = async () => {
    console.log(encodedData);

    const tx = await eas.attest({
      schema: schemaUID,
      data: {
        recipient: account.address,
        expirationTime: 0,
        revocable: false,
        data: encodedData,
      },
    });
    const newAttestationUID = await tx.wait();
    console.log("New attestation UID:", newAttestationUID);
  };

  return (
    <div>
      <form className="space-y-6" action="#" method="POST">
        <div>
          <div className="mt-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="mt-2 mr-4 flex flex-row">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Regulation
            </label>
            <input
              id="regulation"
              name="regulation"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setRegulation(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="mt-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
      </form>
      <div>
        <button
          className="inline-flex w-full justify-center rounded-full border px-5 my-5 py-2 text-md font-medium border-wood bg-prosperity text-black hover:bg-snow"
          onClick={() => createAttestation()}
        >
          {"Create Attestation"}
        </button>
      </div>
    </div>
  );
}
