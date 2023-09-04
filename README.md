
⚠️**THIS PROJECT IS LOOKING FOR A MAINTAINER**⚠️


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

## Demos

Showcases the small dialog collection included in this repository as examples :

https://rlemaigre.github.io/vue3-promise-dialog/

A Vite + Vue 3 + Typescript project on Stackblitz featuring a confirm dialog which is probably the simplest use case of the library :

https://stackblitz.com/edit/vitejs-vite-nzzfdg?&terminal=dev

## Introduction

### Dialogs the usual way

If you need to use a dialog in a parent component, you usually do it by altering its script and template, something
along those lines :

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
* There is no symmetry between requesting data from the user and from the server, yet it is the same kind of
  asynchronous process that yields a value.
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

Using promises, opening a confirm dialog (for example) is as simple as this :

```javascript
let ok = await confirm('Are you sure you want to do this ?');
if (ok) {
    // Do something
}
```

The promise resolves to the value the user entered into the dialog when it is closed.

That approach has several advantages :

* It is concise.
* A dialog can be opened from a parent Vue component, or from any JS/TS file. It's just a function call.
* There is a pleasing symmetry between requesting data from the user and from the server.
* No need to alter the code of a parent component to accommodate for the presence of the dialog.
* A parent component can use many dialogs without becoming a mess.

## Content of this repository

You may be familiar with the following Vue 2 project : [vue-modal-dialog](https://github.com/hjkcai/vue-modal-dialogs).
Unfortunately it hasn't been ported to Vue 3. This repository demonstrates how the basic functionality of that project
can be easily recovered in Vue 3.

## Directory structure

The core functionality is in the `lib` folder.

An example of a small dialog collection built upon the core functionality is in the `src/dialogs` folder. It is not
published on NPM since it is dependent on PrimeVue (for buttons and text fields) which you may not be using and the look
and feel you may be aiming for for your own dialogs may differ. Use it as inspiration to build your own dialog
collection.

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

### Dialog

A dialog is just a standard component that may be transitioned into view. It may be a simple div that you center with
position: fixed. You may add a dark overlay below it to make the div stand out. Whatever. To animate the dialog
appearance and disappearance, use the CSS class names applied by Vue according to the name of the transition defined by
DialogWrapper (`dialog` in my example, so `dialog-enter-from`, `dialog-leave-to` and so on).

### Opening dialogs

To open a dialog X passing it some props, call `openDialog(X, props)`. The function will return a promise that will
resolve when the dialog is closed.

```typescript
let result = await openDialog(MyDialog, myProps);
```

If you wish to make the call more user-friendly, you may wrap the openDialog function call into another function that hides the details of the dialog component in use. For example, to open a confirm dialog, you may define a `confirm` function :

```typescript
export async function confirm(text: string) {
    return await openDialog(ConfirmDialog, {text});
}

let ok = await confirm("Are you sure ?");
```

### Closing dialogs

Your dialog must define a `returnValue` function. You may do so either in the setup function using Composition API or as
a method using Options API. To close the dialog, call `resolveDialog()`. When you do so, the promise will resolve to the
result of the `returnValue` function. You may also resolve the promise to something else (for example null) by passing a
value to `resolveDialog()`. 

Alertnatively, you can call `rejectDialog()`. This will throw a `DismissedDialog` error (you can also pass your own error as an argument),
meaning your promise won't be resolved, but rejected. As a result, the dialog will be closed as well.

### Typescript

The `openDialog` function will infer the types of the props and the return type from the component definition. It is
type safe. Your IDE will complain if you pass in a wrong prop or assign the result to a variable of the wrong type.

### Usage with script setup
If using <script setup> it is necessary to expose the returnValue function in the following way.

```typescript
defineExpose({
    returnValue: () => { return true },
});
```

## Dialog collection

Although none of this is published on NPM for reasons mentioned above, this section describes briefly the few dialogs
that serve as test case for this project.

### Box.vue

The Box.vue component defines the look and feel of all dialogs : a white div centered with a dark overlay background. It
also defines the way dialogs transition in and out of view, with a fade-in effect for the background and a scale effect
for the centered div. It has one slot which is the content of the centered div.

### OkCancelBox.vue

The OkCancelBox.vue component is a Box that serves as base for all dialogs that include OK and CANCEL buttons. It has
two slots : `header` and `body`. Body is where the controls of the dialog reside. It has a `valid` prop. If `valid` is
false, the OK button is disabled. The whole thing is included into a `form` tag so that hitting enter when a control has
focus triggers a click on the OK button. When OK is clicked, `resolveDialog` is called.
When CANCEL is clicked, `resolveDialog` is called with a null return value.

### ConfirmDialog.vue

A ConfirmDialog is an OkCancelBox with a label and a `returnValue` function that returns always true. So the promise
resolves to true if the user clicks OK and to null if the use clicks CANCEL.

### TextDialog.vue

A TextBox is an OkCancelBox with a text field and a `returnValue` function that returns the content of the text field.
If the text field is empty, the valid prop is set to false on OkCancelBox.
