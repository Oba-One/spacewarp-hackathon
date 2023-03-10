mergeInto(LibraryManager.library, {

  // Create a new function with the same name as
  // the event listeners name and make sure the
  // parameters match as well.

  GameCode: function(code) {
    // Within the function we're going to trigger
    // the event within the ReactUnityWebGL object
    // which is exposed by the library to the window.
    // https://answers.unity.com/questions/1504065/jslib-is-passing-string-as-number.html
    window.dispatchReactUnityEvent("GameCode", code);
  },

  GameStarted: function(code) {
    // Within the function we're going to trigger
    // the event within the ReactUnityWebGL object
    // which is exposed by the library to the window.
    // https://answers.unity.com/questions/1504065/jslib-is-passing-string-as-number.html
    window.dispatchReactUnityEvent("GameStarted");
  },

  GameEnded: function(code) {
    // Within the function we're going to trigger
    // the event within the ReactUnityWebGL object
    // which is exposed by the library to the window.
    // https://answers.unity.com/questions/1504065/jslib-is-passing-string-as-number.html
    window.dispatchReactUnityEvent("GameEnded");
  },

  DemoUnityToReact: function(busStr) {
    // Within the function we're going to trigger
    // the event within the ReactUnityWebGL object
    // which is exposed by the library to the window.
    // https://answers.unity.com/questions/1504065/jslib-is-passing-string-as-number.html
    ReactUnityWebGL.DemoUnityToReact(Pointer_stringify(busStr));
  }
})