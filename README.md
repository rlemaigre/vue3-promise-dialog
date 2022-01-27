# vue3-promise-dialog

Dialogs meet promises in Vue 3 !

## Installation

```
npm i vue3-promise-dialog
```

## Demo

https://rlemaigre.github.io/vue3-promise-dialog/

## Introduction

As we all know, requesting data from the server is an asynchronous process that is best handled with promises. For
example the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is a promise based API.

```javascript
let response = await fetch('http://example.com/movies.json');
```

Now, just like fetching data from the server, requesting data _from the user_ using a dialog is also an asynchronous
process that may complete with a value at some point in the future when the user closes the dialog. Why would the API to
fetch data from the user be any different than the API to fetch data from the server ?

Opening a confirm dialog box should then be as simple as this :

```javascript
let ok = await confirm('Are you sure you want to do this ?');
if (ok) {
    // Do something
}
```

Compare that to the usual approach to working with Dialogs :

```html

<template>
    <transition name="...">
        <ConfirmDialog v-if="show" @ok="onOk()" @cancel="onCancel()"></ConfirmDialog>
    </transition>
</template>
<script>
    // Set up a show ref, onOk and onCancel functions. Switch show to true to open the dialog.
</script>
```

That approach has several disadvantages :

* It is verbose.
* A dialog can only be opened from a parent Vue component, not from a JS/TS file.
* There is no symmetry between requesting data from the user and from the server.
* Everywhere you need to use the dialog, you need to set up some logic in the parent component :
    * The dialog tag in the template
    * A ref that controls the dialog visibility
    * Callbacks that handle clicks on dialog buttons
    * ...things get nasty when a parent component needs to use several dialogs.

## Content of this repository

You may be familiar with the following Vue 2 project : [vue-modal-dialog](https://github.com/hjkcai/vue-modal-dialogs).
Unfortunatly it hasn't been ported to Vue 3. This repository demonstrates how the basic functionality of that project
can be easily recovered in Vue 3. The code is published on NPM but it is so simple (60 lines of code for the core
functionality !) you might as well copy paste it in your own project and customize it as you see fit.

## Directory structure

The core functionality is in the lib folder. There are only two small files : lib.ts and DialogWrapper.vue. These two
files are published on NPM.

An example of a small dialog collection built upon the core functionality is in the dialogs folder. It is not published
on NPM since it is dependent on PrimeVue component library which you may not be using and the look and feel you may be
aiming for for your own dialogs may differ. Use it as inspiration to build your own dialog collection.

## Using the library

### DialogWrapper

Your dialogs will open inside a `DialogWrapper` component. Include the `DialogWrapper` component at the root of your vue
app, after all other content. Internally `DialogWrapper` uses a transition tag to transition your dialogs in and out of
view. Use the `transitionAttrs` prop to control the transition : the value of that prop will be v-binded as is to the
transition tag inside the wrapper. So for example to set the name of the transition to `dialog`,
use `:transition-attrs="{name: 'dialog'}"`.

### Opening dialogs

For each of your dialogs, you must define an async function that will transition the dialog into view, and return
whatever value the user entered. To do so, use the `openDialogFunction` helper. For example, suppose you have
a `TextBox` dialog, with a `label` prop that prompts the user for a text. This is how you may define the async function
that will open it :

```typescript
export const openTextDialog = openDialogFunction<{ label: string }, string>(TextBox);
```

Use the function like so whenever you want to open the dialog and await the result :

```typescript
let text = await openTextDialog({label: 'Please enter some text'})
```

You may further refine the process of opening a prompt by declaring this function :

```typescript
export async function promptText(label: string) {
    return await openTextDialog({label})
}
```

Use the function like so :

```typescript
let text = await promptText('Please enter some text');
```

### Closing dialogs

Inside your dialog components, you may call `closeDialog(...)` when you want to close the dialog and resolve the
promise. The promise will resolve with whatever value you passed to `closeDialog`.






