// First, we bring in React to use its tools to make this component work
import React from 'react'

// We are creating a new building block called 'Like' that shows the liked videos
function Like() {
  return (
    // This is the outer container that holds everything. 
    // Think of it like a box on the screen where we will arrange the liked video section.
    <div className="lg:mt-8 bg-white grid grid-cols-1 px-8 pt-6 xl:grid-cols-3 xl:gap-4  ">
      
      {/* Inside the big box, we make a smaller box that takes up all the space in extra large screens */}
      <div className="mb-4 col-span-full xl:mb-2"> 
        
        {/* This is just a comment to tell the developer: 
            "Hey, what comes next is the actual visible part of the content." */}
        {/*-------------------content---------------------*/}

        {/* We now create a big bold text that says "Liked Video" */}
        {/* Let's break down the styles:
              - text-3xl: makes the text very big
              - font-black: makes the text very bold
              - text-gray-900: makes the text a dark gray color, like almost black */}
        <div className=' text-3xl font-black text-gray-900'>Liked Video</div>

        {/* Again a comment for the developer saying this ends the content area */}
        {/*-------------------content---------------------*/}
      </div>
    </div>
  )
}

// Finally, we make this Like component available to use in other parts of the app
export default Like
