import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ThirdwebProvider,useContract } from '@thirdweb-dev/react'
import { StateContextProvider } from '../context'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
function MyApp({ Component, pageProps }: AppProps) {
  return (
  <ThirdwebProvider activeChain="mumbai" >
    <StateContextProvider>
    <Component {...pageProps} className=""/>
    </StateContextProvider>
  

  </ThirdwebProvider>

  )
}

export default MyApp
// function Component() {
//   const { contract, isLoading } = useContract("0xa5A866e216480516FFd7B53678e5567482Adf13A");
// }