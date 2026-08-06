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

## 1. iOS — `apple-app-site-association`  (no `.json` extension)  ✅ WRITTEN

**Done** — `apple-app-site-association` is in this folder, filled with the real
values (found 2026-06-13 in the iOS Xcode project):
- Apple Team ID: `SLM3HUQCXT` (`DEVELOPMENT_TEAM`)
- Bundle id: `com.adriandokoza.IOS-nativ-Setup-Wizard` (NOT `com.apexwizard.app` —
  that earlier guess was wrong). App Store ID `6759269080`.
- The root `/` catch-all was intentionally dropped so marketing/legal/privacy
  links don't bounce into the app; only `/setup/*`, `/guides/*`, `/tuning-guide`
  deep-link. Widen later if you want whole-site claiming.

**The file is inert until the iOS app is configured for Universal Links** (the
app currently has neither). Remaining app-side work:
- Add the **Associated Domains** capability + entitlement
  `com.apple.developer.associated-domains` =
  `["applinks:apex-wizard.com", "applinks:www.apex-wizard.com"]`
  (and enable Associated Domains for the App ID in the Apple Developer portal).
- Handle incoming universal-link URLs in `ApexWizardApp.onOpenURL` and route
  `/setup/...`, `/guides/...`, `/tuning-guide` to the matching screens. Today
  `onOpenURL` only imports `.apexsetup` files.

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
