// We are bringing in the React library.
// Without this, we can't write React code like JSX (which looks like HTML inside JavaScript).
import React from 'react'

// Now we are creating a new *function* called Create.
// Think of this function as a custom block of code that tells React what to show on the screen.
function Create() {

  // What should be shown when someone uses this Create component?
  // The answer is: return a <div> element with the word “Create” inside it.
  // <div> is like a box or container in HTML. We are writing this in JSX.
  // So when this component appears on screen, it will literally show: Create
  return (
    <div>Create</div>
  )
}

// Now we are making this Create function available for use in other files.
// If this line were missing, we wouldn’t be able to use <Create /> elsewhere in the app.
export default Create
