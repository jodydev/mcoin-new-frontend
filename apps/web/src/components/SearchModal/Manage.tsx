import { useState } from "react";
import { Token } from "@pancakeswap/sdk";
import { ButtonMenu, ButtonMenuItem, ModalBody } from "@pancakeswap/uikit";
import styled from "styled-components";
import { TokenList } from "@pancakeswap/token-lists";
import { useTranslation } from "@pancakeswap/localization";
import ManageLists from "./ManageLists";
import ManageTokens from "./ManageTokens";
import { CurrencyModalView } from "./types";

const StyledButtonMenu = styled(ButtonMenu)`
  width: 100%;
`;

export default function Manage({
  setModalView,
  setImportList,
  setImportToken,
  setListUrl,
}: {
  setModalView: (view: CurrencyModalView) => void;
  setImportToken: (token: Token) => void;
  setImportList: (list: TokenList) => void;
  setListUrl: (url: string) => void;
}) {
  const [showLists, setShowLists] = useState(true);

  const { t } = useTranslation();

  return (
    <div id="switch-buttons" className="w-100 h-100">
      <div className="btn-group w-100 mb-4 px-5" role="group">
        <button
          type="button"
          className={`switch-button-inactive ${
            showLists ? "switch-button-active" : "btn-secondary"
          }`}
          onClick={() => setShowLists(true)}
        >
          {t("Lists")}
        </button>
        <button
          type="button"
          className={`switch-button-inactive2 ${
            !showLists ? "switch-button-active2" : "btn-secondary"
          }`}
          onClick={() => setShowLists(false)}
        >
          {t("Tokens")}
        </button>
      </div>
      <div className="mt-3">
        {showLists ? (
          <ManageLists
            setModalView={setModalView}
            setImportList={setImportList}
            setListUrl={setListUrl}
          />
        ) : (
          <ManageTokens
            setModalView={setModalView}
            setImportToken={setImportToken}
          />
        )}
      </div>
    </div>
  );
}
