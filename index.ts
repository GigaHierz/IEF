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

.LidoForm{
    background: linear-gradient(65.21deg, rgb(255, 94, 88) 19.1%, rgb(255, 212, 84) 100%);
    margin-bottom: -20px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    padding-bottom: 52px;
    font-weight: 400;
    font-size: 12px;
    line-height: 1.6em;
    border-radius: 20px;
    margin: 0px;
    padding: 32px;
    box-shadow: none;
    color: #fff;    
}

.LidoFormTopContainer{
    margin-top: 0px;
    display: flex;
    margin: 20px 0px;
}

.LidoFormTopContainerLeft{
    margin-right: 18px;
    flex-basis: 50%;
    -webkit-box-flex: 1;
    flex-grow: 1;
    font-size: 12px;
    line-height: 1.6em;
}

.LidoFormTopContainerLeftContent1{
    display: flex;
    flex-direction: row;
    -webkit-box-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    align-items: center;
}

.LidoFormTopContainerLeftContent1Container{
    display: flex;
    -webkit-box-align: center;
    align-items: center;
}

.LidoFormTopContainerLeftContent1Circle{
    background-color: #53BA95;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-left: 8px;
}

.LidoFormTopContainerLeftContent2{
    margin-top: 2px;
    font-size: 18px;
    line-height: 1.4em;
    font-weight: 800;
    white-space: nowrap;
    display: block;
}

.LidoFormTopContainerRight{
    align-self: stretch;
    display: flex;
    flex: 1 1 50%;
    -webkit-box-flex: 1;
    overflow: hidden;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: end;
    justify-content: flex-end;
    margin-left: auto;
}

.LidoFormTopContainerRightContent1{
    max-width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    margin: 0px;
    border-radius: 1000px;
    padding: 4px;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    background: rgba(0, 0, 0, .2);
    color: #fff;    
}

.LidoFormTopContainerRightContent1Text{
    padding: 0px 6px;
    font-weight: 400;
}

.LidoSplitter{
    box-sizing: border-box;
    list-style: none;
    opacity: 0.1;
    padding: 0px;
    flex-shrink: 0;
    -webkit-box-flex: 0;
    flex-grow: 0;
    border-top: 1px solid currentcolor;
    width: 100%;
    height: 0px;
    margin: 0px;
}

.LidoFormBottomContainer{
    margin-bottom: 0px;
    display: flex;
    margin: 20px 0px;
}

.LidoAprContainer{
    margin-right: 0px;
    flex-basis: 50%;
    -webkit-box-flex: 1;
    flex-grow: 1;
    font-size: 12px;
    line-height: 1.6em;
}

.LidoAprTitle{
    display: flex;
    flex-direction: row;
    -webkit-box-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    align-items: center;
}

.LidoAprValue{
    margin-top: 2px;
    font-size: 16px;
    line-height: 1.4em;
    font-weight: 800;
    white-space: nowrap;
    color: rgb(97, 183, 95);
    font-size: 16px;
    line-height: 1.4em;
    font-weight: 800;
    white-space: nowrap;
}        
}

.LidoStakeForm{
    font-weight: 400;
    font-size: 12px;
    line-height: 1.6em;
    border-radius: 0px 0px 20px 20px;
    margin: 0px;
    padding: 32px;
    box-shadow: none;
    background: #eee;
    color: #7a8aa0;
    margin-top: -30px;
}

.LidoStakeFormInputContainer{
    margin-bottom: 16px;
    z-index: 2;
    position: relative;
    display: inline-flex;
    border-width: 1px;
    border-style: solid;
    border-image: initial;
    border-radius: 10px;
    -webkit-box-align: stretch;
    align-items: stretch;
    box-sizing: border-box;
    padding: 0px 15px;
    cursor: text;
    transition: border-color 100ms ease 0s;
    width: 100%;
    background: #fff;
    border-color: rgba(0,10,61,.12);
    color: #273852;
}

.LidoStakeFormInputContainerSpan1{
    -webkit-box-flex: 0;
    flex-grow: 0;
    flex-shrink: 0;
    cursor: inherit;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding-right: 16px;
}

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

.LidoStakeFormInputContainerSpan2{
    font-weight: 400;
    font-size: 14px;
    display: flex;
    -webkit-box-flex: 1;
    flex-grow: 1;
    position: relative;
    padding: 17px 0px;
}

.LidoStakeFormInputContainerSpan2Input{
    width: 100%;
    font-family: inherit;
    font-weight: 400;
    font-size: 1em;
    line-height: 1.43em;
    padding: 0px;
    border-radius: 0px;
    background: transparent;
    box-shadow: none;
    border: none;
    outline: none;
    position: relative;
    top: 0px;
    color: #273852;
}

.LidoStakeFormInputContainerSpan3{
    -webkit-box-flex: 0;
    flex-grow: 0;
    flex-shrink: 0;
    cursor: inherit;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding-left: 16px;
}

.LidoStakeFormInputContainerSpan3Content{
    cursor: pointer;
    letter-spacing: 0.4px;
    box-sizing: border-box;
    margin: 0px;
    border: none;
    outline: none;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    background: transparent;
    font-family: inherit;
    font-weight: 700;
    width: auto;
    line-height: 1em;
    font-size: 10px;
    border-radius: 6px;
    padding: 11px 16px;
    min-width: 50px;
    color: #fa7aad;
    &::before {
            display: block;
            background-color: #f72277;
            transition: opacity 100ms ease 0s;
            opacity: 0.1;
            content: "";
            position: absolute;
            inset: 0px;
            pointer-events: none;
            border-radius: inherit;
        }    
}

.LidoStakeFormInputContainerSpan3Max{
    position: relative;
    pointer-events: none;
    visibility: visible;
}
.centered-container {
  display: flex;
  justify-content: center;
  height: 100vh;
}

.LidoStakeFormSubmitContainer{
    cursor: pointer;
    box-sizing: border-box;
    margin: 0px;
    border: none;
    outline: none;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    background-image: initial;
    background-position: initial;
    background-size: initial;
    background-repeat: initial;
    background-attachment: initial;
    background-origin: initial;
    background-clip: initial;
    font-family: inherit;
    font-weight: 700;
    width: 100%;
    line-height: 1em;
    font-size: 14px;
    border-radius: 10px;
    padding: 21px 44px;
    min-width: 120px;
    color: #fff;
    background-color: #FF5E58;
    transition: background-color 100ms ease 0s;
    &:hover {
        background-color: #FFD454;
    }
}

.LidoFooterContainer{
    font-weight: 400;
    font-size: 12px;
    line-height: 1.6em;
}

.LidoFooterRaw{
    margin-top: 0px;
    display: flex;
    margin: 16px 0px;
    font-weight: 400;
    font-size: 12px;
    line-height: 1.6em;
}

.LidoFooterRawLeft{
    color: #7a8aa0;
    -webkit-box-flex: 1;
    flex-grow: 1;
}

.LidoFooterRawRight{
    color: #273852;
    text-align: right;
    margin-left: 32px;
    -webkit-box-flex: 1;
    flex-grow: 1;
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
        <h1>Proving has never been this easy</h1>
        <p>
          Blockchain can allow to create attestations to certify and prove your
          achievements
        </p>
      </div>{" "}
      <button class="btn btn-primary mt-2 bg-white" onClick={onBtnClick}>
        <a href="#">Choose your attestation</a>
      </button>
      <p>................</p>
    </div>

    {/* fin */}
  </Theme>
);
