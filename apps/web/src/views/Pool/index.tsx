import { useMemo } from "react";
import { FaInbox } from "react-icons/fa6";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import {
  Text,
  Flex,
  CardBody,
  CardFooter,
  Button,
  AddIcon,
  Coming1,
} from "@pancakeswap/uikit";
import Link from "next/link";
import { useAccount } from "wagmi";
import { useTranslation } from "@pancakeswap/localization";
import { useLPTokensWithBalanceByAccount } from "views/Swap/StableSwap/hooks/useStableConfig";
import FullPositionCard, {
  StableFullPositionCard,
} from "../../components/PositionCard";
import { useTokenBalancesWithLoadingIndicator } from "../../state/wallet/hooks";
import { usePairs, PairState } from "../../hooks/usePairs";
import {
  toV2LiquidityToken,
  useTrackedTokenPairs,
} from "../../state/user/hooks";
import Dots from "../../components/Loader/Dots";
import { AppHeader, AppBody } from "../../components/App";
import Page from "../Page";

const Body = styled(CardBody)`
  background-color: ${({ theme }) => theme.colors.dropdownDeep};
`;

export default function Pool() {
  const { address: account } = useAccount();
  const { t } = useTranslation();

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs();

  const tokenPairsWithLiquidityTokens = useMemo(
    () =>
      trackedTokenPairs.map((tokens) => ({
        liquidityToken: toV2LiquidityToken(tokens),
        tokens,
      })),
    [trackedTokenPairs]
  );
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens]
  );
  const [v2PairsBalances, fetchingV2PairBalances] =
    useTokenBalancesWithLoadingIndicator(account ?? undefined, liquidityTokens);

  const stablePairs = useLPTokensWithBalanceByAccount(account);

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan("0")
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  );

  const v2Pairs = usePairs(
    liquidityTokensWithBalances.map(({ tokens }) => tokens)
  );
  const v2IsLoading =
    fetchingV2PairBalances ||
    v2Pairs?.length < liquidityTokensWithBalances.length ||
    (v2Pairs?.length &&
      v2Pairs.every(([pairState]) => pairState === PairState.LOADING));
  const allV2PairsWithLiquidity = v2Pairs
    ?.filter(
      ([pairState, pair]) => pairState === PairState.EXISTS && Boolean(pair)
    )
    .map(([, pair]) => pair);

  const renderBody = () => {
    if (!account) {
      return (
        <div
          id="add-liquidity"
          className="d-flex items-center justify-content-center rounded-3"
        >
          <div
            id="icon-liquidity"
            className="d-flex flex-column align-items-center"
          >
            <FaInbox className="fs-1 text-white mb-4" />
            <p className="text-center text-white fs-5">
              {t("Your liquidity will appear here")}
            </p>
          </div>
        </div>
      );
    }
    if (v2IsLoading) {
      return (
        <Text color="textSubtle" textAlign="center">
          <Dots>{t("Loading")}</Dots>
        </Text>
      );
    }

    let positionCards = [];

    if (allV2PairsWithLiquidity?.length > 0) {
      positionCards = allV2PairsWithLiquidity.map((v2Pair, index) => (
        <FullPositionCard
          key={v2Pair.liquidityToken.address}
          pair={v2Pair}
          mb={
            Boolean(stablePairs?.length) ||
            index < allV2PairsWithLiquidity.length - 1
              ? "16px"
              : 0
          }
        />
      ));
    }

    if (stablePairs?.length > 0) {
      positionCards = [
        ...positionCards,
        ...stablePairs?.map((stablePair, index) => (
          <StableFullPositionCard
            key={`stable-${stablePair.liquidityToken.address}`}
            pair={stablePair}
            mb={index < stablePairs.length - 1 ? "16px" : 0}
          />
        )),
      ];
    }

    if (positionCards?.length > 0) {
      return positionCards;
    }

    return (
      <Text color="textSubtle" textAlign="center">
        {t("No liquidity found.")}
      </Text>
    );
  };

  return (
    <Page>
      <div className="d-flex items-center justify-content-center">
        <div className="card-2">
          <AppHeader title={t("Your Liquidity")} subtitle={t("")} />
          <p className="mb-0 mx-3 mx-lg-0 fs-5 text-white text-start text-lg-center text-wrap text-lg-nowrap">
            Remove liquidity to receive tokens back
          </p>

          <Body className="mt-5 mx-4">{renderBody()}</Body>
          <CardFooter className="mt-3" style={{ textAlign: "center" }}>
            <Link href="/add" passHref>
              <Button id="join-pool-button" width="100%">
                {t("Add Liquidity")}
              </Button>
            </Link>
            <Link href="/find" passHref>
              <p className="text-white mt-4 fs-5">
                Don't see a pair you joined?{" "}
                <span className="text-primary text-decoration-underline">
                  Find other LP token
                </span>
              </p>
            </Link>
          </CardFooter>
        </div>
      </div>
    </Page>
  );
}
