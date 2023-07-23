import { useEffect, useState } from "react";
import { Client, cacheExchange, fetchExchange, gql, useQuery } from "urql";
import { useAccount } from "wagmi";

export default function List() {
  const { address } = useAccount();
  const client = new Client({
    url: "https://optimism-goerli.easscan.org/graphql",
    exchanges: [cacheExchange, fetchExchange],
  });

  const [attestations, setAttestations] = useState<any>([]);

  const getAttestations = async () => {
    const query = gql`
      query() {
        attestations(take: 25, orderBy: {time: desc}) {
          id
          attester
          recipient
          refUID
          revocable
          revocationTime
          expirationTime
          data
        }
      }
    `;

    const result = await client.query(query, {}).toPromise();

    console.log(result.data);

    if (result.error) throw result.error;
    if (result.data?.attestations) setAttestations(result.data.attestations);
  };

  useEffect(() => {
    getAttestations();
  }, []);

  return (
    <div>
      <div className="inline-flex flex-col items-center justify-center">
        <h2 className="text-2xl leading-10 mb-8 font-sans">
          Verify what matters
        </h2>
        <div className="relative w-60 lg:max-w-sm mt-4">
          <select className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
            <option>All</option>
            <option>Legislator Stance</option>
            <option>Lobbying Beneficiary</option>
          </select>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              {attestations?.length && (
                <div className="overflow-hidden ring-1 ring-black">
                  <table className="min-w-full divide-y divide-black">
                    <thead className="bg-citrus">
                      <tr>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Recipient
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Item
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black bg-white">
                      {attestations.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {item.recipient}
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              <a
                                target="\_blank"
                                rel="noopener noreferrer"
                                href={`https://optimism-goerli.easscan.org/attestation/view/${item.id}`}
                                className="text-forest hover:text-forest"
                              >
                                Details
                                {/* ...
                              {item.id.substring(item.id.length - 15)} */}
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
