import ReactGA from 'react-ga4'

const TRACKING_ID = 'G-WDC7CKZKWT'
export const initGA = () => {
    ReactGA.initialize(TRACKING_ID)
}

export const logPageView = () => {
    ReactGA.send({
        hitType: "pageview",
        page: window.location.pathname + window.location.search,
    })
}