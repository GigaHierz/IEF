import { useProvider, useSigner } from "wagmi";

export const EASContractAddress = "0x1a5650d0ecbca349dd84bafa85790e3e6955eb84"; // GoerliOptimism v0.26

export default function Home() {
  const provider = useProvider();
  const { data: signer, isError, isLoading } = useSigner();

  const getAttestation = async () => {};

  return (
    <div className="flex flex-col flex-1 items-center justify-center ">
      <h1 className="text-5xl leading-10 mb-14 font-sans font-bold">
        Standardize The Use of Attestations
      </h1>
      <h2 className="text-2xl leading-10 mb-8 font-sans">
        Generate data, measure your impact, and get recognized for your work.
      </h2>
      <div className="relative w-60 lg:max-w-sm mt-4">
        <select className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
          <option>Legislator Stance</option>
          <option>Lobbying Beneficiary</option>
        </select>
      </div>
      <button className="inline-flex w-60 justify-center rounded-full border px-5 my-5 py-2 text-md font-medium border-wood bg-gypsum text-black hover:bg-snow">
        <a
          href="attestationOnchain"
          className="inline-flex no-underline items-center border-b-2  px-1 pt-1 text-sm font-medium text-gray-900"
        >
          Create Attestation
        </a>
      </button>
    </div>
  );
}
