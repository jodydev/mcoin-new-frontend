import { useCallback, useState, useRef, useEffect } from "react";
import { Currency, Token } from "@pancakeswap/sdk";
import {
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalBackButton,
  ModalCloseButton,
  ModalBody,
  InjectedModalProps,
  Heading,
  Button,
  useMatchBreakpoints,
  MODAL_SWIPE_TO_CLOSE_VELOCITY,
  ImportList,
} from "@pancakeswap/uikit";
import styled from "styled-components";
import { useListState } from "state/lists/lists";
import { useAllLists } from "state/lists/hooks";
import { usePreviousValue } from "@pancakeswap/hooks";
import { TokenList } from "@pancakeswap/token-lists";
import { useTranslation } from "@pancakeswap/localization";
import {
  enableList,
  removeList,
  useFetchListCallback,
} from "@pancakeswap/token-lists/react";
import CurrencySearch from "./CurrencySearch";
import ImportToken from "./ImportToken";
import Manage from "./Manage";
import { CurrencyModalView } from "./types";
import { BAD_SRCS } from "../Logo/constants";

const Footer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  text-align: center;
`;
const StyledModalContainer = styled(ModalContainer)`
  border: none !important;
  border-radius: 10px !important;
  min-width: 500px !important;
  background-color: #131118 !important;
  width: 100%;
  min-width: 320px;
  max-width: 420px !important;
  min-height: calc(var(--vh, 1vh) * 90);
  ${({ theme }) => theme.mediaQueries.md} {
    min-height: auto;
  }
`;

const StyledModalBody = styled(ModalBody)`
  padding: 24px;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export interface CurrencySearchModalProps extends InjectedModalProps {
  selectedCurrency?: Currency | null;
  onCurrencySelect: (currency: Currency) => void;
  otherSelectedCurrency?: Currency | null;
  showCommonBases?: boolean;
  commonBasesType?: string;
  showSearchInput?: boolean;
  tokensToShow?: Token[];
}

export default function CurrencySearchModal({
  onDismiss = () => null,
  onCurrencySelect,
  selectedCurrency,
  otherSelectedCurrency,
  showCommonBases = true,
  commonBasesType,
  showSearchInput,
  tokensToShow,
}: CurrencySearchModalProps) {
  const [modalView, setModalView] = useState<CurrencyModalView>(
    CurrencyModalView.search
  );

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onDismiss?.();
      onCurrencySelect(currency);
    },
    [onDismiss, onCurrencySelect]
  );

  // for token import view
  const prevView = usePreviousValue(modalView);

  // used for import token flow
  const [importToken, setImportToken] = useState<Token | undefined>();
  // used for import list
  const [importList, setImportList] = useState<TokenList | undefined>();
  const [listURL, setListUrl] = useState<string | undefined>();

  const { t } = useTranslation();

  const [, dispatch] = useListState();
  const lists = useAllLists();
  const adding = Boolean(lists[listURL]?.loadingRequestId);

  const fetchList = useFetchListCallback(dispatch);

  const [addError, setAddError] = useState<string | null>(null);

  const handleAddList = useCallback(() => {
    if (adding) return;
    setAddError(null);
    fetchList(listURL)
      .then(() => {
        dispatch(enableList(listURL));
        setModalView(CurrencyModalView.manage);
      })
      .catch((error) => {
        setAddError(error.message);
        dispatch(removeList(listURL));
      });
  }, [adding, dispatch, fetchList, listURL]);

  const config = {
    [CurrencyModalView.search]: {
      title: t("Select a Token"),
      onBack: undefined,
    },
    [CurrencyModalView.manage]: {
      title: t("Manage tokens"),
      onBack: () => setModalView(CurrencyModalView.search),
    },
    [CurrencyModalView.importToken]: {
      title: t("Import Tokens"),
      onBack: () =>
        setModalView(
          prevView && prevView !== CurrencyModalView.importToken
            ? prevView
            : CurrencyModalView.search
        ),
    },
    [CurrencyModalView.importList]: {
      title: t("Import List"),
      onBack: () => setModalView(CurrencyModalView.search),
    },
  };
  const { isMobile } = useMatchBreakpoints();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(undefined);
  useEffect(() => {
    if (!wrapperRef.current) return;
    setHeight(wrapperRef.current.offsetHeight - 330);
  }, []);

  return (
    <StyledModalContainer
      drag={isMobile ? "y" : false}
      dragConstraints={{ top: 0, bottom: 600 }}
      dragElastic={{ top: 0 }}
      dragSnapToOrigin
      onDragStart={() => {
        if (wrapperRef.current) wrapperRef.current.style.animation = "none";
      }}
      // @ts-ignore
      onDragEnd={(e, info) => {
        if (info.velocity.y > MODAL_SWIPE_TO_CLOSE_VELOCITY && onDismiss)
          onDismiss();
      }}
      ref={wrapperRef}
    >
      <div className="d-flex justify-content-between align-items-center mt-4">
        <p className="fs-5 text-white fw-semibold flex-grow-1 text-center ms-5">
          {config[modalView].title}
        </p>
        <div className="me-3">
          <ModalCloseButton onDismiss={onDismiss} />
        </div>
      </div>
      <div id="modal-search">
        {modalView === CurrencyModalView.search ? (
          <CurrencySearch
            onCurrencySelect={handleCurrencySelect}
            selectedCurrency={selectedCurrency}
            otherSelectedCurrency={otherSelectedCurrency}
            showCommonBases={showCommonBases}
            commonBasesType={commonBasesType}
            showSearchInput={showSearchInput}
            showImportView={() => setModalView(CurrencyModalView.importToken)}
            setImportToken={setImportToken}
            height={height}
            tokensToShow={tokensToShow}
          />
        ) : modalView === CurrencyModalView.importToken && importToken ? (
          <ImportToken
            tokens={[importToken]}
            handleCurrencySelect={handleCurrencySelect}
          />
        ) : modalView === CurrencyModalView.importList &&
          importList &&
          listURL ? (
          <ImportList
            onAddList={handleAddList}
            addError={addError}
            badSrcs={BAD_SRCS}
            listURL={listURL}
            listLogoURI={importList?.logoURI}
            listName={importList?.name}
            listTokenLength={importList?.tokens.length}
          />
        ) : modalView === CurrencyModalView.manage ? (
          <Manage
            setModalView={setModalView}
            setImportToken={setImportToken}
            setImportList={setImportList}
            setListUrl={setListUrl}
          />
        ) : (
          ""
        )}
        {modalView === CurrencyModalView.search && (
          <div className="text-center p-1 mx-5" style={{  background: "linear-gradient(90.54deg, #967BF8 -5.33%, #86ECE9 130.09%)",  borderRadius: "25px"    }}>
            <Button
              scale="sm"
              variant="text"
              onClick={() => setModalView(CurrencyModalView.manage)}
              className="list-token-manage-button"
            >
              {t("Manage Tokens")}
            </Button>
          </div>
        )}
      </div>
    </StyledModalContainer>
  );
}
