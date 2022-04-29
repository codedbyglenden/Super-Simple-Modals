<img alt="GitHub package.json version (subfolder of monorepo)" src="https://img.shields.io/github/package-json/v/TheOneAndOnlyZulu/Super-Simple-Modals"> <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/super-simple-modals" /> <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/super-simple-modals" />
[![JS & Style Lint](https://github.com/TheOneAndOnlyZulu/Super-Simple-Modals/actions/workflows/eslint.yml/badge.svg)](https://github.com/TheOneAndOnlyZulu/Super-Simple-Modals/actions/workflows/eslint.yml)
[![CodeQL](https://github.com/TheOneAndOnlyZulu/Super-Simple-Modals/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/TheOneAndOnlyZulu/Super-Simple-Modals/actions/workflows/codeql-analysis.yml)

# About Super Simple Modals

Super Simple Modals is a small Vanilla JavaScript library that does what it says on the tin. Allow you to create pop-up modals on your website in no time, with a tiny amount of code.

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/main/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/main/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/main/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/main/src/edge/edge_48x48.png) | 
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## Installing

Using npm:

```bash
$ npm install super-simple-modals
```

Using yarn:

```bash
$ yarn add super-simple-modals
```

Using unpkg CDN:

```html
<script src="https://unpkg.com/super-simple-modals"></script>
```

## Example

More code examples are available in the <a target="_blank" href="https://github.com/TheOneAndOnlyZulu/Super-Simple-Modals/tree/main/examples">examples directory</a> of the Github repo.

Initialise a basic modal 

```js
const modal = new SuperSimpleModal();

// Check if the open modal button exists.
const openModal = document.getElementById( 'open-modal' );
if ( openModal ) {
  openModal.addEventListener( 'click', (e) => {
    e.preventDefault();

    modal.generate({
      title: 'My modal title',
      description: 'My modal description...',
      initiatorButton: e.target,
      callback: possitiveAction,
      willAnimate: true,
    });
  });
}
```

## Objectives

This package aims to be:

- Fully accessible: Complying to the latest <a href="https://www.w3.org/TR/WCAG21/">WCAG guidelines</a>, to AAA standard.
- Lightweight: We known webiste load times are key, not only to the ranking of your site, but the user experience. Our package will always remain as small as possible, & never weigh you down.
- Contain minimilistic styling: Make it look how you want without adding `!important` to every line of you css. Overriding styling should be a doddle, though we will give you a guiding hand with examples.

## How do I make it work?

The <a href="https://github.com/TheOneAndOnlyZulu/Super-Simple-Modals/wiki">Github wiki</a> is where you'll find documentation for everything you'll need to know about working with & on this plugin should you want to add something that's missing.

## Help me, I'm stuck!

Read through the <a href="https://github.com/TheOneAndOnlyZulu/Super-Simple-Modals/wiki">wiki</a> and still can't get it to work? Pop over to the <a href="https://github.com/TheOneAndOnlyZulu/Super-Simple-Modals/discussions">discussions board</a>, and we'll give you a hand.

## I've got an idea?

Got ideas on how to improve this package, but not sure how to persue them? Head over to the <a href="https://github.com/TheOneAndOnlyZulu/Super-Simple-Modals/discussions">discussion section</a> of the repo, or if you've got the know how create a pull request. Sharing is caring.

