// @flow
import { GetServerSideProps, NextPage } from "next";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

import Layout from "../../../components/Layout";
import { bankHttp } from "../../../util/http";
import { BankAccount, Transaction } from "../../../model";

import classes from "./BankAccountDashboard.module.scss";

import Header from './_header'
interface BankAccountDashboardProps {
  bankAccount: BankAccount;
  transactions: Transaction[];
}
const BankAccountDashboard: NextPage<BankAccountDashboardProps> = (props) => {
  const { bankAccount, transactions } = props;
  return (
    <Layout bankAccount={bankAccount}>
      <Header bankAccount={bankAccount} />
      <div>
        <h1 className={classes.titleTable}>Últimos lançamentos</h1>

        <table className={`table table-borderless table-striped ${classes.tableTransactions}`}>
          <thead>
            <tr>
              <th scope="col">Data</th>
              <th scope="col" colSpan={3}>
                Descrição
              </th>
              <th scope="col" className="text-right">
                Valor (R$)
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, key) => (
              <tr key={key}>
                <td>{format(parseISO(t.created_at), "dd/MM")}</td>
                <td colSpan={3}>{t.description}</td>
                <td className="text-right">
                  {t.amount.toLocaleString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default BankAccountDashboard;

export const getServerSideProps: GetServerSideProps = async (cxt) => {
  const {
    query: { id },
  } = cxt;
  const [{ data: bankAccount }, { data: transactions }] = await Promise.all([
    await bankHttp.get(`bank-accounts/${id}`),
    await bankHttp.get(`bank-accounts/${id}/transactions`),
  ]);

  return {
    props: {
      bankAccount,
      transactions
    },
  };
};
