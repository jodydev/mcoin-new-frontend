import styled from 'styled-components'
import { Text, Flex, Heading, IconButton, ArrowBackIcon, NotificationDot, QuestionHelper } from '@pancakeswap/uikit'
import { useExpertModeManager } from 'state/user/hooks'
import GlobalSettings from 'components/Menu/GlobalSettings'
import Link from 'next/link'
import Transactions from './Transactions'
import { SettingsMode } from '../Menu/GlobalSettings/types'

interface Props {
  title: string
  subtitle?: string
  helper?: string
  backTo?: string | (() => void)
  noConfig?: boolean
}

const AppHeaderContainer = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  width: 100%;
  // border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`

const AppHeader: React.FC<React.PropsWithChildren<Props>> = ({ title, subtitle, helper, backTo, noConfig = false }) => {
  const [expertMode] = useExpertModeManager()

  return (
    <Flex className='bg-card' padding="10px" width="100%" alignItems="center" justifyContent="space-between">
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
      <p className="mb-0 fs-1 fs-lg-3 font-bold text-white text-center text-nowrap">{title}</p>
    </Flex>
    <Flex
        style={{ gap: "15px", marginRight: "20px" }}
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
      </Flex>
      
  </Flex>
  )
}

export default AppHeader
