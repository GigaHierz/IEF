State.init({
  selected: "NEAR",
});

const handleSelect2 = (data) => {
  State.update({ selected: data.target.value });
};

// FETCH LIDO ABI
// estos valores deben reemplazarse por los reales

const lidoContract = "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F";

const mainnetLidoContract = "0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f";
const gorliLidoContract = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506";
const tokenDecimals = 18;
const contract = "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2";
const initSearchText = props.searchText;
const data = props.data;
const debug = props.debug;
const minLength = props.minLength;
const placeholder = props.placeholder ?? "Search";
const searchTermKey = props.searchTermKey; // search term key on data item
//const network = "gorli"; // "gorli" // "rinkeby" // "mainnet"
initState({
  data,
  searchText: initSearchText,
  result: data,
  placeholder,
});

const handleSearch = (_search) => {
  const _result =
    !_search || _search.length < minLength
      ? state.data
      : state.data.filter(
          (item) =>
            item[searchTermKey].toLowerCase().indexOf(_search.toLowerCase()) !==
            -1
        );

  State.update({
    result: _result,
    searchText: _search,
  });

  if (props.onChange) {
    props.onChange({ searchText, result: _result });
  }
};
const network = "mainnet";
switch (network) {
  case "gorli":
    lidoContract = gorliLidoContract;
    break;
  case "mainnet":
    lidoContract = mainnetLidoContract;
    break;
  case "ropsten":
    lidoContract = mainnetLidoContract;
    break;
  default:
    lidoContract = mainnetLidoContract;
    break;
}

const handleSelect = (data) => {
  console.log(data.target.value);
  let info = data.target.value.split("-");
  State.update({ tokenTo: info[1] });
  if (info[0] == "near") {
    State.update({ tokenSelected: 0 });
  } else if (info[0] == "aurora") {
    State.update({ tokenSelected: 1 });
  }
  console.log(state.tokenSelected);
  contract = data.target.value;
};

const lidoAbi = fetch(
  "https://raw.githubusercontent.com/cloudmex/sushiswap-bos/main/abi-sushi.json"
);

console.log(lidoAbi);

if (!lidoAbi.ok) {
  return "Loading";
}

// FETCH CSS

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;

const css = `
.LidoContainer{
    box-sizing: border-box;
    margin: 0px auto;
    min-width: 320px;
    width: 100%;
    padding: 0px 32px;
    max-width: 560px;
    position: relative;
    margin-top: 8px;
    margin-bottom: 8px;
}
.Header{
    font-weight: 800;
    font-size: 26px;
    margin-bottom: 0.2em;
    line-height: 1.2em;
    text-align: center;
}

.SubHeader{
    font-weight: 500;
    color: #FF79D8;
    margin-bottom: 16px;
    font-size: 12px;
    line-height: 1.5em;
    text-align: center;
};


.selectCSS{
    font-weight: 400;
    font-size: 14px;
    display: flex;
    border: none;
    -webkit-box-flex: 1;
    flex-grow: 1;
    position: relative;
    padding: 17px 0px;
    color: #273852;
}

.form-control {
    flex: inherit;
    width: fit-content;
    width: 44%;
}
`;

const Main = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 352px minmax(0, 1fr);
  align-items: start;

  @media (max-width: 1200px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;
const LogoImage = styled.img`
  width: 252px; 
  margin-right: 12px;
  margin-top: 1px; 
`;
const SidebarWrapper = styled.div`
  position: relative;
  z-index: 5;
  margin-top: -55px;

  @media (max-width: 900px) {
    margin-top: -40px;
  }
`;

const Content = styled.div`
  .post {
    padding-left: 0;
    padding-right: 0;
  }
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: ${(p) => p.size || "25px"};
  line-height: 1.2em;
  color: #11181c;
  margin: ${(p) => (p.margin ? "0 0 24px" : "0")};
  overflow-wrap: anywhere;
`;

const Tabs = styled.div`
  display: flex;
  height: 48px;
  border-bottom: 1px solid #eceef0;
  margin-bottom: 72px;
  overflow: auto;
  scroll-behavior: smooth;

  @media (max-width: 1200px) {
    background: #f8f9fa;
    border-top: 1px solid #eceef0;
    margin: 0 -12px 48px;

    > * {
      flex: 1;
    }
  }
`;

const TabsButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: 600;
  font-size: 22px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none !important;

  &:hover {
    color: #11181c;
  }

  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #59e692;
  }
`;

if (!cssFont || !css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    ${cssFont}
    ${css}
`,
  });
}
const Theme = state.theme;

// OUTPUT UI

const getSender = () => {
  return !state.sender
    ? ""
    : state.sender.substring(0, 6) +
        "..." +
        state.sender.substring(state.sender.length - 4, state.sender.length);
};

return (
  <Theme>
    <div
      className="container-fluid py-4"
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        perspective: "1px",
        overflowX: "hidden",
        overflowY: "auto",
        background:
          "linear-gradient(90deg, rgba(205, 255, 216, 1.000000) 0%, rgba(148, 185, 255, 1.000000) 100%)",
      }}
    >
      <div class="img-fluid  text-center">
        <div class="col-lg-1">
          <img
            class="float-center"
            src="https://ipfs.near.social/ipfs/bafkreiajtzhlslb2ctqgzu6fxydqkglwswmtgp76hj5trvi4jr2feew5fe"
            width="100"
          />
        </div>
      </div>
      <div className="d-flex justify-content-start"></div>
      <Tabs>
        <TabsButton
          href={`${url}&tab=home`}
          selected={state.selectedTab === "home"}
        >
          Home
        </TabsButton>

        <TabsButton
          href={`${url}&tab=Makeanattestation`}
          selected={state.selectedTab === "Makeanattestation"}
        >
          Create an attestation
        </TabsButton>

        <TabsButton
          href={`${url}&tab=Seetheattestation`}
          selected={state.selectedTab === "Seetheattestation"}
        >
          Attestation
        </TabsButton>

        <div className="input-group">
          <input
            type="text"
            className={`form-control ${state.searchText ? "border-end-0" : ""}`}
            value={state.searchText}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={"🔍 " + state.placeholder}
          />

          {state.searchText && (
            <button
              className="btn btn-outline-secondary border border-start-0"
              type="button"
              onClick={() => handleSearch()}
            >
              <i className="bi bi-x"></i>
            </button>
          )}
        </div>
        {debug && <pre>{JSON.stringify(state.result, undefinedd, 2)}</pre>}
        <TabsButton>
          {!!state.sender ? (
            <button
              className=""
              onClick={() => submitEthers(state.strEther, state.sender)}
            >
              <span></span>
            </button>
          ) : (
            <Web3Connect className="" connectLabel="Connect Wallet" />
          )}
        </TabsButton>
      </Tabs>
      <div className="centered-container">
        <img
          class="float-center"
          src="https://ipfs.near.social/ipfs/bafkreigdpsfenvqnvoylsawhnhxqbpwp2cbz6c54dkwikzzzsolkas5yde"
          width="400"
        />

        <p>Congratulations! You created your attestation!</p>
      </div>
      <p>................</p>
    </div>

    {/* fin */}
  </Theme>
);
