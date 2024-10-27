import { useTranslation } from "@pancakeswap/localization";
import {
  // ChartDisableIcon,
  // ChartIcon,
  Flex,
  HistoryIcon,
  // HotDisableIcon,
  // HotIcon,
  IconButton,
  NotificationDot,
  Swap,
  Text,
  // TooltipText,
  useModal,
  // useTooltip,
} from "@pancakeswap/uikit";
import TransactionsModal from "components/App/Transactions/TransactionsModal";
import GlobalSettings from "components/Menu/GlobalSettings";
import RefreshIcon from "components/Svg/RefreshIcon";
import { useSwapHotTokenDisplay } from "hooks/useSwapHotTokenDisplay";
import { useAtom } from "jotai";
import {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { isMobile } from "react-device-detect";
import { useExpertModeManager } from "state/user/hooks";
// import styled from 'styled-components'
import atomWithStorageWithErrorCatch from "utils/atomWithStorageWithErrorCatch";
import { SettingsMode } from "../../../components/Menu/GlobalSettings/types";
import { SwapFeaturesContext } from "../SwapFeaturesContext";
import styled from "styled-components";

export const HeaderWrapper = styled.div`
  border-style: solid;
  border-color: white;
  border-bottom-width: 1px;
`;

interface Props {
  title: string | ReactElement;
  subtitle: string;
  noConfig?: boolean;
  setIsChartDisplayed?: React.Dispatch<React.SetStateAction<boolean>>;
  isChartDisplayed?: boolean;
  hasAmount: boolean;
  onRefreshPrice: () => void;
}

// const ColoredIconButton = styled(IconButton)`
//   color: ${({ theme }) => theme.colors.textSubtle};
// `

const mobileShowOnceTokenHighlightAtom = atomWithStorageWithErrorCatch(
  "pcs::mobileShowOnceTokenHighlight",
  false
);

const CurrencyInputHeader: React.FC<React.PropsWithChildren<Props>> = ({
  subtitle,
  hasAmount,
  onRefreshPrice,
  title,
}) => {
  const { t } = useTranslation();
  const [mobileTooltipShowOnce, setMobileTooltipShowOnce] = useAtom(
    mobileShowOnceTokenHighlightAtom
  );
  const [, setMobileTooltipShow] = useState(false);
  // const { tooltip, tooltipVisible, targetRef } = useTooltip(<Text>{t('Check out the top traded tokens')}</Text>, {
  //   placement: isMobile ? 'top' : 'bottom',
  //   trigger: isMobile ? 'focus' : 'hover',
  //   ...(isMobile && { manualVisible: mobileTooltipShow }),
  // })
  const { setIsChartDisplayed } = useContext(SwapFeaturesContext);
  const [expertMode] = useExpertModeManager();
  // const toggleChartDisplayed = () => {
  //   setIsChartDisplayed((currentIsChartDisplayed) => !currentIsChartDisplayed)
  // }
  const [onPresentTransactionsModal] = useModal(<TransactionsModal />);
  const handleOnClick = useCallback(() => onRefreshPrice?.(), [onRefreshPrice]);
  const [isSwapHotTokenDisplay, setIsSwapHotTokenDisplay] =
    useSwapHotTokenDisplay();

  const mobileTooltipClickOutside = useCallback(() => {
    setMobileTooltipShow(false);
  }, []);

  useEffect(() => {
    if (isMobile && !mobileTooltipShowOnce) {
      setMobileTooltipShow(true);
      setMobileTooltipShowOnce(true);
    }
  }, [mobileTooltipShowOnce, setMobileTooltipShowOnce]);

  useEffect(() => {
    document.body.addEventListener("click", mobileTooltipClickOutside);
    return () => {
      document.body.removeEventListener("click", mobileTooltipClickOutside);
    };
  }, [mobileTooltipClickOutside]);

  const titleContent = (
    <Flex width="100%" alignItems="center" justifyContent="space-between">
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        width="60%"
        marginY={20}
      ></Flex>
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        width="50%"
        marginY={20}
      >
        <h5 className="mb-0 fs-2 font-bold text-white text-start text-lg-center ">{title}</h5>
      </Flex>
      <Flex
        style={{ gap: "15px" }}
        justifyContent="end"
        alignItems="center"
        width="60%"
      >
        <NotificationDot show={expertMode}>
          <GlobalSettings
            color="textSubtle"
            mode={SettingsMode.SWAP_LIQUIDITY}
          />
        </NotificationDot>
        <div
          style={{ cursor: "pointer" }}
          onClick={onPresentTransactionsModal}
          variant="text"
          scale="sm"
        >
          <HistoryIcon color="textSubtle" width="24px" />
        </div>
        <div
          style={{ cursor: "pointer" }}
          variant="text"
          scale="sm"
          onClick={handleOnClick}
        >
          <RefreshIcon disabled={!hasAmount} color="textSubtle" width="27px" />
        </div>
      </Flex>
    </Flex>
  );

  return (
    <>
      <Swap.CurrencyInputHeader title={titleContent} subtitle={<></>} />
    </>
  );
};

export default CurrencyInputHeader;
