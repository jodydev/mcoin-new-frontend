import { useTranslation } from "@pancakeswap/localization";
import { useIsMounted } from "@pancakeswap/hooks";
import { PropsWithChildren, ReactNode } from "react";
import { AutoColumn, RowBetween, Text, TextProps, IconButton, PencilIcon } from "../../components";
import { FaPencilAlt } from "react-icons/fa";

type SwapInfoType = {
  price: ReactNode;
  allowedSlippage: number;
  onSlippageClick: () => void;
};

export const SwapInfoLabel = (props: PropsWithChildren<TextProps>) => (
  <Text fontSize="14px" bold color="secondary" {...props} />
);

export const SwapInfo = ({ allowedSlippage, price, onSlippageClick }: SwapInfoType) => {
  const { t } = useTranslation();
  const isMounted = useIsMounted();

  return (
    <AutoColumn gap="sm" py="0" px="16px">
      <RowBetween alignItems="center">{price}</RowBetween>
      <RowBetween alignItems="center">
        <div className="d-flex flex-row align-items-center gap-3">
          <p className="fs-5">{t("Slippage Tolerance")}</p>
          <FaPencilAlt onClick={onSlippageClick} color="primary" width="14px" />
        </div>

        {isMounted && (
          <p className="fs-5 text-white fw-normal">
            {allowedSlippage / 100}%
          </p>
        )}
      </RowBetween>
    </AutoColumn>
  );
};
