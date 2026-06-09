# Deep linking (Universal Links / App Links)

These two files bridge organic web results into the native app, so a Google
result for e.g. `/setup/yamaha/yzf-r1-2009` can open directly in Apex Wizard on a
phone that has it installed. They are **staged, not active** — each needs one
value that only you have. Fill them in, drop them in this `public/.well-known/`
folder (no file extension on the AASA), commit, and they ship with the next build.

GitHub Pages serves `.well-known/` fine. Note iOS wants the AASA served as
`application/json`; GitHub Pages serves extensionless files as
`application/octet-stream`, which modern iOS still accepts for association.

---

## 1. iOS — `apple-app-site-association`  (no `.json` extension)

Needs your **Apple Team ID** (10 chars, Apple Developer → Membership) and the
app's **bundle identifier**. App Store ID is `6759269080`; bundle is most likely
`com.apexwizard.app` — confirm in Xcode / App Store Connect.

```json
{
  "applinks": {
    "details": [
      {
        "appIDs": ["TEAMID.com.apexwizard.app"],
        "components": [
          { "/": "/setup/*" },
          { "/": "/guides/*" },
          { "/": "/tuning-guide" },
          { "/": "/" }
        ]
      }
    ]
  }
}
```

Replace `TEAMID` (and the bundle id if different). Requires the Associated
Domains capability (`applinks:apex-wizard.com`, `applinks:www.apex-wizard.com`)
in the iOS app.

## 2. Android — `assetlinks.json`

Needs the **SHA-256 fingerprint of the app-signing certificate**. With Google
Play App Signing this is the *App signing key* in **Play Console → Test and
release → App integrity → App signing** — NOT your local upload keystore
(`Apex Wizard.jks`), whose fingerprint will not match production.

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.apexwizard.app",
      "sha256_cert_fingerprints": ["AA:BB:CC:...:99"]
    }
  }
]
```

The Android app needs matching `<intent-filter android:autoVerify="true">`
entries for `https://www.apex-wizard.com` (and the apex domain).
