// ** Next Imports
import Head from 'next/head'
import {Router, useRouter} from 'next/router'

//auth import

import {AuthWrapper, useAuthContext} from '../lib/auth'; // import based on where you put it

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import {CacheProvider} from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import {SettingsConsumer, SettingsProvider} from 'src/@core/context/settingsContext'

// ** Utils Imports
import {createEmotionCache} from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'
import {useEffect, useState} from "react";
import GuestLayout from "../layouts/GuestLayout";


const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = props => {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props
  const { auth } = useAuthContext()
  const router = useRouter()

  const [isGuest, setIsGuest] = useState(false);
  useEffect(() => {
    console.log("auth", auth)
    const isGuest =  router.pathname === "/guest/[gid]";
    isGuest && setIsGuest(true)
    !isGuest && !auth && router.push("/login");
  },[auth])

  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)
  const getLayout2 = Component.getLayout ?? (page => <GuestLayout>{page}</GuestLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName}`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName}`}
        />
        <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template'/>
        <meta name='viewport' content='initial-scale=1, width=device-width'/>
      </Head>
      <AuthWrapper>
        <SettingsProvider>
          <SettingsConsumer>
            {({settings}) => {
              return <ThemeComponent settings={settings}>{
                isGuest ? getLayout2(<Component {...pageProps}/>) : getLayout(<Component {...pageProps} />)

              }</ThemeComponent>
            }}
          </SettingsConsumer>
        </SettingsProvider>
      </AuthWrapper>
    </CacheProvider>
  )
}

export default App
