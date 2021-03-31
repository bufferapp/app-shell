# @bufferapp/app-shell

Buffer's shared App Shell for our front-end applications. 🚀

## Installation

```bash
npm install @bufferapp/app-shell
```


## Usage

🚩 **You should be able to drop this component into your apps, replacing the old AppShell.**

```jsx
// ❌ Change this
import AppShell from '@bufferapp/ui/AppShell';

// ❌ Or this
import { AppShell } from '@bufferapp/ui';

// ✅ To this
import AppShell from '@bufferapp/app-shell';
```

There are no API or breaking changes.

For now, refer to [the old documentation for `@bufferapp/ui/AppShell`](https://bufferapp.github.io/ui/#/ui/ui/appshell) until we migrate docs here.

## Using the Plan Selector in your apps

1. Hash in the URL:
To use the plan selector or payment method modal with a hash in the URL, include #planSelector or #paymentMethod on the URL. This will open the desired modal on page load

2. Using Modal context:
To open the modal from a CTA, use the Modal Context and on click, execute the openModal function from the modal context, like this:
```
import { ModalContext, MODALS } from '@bufferapp/app-shell';

const ModalTesting = () => (
  <ModalContext.Consumer>
    {modal => (
      <button onClick={
        () => {modal.openModal(MODALS.paymentMethod, { cta: 'Render Modal', isUpgradeIntent: false })}
      }>Render Modal</button>
    )}
  </ModalContext.Consumer>
)
```
#### Using CTAs for tracking
In the method above, you'll notice that openModal accepts an object as a second paramater. The cta property is used for tracking. Use it when possible to allow for accurate tracking in Segment

#### Using intentions
Some places in our apps, the user's intent is to upgrade from Trial or from Free. For that, we only want to show 2 plan options (Individual and Team) instead of 3. For these CTAs, pass in `isUpgradeIntent : true` as part of the second paramater in openModal:
```
<button onClick={
    () => {modal.openModal(MODALS.paymentMethod, { cta: 'Upgrade', isUpgradeIntent: true })}
  }>
  Upgrade
</button>
```

## Contributing

* Clone this repo and make your changes.

```
git clone git@github.com:bufferapp/app-shell.git
```

* Ensure your editor is setup for ESLint and Prettier.
* Make and test your changes locally (docs for this TBD, contact @hamstu in the meantime).
* Make a pull request and have it reviewed and merged into `main`.
* Now, from the `main` branch:
  * `git pull`
  * if you're not in `packages/app-shell` cd your way there
  * `npm run build`
  * Update [CHANGELOG.md](/CHANGELOG.md)
  * `npm version [patch|minor|major]` - pick one depending on type of changes
  * `git push origin main` - push changes to GitHub
  * `npm publish` - publish the new version to NPM

## Local development

- You will need to run the API Gateway and login services on `buffer-dev`: `./dev up api-gateway login`
- Run `yarn watch` in this root directory
  -  This will watch for changes on both packages: the `app-shell` and the test `app`, and will render the test app in https://appshell.local.buffer.com:3000.
- In the near future, we'll also add some Storybook to be able to render parts of the AppShell (or all of it) in isolation from any other logic so that we can focus purely on UI development (setup TBD).

### Troubleshooting

If you spot any issues with your local setup, ping @msanroman any time!

#### TypeError: Cannot read property 'account' of undefined

![https://cln.sh/fwcvzd](https://cleanshot-cloud-fra.s3.eu-central-1.amazonaws.com/media/4280/aZROl1zdvDW8L1MGQ00AOVPG7DVN4X4H1v0S4jXP.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDGV1LWNlbnRyYWwtMSJHMEUCIQCfVQXNg0l1UunpBKOdNFXhh8oIDlGYScM7RjNW1vsCjwIgB9fmpqKH1HojKoGvdzrPCGf6QKH1TCihhyNtxQQ18GIq4gEIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw5MTk1MTQ0OTE2NzQiDBqmpcht5iL6j%2F5EyCq2ATTVO4tG4%2FgfUDyuRZX0DjE%2FQD%2FTcHslztoJ2xsbUpqCWk4ludx5dx%2F6y90OUvjtE62TwoAXFV%2F0jEq26uE3lQAMjoygG42XWdT5cS7LOd%2BturaTc2rVSKzQBkxTq2ktUKzyyZPwqOn%2BKCxowz7T43OoOQ%2FEj%2FXO5b5M2zjq8qR%2BW4raHffwiz7S6D7MOK14ARKCMEWulOKltJtqe5MPWb%2B1JuL30R3u10V36epjF%2BOBVMB%2FMytSMOqkwIEGOuABnCkPaJQZXOoP9AQ%2BFZvqRqeWqTwO6woGkvOB1oC6A7RF2U601mUl6sA4%2BRc74bfopBDTbKvDXVuCgz7ECp5XrEQ1lJbsXJjxHiAI4HULNmxjh4Nxf4GUEsK%2BaZjzO0zGc7TrxKUt%2BUHAFLph%2Bo%2F%2FvJFsembdOsdnVXJYsf%2FHQU3hWMeJzuyvWpt1nHyQp5sUPqOGFLsVj2II0%2F2gkmf%2FrAty8U9ylmV6BUtyfjhPVXbj%2B%2FZgVxyhVxFMAFlNCwwUuQgal1xwHnxnRL%2BWpPWPT61SjhSDtiiALmpfAXlSjWM%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5MF2VVMNOJHXCA5D%2F20210219%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20210219T210422Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=824251448427a3f4afc7c1e10f85c279811000948894c7e78d250f4d0a8c3113)

This is likely a local session issue. Heading to https://login.local.buffer.com and signing up should make it work!

#### I get a DNS_PROBE_FINISHED_NXDOMAIN when trying to load https://appshell.local.buffer.com:3000

This is likely that you don't have the domain on your `/etc/hosts` file. Updating your `buffer-dev-config` setup and running `./dev up` again should 
fix it!
