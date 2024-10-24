import { Flex, IconButton, CogIcon, useModal } from "@pancakeswap/uikit";
import SettingsModal from "./SettingsModal";
import { IoMdSettings } from "react-icons/io";

type Props = {
  color?: string;
  mr?: string;
  mode?: string;
};

const GlobalSettings = ({ color, mr = "8px", mode }: Props) => {
  const [onPresentSettingsModal] = useModal(<SettingsModal mode={mode} />);

  return (
    <Flex style={{ cursor: "pointer" }} onClick={onPresentSettingsModal}>
      <IoMdSettings className="text-white fs-5 mb-1" />
    </Flex>
  );
};

export default GlobalSettings;
