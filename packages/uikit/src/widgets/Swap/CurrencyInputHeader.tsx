import { AtomBox } from "@pancakeswap/ui";
import { ReactNode } from "react";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";

interface Props {
  title: ReactNode;
  subtitle: ReactNode;
}

export const CurrencyInputHeader = ({ title, subtitle }: Props) => {
  return (
    // <AtomBox width="full" alignItems="center" flexDirection="column" padding="24px" borderBottom="1">
    <AtomBox width="full" alignItems="center" flexDirection="column" px="24px" pt="12px">
      <AtomBox display="flex" width="full" alignItems="center" justifyContent="space-between">
        {title}
      </AtomBox>
      {subtitle}
    </AtomBox>
  );
};

export const CurrencyInputHeaderTitle = ({ children }: { children: ReactNode }) => (
    <Text color="textSubtle" fontSize="24px" textAlign="center">
    {children}
  </Text>
);
export const CurrencyInputHeaderSubTitle = ({ children }: { children: ReactNode }) => (
  <Text color="textSubtle" fontSize="14px" textAlign="center">
    {children}
  </Text>
);
