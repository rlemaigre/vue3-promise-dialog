# vue3-promise-dialog

Dialogs meet promises in Vue 3 !

This project does not provide any dialogs. Rather, it makes it easy to create your own dialogs and work with them using
promises. The dialogs can be opened by calling a function that returns a promise and once the user enters data into the
dialog and closes it, the promise resolves with the data the user entered.

```typescript
let data = await openMyDialog();
```

## Installation

```
npm i vue3-promise-dialog
```

## Demo

https://rlemaigre.github.io/vue3-promise-dialog/

## Introduction

### Dialogs the usual way

If you need to use a dialog in a parent component, you do it by altering its script and template, something along those
lines :

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
* There is no symmetry between requesting data from the user and from the server, yet it is the same kind of asynchronous process that yields a value.
* Everywhere you need to use the dialog, you need to set up some logic in the parent component :
    * The dialog tag in the template
    * A ref that controls the dialog visibility
    * Callbacks that handle clicks on dialog buttons
* Things get nasty when a parent component needs to use several dialogs.

### Dialogs using promises

As we all know, requesting data from the server is an asynchronous process that is best handled with promises. For
example the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is a promise based API.

```javascript
let response = await fetch('http://example.com/movies.json');
```

Now, just like fetching data from the server, requesting data _from the user_ using a dialog is also an asynchronous
process that may complete with a value at some point in the future when the user closes the dialog. Why would the API to
fetch data from the user be any different than the API to fetch data from the server ?

Opening a confirm dialog using that pattern is as simple as this :

```javascript
let ok = await confirm('Are you sure you want to do this ?');
if (ok) {
    // Do something
}
```

You open the dialog by calling a function that returns a promise. The promise resolves to the value the user entered
into the dialog when it is closed.

That approach has several advantages :

* It is concise.
* A dialog can be opened from a parent Vue component, or not from any JS/TS file. It's just a function call.
* There is symmetry between requesting data from the user and from the server.
* No need to alter the code of a parent component to accommodate for the presence of the dialog.
* A parent component can use many dialogs without becoming a mess.

## Content of this repository

You may be familiar with the following Vue 2 project : [vue-modal-dialog](https://github.com/hjkcai/vue-modal-dialogs).
Unfortunately it hasn't been ported to Vue 3. This repository demonstrates how the basic functionality of that project
can be easily recovered in Vue 3. The code is published on NPM but it is so simple (60 lines of code for the core
functionality !) you might as well copy paste it into your own project and customize it as you see fit.

## Directory structure

The core functionality is in the `lib` folder. There are only two small files : `lib.ts` and `DialogWrapper.vue`. These two
files are published on NPM.

An example of a small dialog collection built upon the core functionality is in the src/dialogs folder. It is not published
on NPM since it is dependent on PrimeVue component library which you may not be using and the look and feel you may be
aiming for for your own dialogs may differ. Use it as inspiration to build your own dialog collection.

## Using the library

### DialogWrapper

Your dialogs will open inside a `DialogWrapper` component. Include the `DialogWrapper` component at the root of your vue
app, after all other content. Internally `DialogWrapper` uses a transition tag to transition your dialogs in and out of
view. Use the `transitionAttrs` prop to control the transition : the value of that prop will be v-binded as is to the
transition tag inside the wrapper. So for example to set the name of the transition to `dialog`,
use `:transition-attrs="{name: 'dialog'}"`.

```html
<template>
  <div id="app">
    <!-- your content -->
    <DialogWrapper :transition-attrs="{name: 'dialog'}"/>
  </div>
</template>
```

### Opening dialogs

To turn your dialogs components into async functions that return promises, use `openDialogFunction` helper.

For example, suppose you have
a `TextBox` dialog, with a `label` prop that prompts the user for a text. This is how you may define the async function
that will open it :

```typescript
export const openTextDialog = openDialogFunction<{ label: string }, string>(TextBox);
```

Use the function like so whenever you want to open the dialog and await the result :

```typescript
let text = await openTextDialog({label: 'Please enter some text'})
```

If you think this isn't concise enough you may declare this additional function :

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






