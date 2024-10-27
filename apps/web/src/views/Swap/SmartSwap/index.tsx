import { useTranslation } from "@pancakeswap/localization";
import { TbReload } from "react-icons/tb";
import { FaHistory } from "react-icons/fa";
import { HiArrowsUpDown } from "react-icons/hi2";
import { IoMdSettings } from "react-icons/io";
import styled, { css } from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { Currency, CurrencyAmount, NATIVE, Percent } from "@pancakeswap/sdk";
import {
  ArrowDownIcon,
  Box,
  Button,
  Checkbox,
  Flex,
  Message,
  MessageText,
  Skeleton,
  Swap as SwapUI,
  Text,
  useModal,
} from "@pancakeswap/uikit";
import UnsupportedCurrencyFooter from "components/UnsupportedCurrencyFooter";
import { useIsTransactionUnsupported } from "hooks/Trades";
import { useWeb3React } from "@pancakeswap/wagmi";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useSwapActionHandlers } from "state/swap/useSwapActionHandlers";
import { useStableSwapByDefault } from "state/user/smartRouter";
import { maxAmountSpend } from "utils/maxAmountSpend";
import AccessRisk from "views/Swap/components/AccessRisk";
import replaceBrowserHistory from "@pancakeswap/utils/replaceBrowserHistory";
import CurrencyInputPanel from "components/CurrencyInputPanel";
import { AutoColumn } from "components/Layout/Column";
import { AutoRow } from "components/Layout/Row";
import { CommonBasesType } from "components/SearchModal/types";
import { useCurrency } from "hooks/Tokens";
import { ApprovalState, useApproveCallback } from "hooks/useApproveCallback";
import useWrapCallback, { WrapType } from "hooks/useWrapCallback";
import { useAtomValue } from "jotai";
import { Field } from "state/swap/actions";
import { useDerivedSwapInfo, useSwapState } from "state/swap/hooks";
import {
  useExpertModeManager,
  useUserSlippageTolerance,
} from "state/user/hooks";
import { currencyId } from "utils/currencyId";
import { combinedTokenMapFromOfficialsUrlsAtom } from "../../../state/lists/hooks";
import AddressInputPanel from "../components/AddressInputPanel";
import AdvancedSwapDetailsDropdown from "../components/AdvancedSwapDetailsDropdown";
import CurrencyInputHeader from "../components/CurrencyInputHeader";
import { ArrowWrapper, Wrapper } from "../components/styleds";
import SwapCommitButton from "../components/SwapCommitButton";
import useRefreshBlockNumberID from "../hooks/useRefreshBlockNumber";
import useWarningImport from "../hooks/useWarningImport";
import { SwapFeaturesContext } from "../SwapFeaturesContext";
import SmartSwapCommitButton from "./components/SmartSwapCommitButton";
import {
  useDerivedSwapInfoWithStableSwap,
  useIsSmartRouterBetter,
  useTradeInfo,
} from "./hooks";
import SettingsModal from "../../../components/Menu/GlobalSettings/SettingsModal";
import { SettingsMode } from "../../../components/Menu/GlobalSettings/types";
import useActiveWeb3React from "hooks/useActiveWeb3React";

const Container = styled(Box)`
  background-color: #1c1924;
  border-radius: 16px;
  width: 100%;
`;

export const SmartSwapForm: React.FC<{
  handleOutputSelect: (newCurrencyOutput: Currency) => void;
}> = ({ handleOutputSelect }) => {
  const { isAccessTokenSupported } = useContext(SwapFeaturesContext);
  const { t } = useTranslation();
  const { refreshBlockNumber, isLoading } = useRefreshBlockNumberID();
  const warningSwapHandler = useWarningImport();
  const tokenMap = useAtomValue(combinedTokenMapFromOfficialsUrlsAtom);

  const { account, chainId } = useActiveWeb3React();

  // for expert mode
  const [isExpertMode] = useExpertModeManager();

  // get custom setting values for user
  const [allowedSlippage] = useUserSlippageTolerance();
  const [allowUseSmartRouter, setAllowUseSmartRouter] = useState(() => false);

  // swap state & price data

  const {
    independentField,
    typedValue,
    recipient,
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState();
  const inputCurrency = useCurrency(inputCurrencyId);
  const outputCurrency = useCurrency(outputCurrencyId);

  const currencies: { [field in Field]?: Currency } = useMemo(
    () => ({
      [Field.INPUT]: inputCurrency ?? undefined,
      [Field.OUTPUT]: outputCurrency ?? undefined,
    }),
    [inputCurrency, outputCurrency]
  );

  const [isStableSwapByDefault] = useStableSwapByDefault();

  const { v2Trade, inputError: swapInputError } = useDerivedSwapInfo(
    independentField,
    typedValue,
    inputCurrency,
    outputCurrency,
    recipient
  );
  const {
    trade: tradeWithStableSwap,
    currencyBalances,
    parsedAmount,
    inputError: stableSwapInputError,
  } = useDerivedSwapInfoWithStableSwap(
    independentField,
    typedValue,
    inputCurrency,
    outputCurrency,
    recipient
  );

  const isSmartRouterBetter = useIsSmartRouterBetter({
    trade: tradeWithStableSwap,
    v2Trade,
  });

  const tradeInfo = useTradeInfo({
    trade: tradeWithStableSwap,
    v2Trade,
    useSmartRouter:
      (allowUseSmartRouter || isStableSwapByDefault) && isSmartRouterBetter,
    allowedSlippage,
    chainId,
    swapInputError,
    stableSwapInputError,
  });

  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(
    currencies[Field.INPUT],
    currencies[Field.OUTPUT],
    typedValue
  );
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE;

  const parsedAmounts = showWrap
    ? {
        [Field.INPUT]: parsedAmount,
        [Field.OUTPUT]: parsedAmount,
      }
    : {
        [Field.INPUT]:
          independentField === Field.INPUT
            ? parsedAmount
            : tradeInfo?.inputAmount,
        [Field.OUTPUT]:
          independentField === Field.OUTPUT
            ? parsedAmount
            : tradeInfo?.outputAmount,
      };

  const {
    onSwitchTokens,
    onCurrencySelection,
    onUserInput,
    onChangeRecipient,
  } = useSwapActionHandlers();

  const dependentField: Field =
    independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT;

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value);
    },
    [onUserInput]
  );
  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value);
    },
    [onUserInput]
  );

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ""
      : parsedAmounts[dependentField]?.toSignificant(6) ?? "",
  };

  const amountToApprove = tradeInfo?.slippageAdjustedAmounts[Field.INPUT];
  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallback(
    amountToApprove,
    tradeInfo?.routerAddress
  );

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false);

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true);
    }
  }, [approval, approvalSubmitted]);

  const maxAmountInput: CurrencyAmount<Currency> | undefined = maxAmountSpend(
    currencyBalances[Field.INPUT]
  );

  const handleInputSelect = useCallback(
    (newCurrencyInput) => {
      setApprovalSubmitted(false); // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, newCurrencyInput);

      warningSwapHandler(newCurrencyInput);

      const newCurrencyInputId = currencyId(newCurrencyInput);
      if (newCurrencyInputId === outputCurrencyId) {
        replaceBrowserHistory("outputCurrency", inputCurrencyId);
      }
      replaceBrowserHistory("inputCurrency", newCurrencyInputId);
    },
    [inputCurrencyId, outputCurrencyId, onCurrencySelection, warningSwapHandler]
  );

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(Field.INPUT, maxAmountInput.toExact());
    }
  }, [maxAmountInput, onUserInput]);

  const handlePercentInput = useCallback(
    (percent) => {
      if (maxAmountInput) {
        onUserInput(
          Field.INPUT,
          maxAmountInput.multiply(new Percent(percent, 100)).toExact()
        );
      }
    },
    [maxAmountInput, onUserInput]
  );

  const swapIsUnsupported = useIsTransactionUnsupported(
    currencies?.INPUT,
    currencies?.OUTPUT
  );

  const hasAmount = Boolean(parsedAmount);

  const onRefreshPrice = useCallback(() => {
    if (hasAmount) {
      refreshBlockNumber();
    }
  }, [hasAmount, refreshBlockNumber]);

  const smartRouterOn = !!tradeInfo && !tradeInfo.fallbackV2;

  // Switch from exact out to exact in if smart router trade is better and user already allowed to use smart swap
  useEffect(() => {
    if (smartRouterOn && independentField === Field.OUTPUT && v2Trade) {
      onUserInput(Field.INPUT, v2Trade.inputAmount.toSignificant(6));
    }
  }, [smartRouterOn, independentField, onUserInput, v2Trade]);

  useEffect(() => {
    // Reset approval submit state after switch between old router and new router
    setApprovalSubmitted(false);
  }, [smartRouterOn]);

  const onUseSmartRouterChecked = useCallback(
    () => setAllowUseSmartRouter(!allowUseSmartRouter),
    [allowUseSmartRouter]
  );

  const allowRecipient = isExpertMode && !showWrap && !smartRouterOn;

  const [onPresentSettingsModal] = useModal(
    <SettingsModal mode={SettingsMode.SWAP_LIQUIDITY} />
  );

  const [openDropdown, setOpenDropdown] = useState(false);

  const onOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
    console.log("debug openDropdown", openDropdown);
  };

  const connectWallet = () => {
    console.log("debug connectWallet");
  };

  return (
    <>
      <div className="card w-100 h-100 ">
        {/*HEADER */}

        <CurrencyInputHeader
          title={t("Swap")}
          subtitle={t("Trade tokens in an instant")}
          hasAmount={hasAmount}
          onRefreshPrice={onRefreshPrice}
        />

        <div className="card-body">
          <div id="card-input" className="p-2 text-white">
            <div className="d-flex flex-column">
              <div className="row">
                <CurrencyInputPanel
                  label={
                    independentField === Field.OUTPUT && !showWrap && tradeInfo
                      ? t("From (estimated)")
                      : t("Swap From")
                  }
                  value={formattedAmounts[Field.INPUT]}
                  showMaxButton
                  maxAmount={maxAmountInput}
                  showQuickInputButton
                  currency={currencies[Field.INPUT]}
                  onUserInput={handleTypeInput}
                  onPercentInput={handlePercentInput}
                  onMax={handleMaxInput}
                  onCurrencySelect={handleInputSelect}
                  otherCurrency={currencies[Field.OUTPUT]}
                  id="swap-currency-input"
                  showCommonBases
                  showBUSD={
                    !!tokenMap[chainId]?.[inputCurrencyId] ||
                    inputCurrencyId === NATIVE[chainId]?.symbol
                  }
                  commonBasesType={CommonBasesType.SWAP_LIMITORDER}
                />
              </div>

              <div
                style={{
                  position: "relative",
                  width: "100%",
                }}
              >
                <hr className="border-2 border-top border-gray" />
                <button
                  onClick={() => {
                    setApprovalSubmitted(false); // reset 2 step UI for approvals
                    onSwitchTokens();
                    replaceBrowserHistory("inputCurrency", outputCurrencyId);
                    replaceBrowserHistory("outputCurrency", inputCurrencyId);
                  }}
                  className="my-bg-primary text-white border-0 p-3 rounded-circle"
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <HiArrowsUpDown className="fs-4" />
                </button>
              </div>

              <div className="row">
                <CurrencyInputPanel
                  value={formattedAmounts[Field.OUTPUT]}
                  onUserInput={handleTypeOutput}
                  label={
                    independentField === Field.INPUT && !showWrap && tradeInfo
                      ? t("To (estimated)")
                      : t("To")
                  }
                  showMaxButton={false}
                  currency={currencies[Field.OUTPUT]}
                  onCurrencySelect={handleOutputSelect}
                  otherCurrency={currencies[Field.INPUT]}
                  id="swap-currency-output"
                  showCommonBases
                  disabled={smartRouterOn}
                  showBUSD={
                    !!tokenMap[chainId]?.[outputCurrencyId] ||
                    outputCurrencyId === NATIVE[chainId]?.symbol
                  }
                  commonBasesType={CommonBasesType.SWAP_LIMITORDER}
                />
              </div>
            </div>

            <div id="tollerance">
              {isSmartRouterBetter && !isStableSwapByDefault && (
                <AutoColumn>
                  {allowUseSmartRouter && (
                    <Box
                      mb="8px"
                      style={{
                        backgroundColor: "yellow",
                        padding: "8px",
                        borderRadius: "4px",
                      }}
                    >
                      <Text>
                        {t(
                          "This route includes StableSwap and can’t edit output"
                        )}
                      </Text>
                    </Box>
                  )}
                  <Flex alignItems="center" onClick={onUseSmartRouterChecked}>
                    <Checkbox
                      scale="sm"
                      name="allowUseSmartRouter"
                      type="checkbox"
                      checked={allowUseSmartRouter}
                      onChange={onUseSmartRouterChecked}
                    />
                    <Text ml="8px" style={{ userSelect: "none" }}>
                      {t("Use StableSwap for better fees")}
                    </Text>
                  </Flex>
                </AutoColumn>
              )}

              {allowRecipient && recipient !== null ? (
                <>
                  <AutoRow
                    justify="space-between"
                    style={{ padding: "0 1rem" }}
                  >
                    <ArrowWrapper clickable={false}>
                      <i
                        className="fas fa-arrow-down"
                        style={{ fontSize: "16px" }}
                      ></i>
                    </ArrowWrapper>
                    <Button
                      variant="text"
                      id="remove-recipient-button"
                      onClick={() => onChangeRecipient(null)}
                    >
                      {t("- Remove send")}
                    </Button>
                  </AutoRow>
                  <AddressInputPanel
                    id="recipient"
                    value={recipient}
                    onChange={onChangeRecipient}
                  />
                </>
              ) : null}

              {showWrap ? null : (
                <SwapUI.Info
                  price={
                    Boolean(tradeInfo) && (
                      <>
                        <p className="fs-4">{t("Price:")}</p>
                        {isLoading ? (
                          <></>
                        ) : (
                          <SwapUI.TradePrice
                            price={tradeInfo?.executionPrice}
                          />
                        )}
                      </>
                    )
                  }
                  allowedSlippage={allowedSlippage}
                  onSlippageClick={onPresentSettingsModal}
                />
              )}

              {!swapIsUnsupported ? (
                !showWrap &&
                tradeInfo && (
                  <AdvancedSwapDetailsDropdown
                    hasStablePair={smartRouterOn}
                    pairs={tradeInfo.route.pairs}
                    path={tradeInfo.route.path}
                    priceImpactWithoutFee={tradeInfo.priceImpactWithoutFee}
                    realizedLPFee={tradeInfo.realizedLPFee}
                    slippageAdjustedAmounts={tradeInfo.slippageAdjustedAmounts}
                    inputAmount={tradeInfo.inputAmount}
                    outputAmount={tradeInfo.outputAmount}
                    tradeType={tradeInfo.tradeType}
                  />
                )
              ) : (
                <UnsupportedCurrencyFooter
                  currencies={[currencies.INPUT, currencies.OUTPUT]}
                />
              )}
            </div>

            {/*BUTTON */}
            <div
              id="connect-wallet"
              className="d-flex justify-content-center mt-5 mb-3 w-100"
            >
              <>
                {tradeInfo?.fallbackV2 ? (
                  <SwapCommitButton
                    swapIsUnsupported={swapIsUnsupported}
                    account={account}
                    showWrap={showWrap}
                    wrapInputError={wrapInputError}
                    onWrap={onWrap}
                    wrapType={wrapType}
                    parsedIndepentFieldAmount={parsedAmounts[independentField]}
                    approval={approval}
                    approveCallback={approveCallback}
                    approvalSubmitted={approvalSubmitted}
                    currencies={currencies}
                    isExpertMode={isExpertMode}
                    trade={v2Trade}
                    swapInputError={tradeInfo.inputError}
                    currencyBalances={currencyBalances}
                    recipient={recipient}
                    allowedSlippage={allowedSlippage}
                    onUserInput={onUserInput}
                  />
                ) : (
                  <SmartSwapCommitButton
                    swapIsUnsupported={swapIsUnsupported}
                    account={account}
                    showWrap={showWrap}
                    wrapInputError={wrapInputError}
                    onWrap={onWrap}
                    wrapType={wrapType}
                    parsedIndepentFieldAmount={parsedAmounts[independentField]}
                    approval={approval}
                    approveCallback={approveCallback}
                    approvalSubmitted={approvalSubmitted}
                    currencies={currencies}
                    isExpertMode={isExpertMode}
                    trade={tradeWithStableSwap}
                    swapInputError={swapInputError}
                    currencyBalances={currencyBalances}
                    recipient={recipient}
                    allowedSlippage={allowedSlippage}
                    onUserInput={onUserInput}
                  />
                )}
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
