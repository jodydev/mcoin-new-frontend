import { vars } from "@pancakeswap/ui/css/vars.css";
import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Logo: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    // //todo change the logo
    <img src="/images/logo.png" width="150px" {...props} alt="Mcoin" />
  );
};

export default Logo;
