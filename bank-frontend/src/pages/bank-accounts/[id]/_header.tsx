import { FunctionComponent } from "react";
import { BankAccountBalance } from "../../../components/BankAccountBalance";
import { BankAccount } from "../../../model";
import ActionLink from "./_account";

import classes from "./BankAccountDashboard.module.scss";

interface HeaderProps {
  bankAccount: BankAccount;
}
const Header: FunctionComponent<HeaderProps> = (props) => {
  const { bankAccount } = props;
  return (
    <div className={`container ${classes.header}`}>
      <BankAccountBalance balance={bankAccount.balance} />
      <div className={classes.buttonActions}>
        <ActionLink
          href="/bank-accounts/[id]/pix/transactions/register"
          as={`/bank-accounts/${bankAccount.id}/pix/transactions/register`}
        >
          Realizar transferência
        </ActionLink>
        <ActionLink
          href={"/bank-accounts/[id]/pix/register"}
          as={`/bank-accounts/${bankAccount.id}/pix/register`}
        >
          Cadastrar chave pix
        </ActionLink>
      </div>
    </div>
  );
};

export default Header