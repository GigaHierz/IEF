import {
  EAS,
  Offchain,
  SchemaEncoder,
  SchemaRegistry,
} from "@ethereum-attestation-service/eas-sdk";

import { useEffect, useState } from "react";
import { useProvider, useSigner, useAccount } from "wagmi";
import {
  AuthType,
  SismoConnect,
  SismoConnectButton,
  SismoConnectConfig,
  SismoConnectResponse,
} from "@sismo-core/sismo-connect-react";

export const EASContractAddress = "0x1a5650d0ecbca349dd84bafa85790e3e6955eb84"; // GoerliOptimism v0.26

export default function Home() {
  const config: SismoConnectConfig = {
    // you will need to get an appId from the Factory
    appId: "0x6a1142ee0b6fce3bb6851bdb1188b7a3",
    vault: {
      // For development purposes insert the identifier that you want to impersonate here
      // Never use this in production
      impersonate: [
        "0x99B551F0Bb2e634D726d62Bb2FF159a34964976C",
        "twitter:GigaHierz",
        "github:GigaHierz",
      ],
    },
  };

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
    <div className="flex flex-col justify-center items-center">
      <div className="w-auto">
        <h2 className="text-2xl leading-10 mb-8 font-sans">
          Lobbying Beneficiary
        </h2>
        <h3 className="text-base leading-10 mb-8 font-sans">
          Attest to having benefited from the lobbying work conducted by your
          trusted advisor.
        </h3>
        <p>
          This attestation is generated off-chain to preserve your privacy,
          meaning your name and the data included in this attestation are not
          published on-chain and are only visible to you and those you choose to
          share it with.
        </p>
      </div>
      <div className="w-80">
        <div className="m-8">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <div className="mt-2 mr-4 flex flex-row">
                <label className="block text-m mr-4 mt-2 leading-6 font-medium text-gray-900">
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
                <label className="block text-m mr-4 mt-2 leading-6 font-medium text-gray-900">
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
              <div className="mt-2 mr-4 flex flex-row ">
                <label className="block text-m mr-4 mt-2 leading-6 font-medium text-gray-900">
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
        </div>
        <div className="m-8 flex flex-col justify-center items-center">
          <div className="">
            <SismoConnectButton
              // the client config created
              config={config}
              // request a proof of account ownership
              // (here Vault ownership)
              auth={{ authType: AuthType.TWITTER }}
              onResponse={async (response: SismoConnectResponse) => {
                //Send the response to your server to verify it
                //thanks to the @sismo-core/sismo-connect-server package
              }}
              onResponseBytes={async (bytes: string) => {
                //Send the response to your contract to verify it
                //thanks to the @sismo-core/sismo-connect-solidity package
              }}
            />
          </div>
          <button
            className="inline-flex w-60 justify-center rounded-full border px-5 my-5 py-2 text-md font-medium border-wood bg-gypsum text-black hover:bg-snow"
            onClick={() => createAttestation()}
          >
            {"Create Attestation"}
          </button>
        </div>
      </div>
    </div>
  );
}
