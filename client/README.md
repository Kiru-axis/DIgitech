# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0.

# Project Structure

## Layout

**components**

- Header
- Footer

## MODELS

- The basic requirement. Define models after layout.

**Why Customer & Profile Models**

- The customer model deals with the user cart,wishlist,compares,orders and checkout.

- The profile models deals with user general profile like updateUser,createAddress, updateAddress and delete Account.

## CORE

Defines the core parts of the applications that the app will use.

_All guards and interceptors are function based_

### Services

- core services to be used by the app. eg. AuthService

### Interceptors

- core interceptors to be used by the app. eg. jwtInterceptor,error interceptor

### Guards

- core guards to be used by the app. eg. roleGuard,authGuard

## SHARED

These are sharable structures used across the application.
There is only one barrel export for components,directives,pipes & services.
These prevents some unwanted behaviours i encountered on the browser. eg. stack overflow

### Components

#### UI

- **colors**
  Takes an array of colors from parent and creates a clickable button with the color id.
  The parent can know the color clicked by subsribing to an event.

- **Sliders**
  Handles all the slide functionality provided by the swiper directive.
  Ensures the slide functionality can be customized by the component that consumes it.
  These is possible by use of _NgTemplateOutlet_.

#### Controls

These are reusable formcontrols to speed up development.

- **form-group**
  Handles all the error msgs display and when to show them.

- **input**
  Universal control that handles all the input types.

- **textarea**
  Textarea to match the behaviour and feel of the application.

- **select**
  Takes props as {label:string,value:number|string|boolean}[] to handle multiple situations.

- **password**
  Deals with passwords and toggle password functionalities

- All controls use the **ControlValueAccessorDrective** in the directives folder of the controls to make them custom inputs.

#### Logic

These are smart components that can communicate with the store for specific data slices but are consumed by more than two components.

#### Products component

These component has sub components.
To understand the flow, start with:

- productDispatcher compoment
  displays a single product from an array of products gotten as inputs from either productsSlider or productCards components.

- productsSlider
  displays the products in slider format (swiper slides);

- productCards
  displays the products as cards (bootstrap cards).

### Countries

Static file with all the countries on the world for any select that needs them.

### Services

- **storage**
  These service deals with any matter regarding session storage.
  Chose session storage because it does not keep the state after browser closes, which felt ideal for things like tokens and auth.

### Icons

- All the icons the application needs.

### Pipes

- **timesince**
  These pipe takes in a date and returns the amount of time that has passed since the date input.

### Directives

- **swiperDirective**
  These directive deals with initialization of the the element its attached to with the DOM.
  The only thing the element needs is to pass its unique swiper config.

### Indicators

- These is module per se as it holds its service,component and interceptor.

- **loadService**
  Provides state for the loaderComponent to decide when to show and hide the loading indicator.

- **loadComponent**
  Generic component that detects route transitions and http calls to show the loading indicator.
  Its an **OPT OUT** since the indicator can be turned off for certain events/states.

- **loadInterceptor**
  Invokes the loaderService hide and show methods to toggle the loaderComponent during http calls.

### Utils

- These are regex and regex messages related to reactive forms validation.
- The form.ts handles any form submission with validation errors by highlighting the specific control

## PAGES

**Why Customer & Profile Pages**

- The customer page deals with the user cart,wishlist,compares,orders and checkout.

- The profile page deals with user general profile like updateUser,createAddress, updateAddress and delete Account.

### Auth

**components**

- Login
  flow: [login Action] in login component -> [Update State] in store/auth reducers -> [ Login Effect ] in store/auth effects -> [Login Service ] in core/services/authService -> [ XHRBackend ] makes the ajax call to server.

- Register
- Reset Password
- Forgot Password

**routes**
The lazy loaded routes of the auth pages.

### Static Pages

**Grouped**

- Policies
  **components**
- terms
- privacy
- shipping

## STORE

- NGRX store for state management.
- Each feature store exports actions, reducer and selectors using barrel export method.
- The exports are done on the feature store to ensure you get the actions and selectors you need from where you expect them to come from.

### Store Structure

- **feature.model.ts**
  Defines the structure of the store.

- **feature.actions.ts**
  Using _actionGroup()_ creates all feature actions

- **feature.reducer.ts**
  Using _createFeature()_ creates how the defined actions affects the store.
  _Selectors_ are created automatically with _createFeature_ based on feature model.
  _ExtraSelectors_ incase the app demands more selectors

- **feature.effects.ts**
  Functional effects using _createEffect()_
  When registering them in the appConfig, get the whole path to the effects or they wont register.
  ```ts
  <!-- app.config.ts -->
  import * as featureEffect from "./store/feature/feature.effects"
  ```
- **feature.index.ts**
  Barrel exports for the feature.
  Exports the selectors,actions and reducers to get the exact import you want.
  ```ts
  import { selectFeature, featureActions } from "./store/feature";
  import { selectFeature2, featureActions2 } from "./store/feature2";
  ```
