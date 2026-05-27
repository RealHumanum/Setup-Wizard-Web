import Script from "next/script";

export const GA_ID = "G-ND0K7GQ68B";
export const ADS_ID = "AW-18011258509";

// Google Analytics + Google Ads with Consent Mode v2 (default denied).
// Web-only marketing analytics — the mobile app remains zero-collection.
export function Analytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied'
          });
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
          gtag('config', '${ADS_ID}');
          var saved = localStorage.getItem('apex_wizard_consent');
          if (saved === 'granted') {
            gtag('consent', 'update', {
              'ad_storage': 'granted',
              'ad_user_data': 'granted',
              'ad_personalization': 'granted',
              'analytics_storage': 'granted'
            });
          }
        `}
      </Script>
    </>
  );
}
