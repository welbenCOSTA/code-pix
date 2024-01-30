import { useContext } from "react";
import Link, { LinkProps } from "next/link";
import BankContext from "../../../context/BankContext";

import classes from "./BankAccountDashboard.module.scss";

interface ActionLinkProps extends LinkProps {}

const ActionLink: React.FunctionComponent<ActionLinkProps> = (props) => {
  const { children, ...rest } = props;
  const bank = useContext(BankContext);
  return (
    <Link {...rest}>
      <a className={`${classes.actionLink} ${classes[bank.cssCode]}`}>{children}</a>
    </Link>
  );
};

export default ActionLink
