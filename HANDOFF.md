# Owner handoff

## Ready to review
The design and selected menu are implemented. The Sites version remains owner-private. The GitHub export is portable and has no hosting account dependency. GitHub has not been updated automatically: upload the new ZIP contents to your repository.

## Business inputs still needed
- Current complete in-store menu, sizes, prices, hours, ingredients and dietary labels. Displayed prices are selected DoorDash listings, not verified in-store prices. Seasonal offerings need reconfirmation before the public launch.
- Actual café footage: ideally 3 short clips (espresso pouring, pastry preparation, passing a cup) in landscape format. No video was retrieved or fabricated. A finished café film is not included.
- Confirm reuse of the café and family photos or supply owner-approved replacements. Public articles supplied the current photos, with credits; no explicit reuse license was found.
- Domain name and access to its DNS settings, plus the owner's preferred hosting/account arrangement. No domain was purchased, connected or transferred.

## Add the café film when supplied
Use a compressed MP4 with a poster image. Place it beside index.html. Replace the hero image with a video element using controls, playsinline, preload="metadata", poster="cafe.jpg", and a source element pointing to the actual file. Do not autoplay audio. Include captions if it has speech. Keep the surrounding figure, and adapt the .hero-image img styles to include video. The current photograph is the complete fallback presentation, not a fake video player.

## Opening animation
The opening runs on every refresh (no session storage). intro.js controls the 2300 ms title duration and 950 ms exit cleanup. The CSS transition is 0.9 seconds. Reduced-motion settings skip the takeover. Skip or Escape returns immediately to the website. If the scripts fail, the page remains available.

## Routine updates
1. Edit the menu articles in index.html. Update the seasonal feature at the same time.
2. Confirm the address, phone, external ordering link and structured data agree.
3. Keep photo credits when using the current supplied press images.
4. Upload changed files to GitHub and review the resulting deployment.
5. Use browser/device checks on narrow mobile, desktop, keyboard navigation, and reduced-motion settings before the final business launch.

## Domain ownership
For a client handoff, have the business own its domain and hosting/repository accounts. Add collaborators as needed instead of sharing account passwords. Configure the domain in the chosen host, then apply that host's exact DNS records through the registrar. Do not guess DNS records or change email-related records. Confirm HTTPS and redirects after propagation.
GitHub domain guide: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

## Scope for a client proposal
Include design/content revisions, verified business information, mobile review, launch assistance and owner training. Define the number of revision rounds and support period in the actual agreement; no commercial promises or recurring support obligations have been established by this prototype.

## Checks completed
JavaScript syntax; menu category switching and keyboard navigation in a simulated DOM; reduced-motion initialization; local image/script references; anchor targets; single visible Facebook link; ZIP integrity. No browser visual QA was run in this session.
