"use client";

import Script from "next/script";
import { SITE } from "@/lib/site";

export default function Analytics() {
  const a = SITE.analytics || {};
  const hasAny = a.ga4 || a.gtm || a.clarity || a.fbPixel || a.linkedin;

  if (!hasAny) return null;

  return (
    <>
      {/* GA4 */}
      {a.ga4 && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${a.ga4}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${a.ga4}');
            `}
          </Script>
        </>
      )}

      {/* Microsoft Clarity */}
      {a.clarity && (
        <Script id="clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${a.clarity}");
          `}
        </Script>
      )}

      {/* Facebook Pixel */}
      {a.fbPixel && (
        <>
          <Script id="fb-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s){
                if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)
              }(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${a.fbPixel}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img height="1" width="1" alt=""
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${a.fbPixel}&ev=PageView&noscript=1`} />
          </noscript>
        </>
      )}

      {/* LinkedIn Insight */}
      {a.linkedin && (
        <>
          <Script id="linkedin" strategy="afterInteractive">
            {`
              _linkedin_partner_id = "${a.linkedin}";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            `}
          </Script>
          <Script strategy="afterInteractive" src="https://snap.licdn.com/li.lms-analytics/insight.min.js" />
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img height="1" width="1" alt=""
              style={{ display: "none" }}
              src={`https://px.ads.linkedin.com/collect/?pid=${a.linkedin}&fmt=gif`} />
          </noscript>
        </>
      )}

      {/* GTM (si prefieres todo por Tag Manager) */}
      {a.gtm && (
        <>
          <Script id="gtm" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${a.gtm}');
            `}
          </Script>
          {/* En layout, dentro de <body>, puedes agregar el noscript si usas GTM:
              <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXX"
               height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> */}
        </>
      )}
    </>
  );
}
