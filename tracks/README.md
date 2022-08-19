# React Native Elements
Install
`npm install react-native-elements`

[read react native elements doc](https://reactnativeelements.com/docs/)

react native elements can also be used for icons insertions

# Async Storage
Install:
`npm install @react-native-async-storage/async-storage`
Import: import AsyncStorage from '@react-native-async-storage/async-storage'

# why `error message: ''` was used for `case 'signup'` instead of ...state,
Let's imagine a case where a user tries to sign up and maybe they put in some invalid email and we end

up showing an error message to them.

So our error message piece of state would be defined as some error message.

When a user then signs up, we probably don't want to have an error message anymore.

Now, of course, we probably won't be showing the user the form that would display the error message.

Nonetheless, if the user then logged out of our application and went back to that signup form, they

would still see an error message.

So in other words, I think that when a user signs up, we really just need to essentially reset our

entire state object and say, okay, we've signed up.

So here's the token and we should no longer have an error message.

So we don't really need to persist or carry through any values from the current state object.

We really just want to completely rebuild the state object from scratch.

So when a user signs up, I'm going to zero out my error message.

So I'll say Error message is empty string and I'll set my token.

And that's it.


# Installing React Native Maps
`npx expo-cli install react-native-maps`