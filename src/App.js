import React, { useState } from 'react';
import CreateForm from './components/CreateForm';
import Listing from './components/Listing';
import ConnectWalletBanner from './common-components/ConnectWalletBanner';
import { useWallet } from "./common-components/UseWallet";
const App = () => {
  const { isConnected, provider } = useWallet();


  return (
    <React.Fragment>

      {(isConnected && provider) ? <React.Fragment>
        <div className='mt-16'>
          <CreateForm />
          <Listing /></div>
      </React.Fragment> : <ConnectWalletBanner />}
    </React.Fragment>
  )
};

export default App;
