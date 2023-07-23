import {
  SismoConnect,
  SismoConnectConfig,
  SismoConnectVerifiedResult,
  AuthType,
} from "@sismo-core/sismo-connect-server";

const config: SismoConnectConfig = {
  // you will need to get an appId from the Factory
  appId: "0x6a1142ee0b6fce3bb6851bdb1188b7a3",
};

const sismoConnect = SismoConnect({ config });

async function verifyResponse(sismoConnectResponse: SismoConnectResponse) {
  // verifies the proofs contained in the sismoConnectResponse
  // with respect to the different auths
  // i.e. user prove they own a Vault
  const result: SismoConnectVerifiedResult = await sismoConnect.verify(
    sismoConnectResponse,
    {
      // proofs in the sismoConnectResponse should be valid
      // with respect to a Vault ownership
      auth: { authType: AuthType.TWITTER },
    }
  );

  // vaultId = hash(userVaultSecret, appId).
  // the vaultId is an app-specific, anonymous identifier of a vault
  const twitterId = result.getUserId(AuthType.TWITTER);
}
