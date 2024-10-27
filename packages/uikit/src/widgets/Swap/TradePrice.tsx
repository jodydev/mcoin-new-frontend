import { Price, Currency } from "@pancakeswap/swap-sdk-core";
import { AtomBox } from "@pancakeswap/ui/components/AtomBox";
import { useState } from "react";
import { balanceMaxMiniClass } from "./SwapWidget.css";
import { AutoRenewIcon } from "../../components/Svg";
import { Text } from "../../components/Text";

interface TradePriceProps {
  price?: Price<Currency, Currency>;
}

export function TradePrice({ price }: TradePriceProps) {
  const [showInverted, setShowInverted] = useState<boolean>(false);
  const formattedPrice = showInverted ? price?.toSignificant(6) : price?.invert()?.toSignificant(6);

  const show = Boolean(price?.baseCurrency && price?.quoteCurrency);
  const label = showInverted
    ? `${price?.quoteCurrency?.symbol} per ${price?.baseCurrency?.symbol}`
    : `${price?.baseCurrency?.symbol} per ${price?.quoteCurrency?.symbol}`;

  return (
    <div className="flex items-start">
      <Text style={{ display: "flex", fontSize: "18px" }}>
      {show ? (
        <>
        {formattedPrice ?? "-"} {label}
        <div onClick={() => setShowInverted(!showInverted)} style={{ marginLeft: "8px", cursor: "pointer" }}>
          <AutoRenewIcon width="14px" />
        </div>
        </>
      ) : (
        "-"
      )}
      </Text>
    </div>
  );
}
