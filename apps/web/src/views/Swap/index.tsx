// import styled from 'styled-components'
import { useTranslation } from "@pancakeswap/localization";
import { Currency } from "@pancakeswap/sdk";
import { Flex, useMatchBreakpoints } from "@pancakeswap/uikit";
import { AppBody } from "components/App";
import styled from "styled-components";
// import StyledDisableFlex from 'components/StyledDisableFlex'
import { useContext, useCallback } from "react";
import { useSwapActionHandlers } from "state/swap/useSwapActionHandlers";
import { currencyId } from "utils/currencyId";
import replaceBrowserHistory from "@pancakeswap/utils/replaceBrowserHistory";

import { useSwapHotTokenDisplay } from "hooks/useSwapHotTokenDisplay";
import { useCurrency } from "../../hooks/Tokens";
import { Field } from "../../state/swap/actions";
import { useSwapState } from "../../state/swap/hooks";
import Page from "../Page";
import { SmartSwapForm } from "./SmartSwap";
import useWarningImport from "./hooks/useWarningImport";
import { StyledInputCurrencyWrapper, StyledSwapContainer } from "./styles";
import { SwapFeaturesContext } from "./SwapFeaturesContext";
import SocialLinks from "../../../../../packages/uikit/src/components/Footer/Components/SocialLinks";

const Container = styled.div`
  flex: none;
  padding: 8px 4px;
  background-color: ${({ theme }) => theme.nav.background};
  border-top: 2px solid #0e0e0e;
`;

const SocialEntry = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  margin-bottom: 16px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 16px;
  align-items: flex-start;
  margin-top: 8px;
`;

export default function Swap() {
  const { isMobile } = useMatchBreakpoints();
  const {
    isChartExpanded,
    isChartDisplayed,
    setIsChartDisplayed,
    setIsChartExpanded,
    isChartSupported,
  } = useContext(SwapFeaturesContext);
  const [isSwapHotTokenDisplay, setIsSwapHotTokenDisplay] =
    useSwapHotTokenDisplay();
  const { t } = useTranslation();

  // swap state & price data
  const {
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState();
  const inputCurrency = useCurrency(inputCurrencyId);
  const outputCurrency = useCurrency(outputCurrencyId);

  const currencies: { [field in Field]?: Currency } = {
    [Field.INPUT]: inputCurrency ?? undefined,
    [Field.OUTPUT]: outputCurrency ?? undefined,
  };

  // const singleTokenPrice = useSingleTokenSwapInfo(inputCurrencyId, inputCurrency, outputCurrencyId, outputCurrency)
  const warningSwapHandler = useWarningImport();
  const { onCurrencySelection } = useSwapActionHandlers();

  const handleOutputSelect = useCallback(
    (newCurrencyOutput: Currency) => {
      onCurrencySelection(Field.OUTPUT, newCurrencyOutput);
      warningSwapHandler(newCurrencyOutput);

      const newCurrencyOutputId = currencyId(newCurrencyOutput);
      if (newCurrencyOutputId === inputCurrencyId) {
        replaceBrowserHistory("inputCurrency", outputCurrencyId);
      }
      replaceBrowserHistory("outputCurrency", newCurrencyOutputId);
    },

    [inputCurrencyId, outputCurrencyId, onCurrencySelection, warningSwapHandler]
  );

  return (
    <Page removePadding={isChartExpanded} hideFooterOnDesktop={isChartExpanded}>
      {/* <Coming1 />
      <StyledDisableFlex> */}
      <div className="d-flex items-center justify-content-center">
        {/* {!isMobile && isChartSupported && (
          <PriceChartContainer
            inputCurrencyId={inputCurrencyId}
            inputCurrency={currencies[Field.INPUT]}
            outputCurrencyId={outputCurrencyId}
            outputCurrency={currencies[Field.OUTPUT]}
            isChartExpanded={isChartExpanded}
            setIsChartExpanded={setIsChartExpanded}
            isChartDisplayed={isChartDisplayed}
            currentSwapPrice={singleTokenPrice}
          />
        )}
        {isChartSupported && (
          <BottomDrawer
            content={
              <PriceChartContainer
                inputCurrencyId={inputCurrencyId}
                inputCurrency={currencies[Field.INPUT]}
                outputCurrencyId={outputCurrencyId}
                outputCurrency={currencies[Field.OUTPUT]}
                isChartExpanded={isChartExpanded}
                setIsChartExpanded={setIsChartExpanded}
                isChartDisplayed={isChartDisplayed}
                currentSwapPrice={singleTokenPrice}
                isMobile
              />
            }
            isOpen={isChartDisplayed}
            setIsOpen={setIsChartDisplayed}
          />
        )}
        {!isMobile && isSwapHotTokenDisplay && <HotTokenList handleOutputSelect={handleOutputSelect} />} */}

        {/* <ModalV2 isOpen={isMobile && isSwapHotTokenDisplay} onDismiss={() => setIsSwapHotTokenDisplay(false)}>
          <Modal
            style={{ padding: 0 }}
            title={t('Top Token')}
            onDismiss={() => setIsSwapHotTokenDisplay(false)}
            bodyPadding="0px"
          >
            <HotTokenList
              handleOutputSelect={(newCurrencyOutput: Currency) => {
                handleOutputSelect(newCurrencyOutput)
                setIsSwapHotTokenDisplay(false)
              }}
            />
          </Modal>
        </ModalV2> */}

        {/* //todo DA CAMBIARE VALORE IN FILE CSS DI MY POSITION QUANDO FARO MEDIA QUERY MOBILE */}
        <div id="social" className="d-flex flex-column justify-content-center align-items-center">
          <SmartSwapForm handleOutputSelect={handleOutputSelect} />

          {/* //todo AGGIUNGERE QUI BOX SOCIAL MEDIA */}
          <div className="mt-5 my-lg-5">
          <div className="social d-flex justify-content-center align-items-center h-100 w-100 mt-lg-5">
            <SocialEntry>
              <SocialLinks />
            </SocialEntry>
          </div>
          </div>
   

          <div className="d-flex flex-row justify-content-center align-items-center mt-4">
            <div className=" border-right">
              <a href="" className="text-center mt-3 me-5 fs-5">M20 Chain</a>
            </div>
            <div>
              <p className="text-center mt-3 ms-5 fs-5">M20 Swap</p>
            </div>
          </div>

          <div>
            <p className="text-center my-5 fs-5 ">
              ©2024 - M20 Chain, All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
}
