import Head from 'next/head'
import classes from './layoutHome.module.css'

export default function Layout({ children, configure, backClicked, changeTheme, title }) {
  return (
    <div className={classes.container}>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <link rel="preload" href="/fonts/Droid/disposabledroid-bb.regular.ttf" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/Inter/Inter-Bold.ttf" as="font" crossOrigin="" />

        <link rel="preload" href="/fonts/MonumentExt/MonumentExtended-Regular.otf" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/MonumentExt/MonumentExtended-Bold.otf" as="font" crossOrigin="" />
        <meta
          name="description"
          content="Printy allows low cost, near 0 slippage trades on uncorrelated or tightly correlated assets built on Fantom."
        />
        <meta name="og:title" content="Printy" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className={classes.content}>
        <main>{children}</main>
      </div>
    </div>
  )
}
