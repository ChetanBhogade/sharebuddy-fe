import React from "react";
import PageLayout from "../common/PageLayout";
import ResponsiveDrawer from "../common/Drawer/ResponsiveDrawer";
import TransferList from "../common/TransferList";

function WalletPage() {
  return (
    <PageLayout>
      <ResponsiveDrawer documentHeading={"Wallet"}>
        <h2>Complete your pending transactions</h2>
        <TransferList leftList={[1, 3, 4, 5]} rightList={[3, 4, 5, 6, 7, 9]} />
      </ResponsiveDrawer>
    </PageLayout>
  );
}

export default WalletPage;
