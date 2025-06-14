// First, we import React — without this, we can't write or use any React components.
import React from 'react'

// We're defining a React functional component called "Main". Think of it like a small Lego block
// that builds a piece of the page.
function Main() {
  // This component will return some UI — what's visible on screen
  return (
    // This outer div is like the container or boundary of our section.
    // It uses Tailwind CSS classes to style it:
    // - lg:mt-8 → adds top margin on large screens.
    // - bg-white → gives it a white background.
    // - grid grid-cols-1 → turns it into a grid with one column by default.
    // - px-8 pt-6 → horizontal padding of 8, top padding of 6.
    // - xl:grid-cols-3 → on extra large screens, it becomes a 3-column grid.
    // - xl:gap-4 → gap between grid items when in extra large screens.
    <div className="lg:mt-8 bg-white grid grid-cols-1 px-8 pt-6 xl:grid-cols-3 xl:gap-4">
    
      {/* Inner wrapper inside the grid — this holds the alert box.
          It stretches across all columns on extra large screens using col-span-full.
          And adds a bottom margin (mb-4 by default, xl:mb-2 on XL screens). */}
      <div className="mb-4 col-span-full xl:mb-2">

        {/* --------- Here begins the alert content block --------- */}

        {/* This alert box tells users they need to log in.
            It uses classes to make it look like a red warning box:
            - flex → lays out items in a row.
            - items-center → aligns things vertically in the center.
            - p-4 → padding around everything inside.
            - mb-4 → margin below.
            - text-sm text-red-800 → small, red text.
            - rounded-lg → rounded corners.
            - bg-red-50 → light red background.
            role="alert" → for accessibility, it signals to screen readers this is an alert. */}
        <div class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">

          {/* This SVG is the warning icon — a small symbol to catch attention.
              Think of it like an exclamation mark or traffic light.
              It has fixed size (w-4 h-4), spacing to the right (me-3), and shrinks if needed. */}
          <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" 
               xmlns="http://www.w3.org/2000/svg" fill="currentColor" 
               viewBox="0 0 20 20">
            {/* The shape inside the icon is drawn using this 'path' line.
                It gives the icon its form — a circle and exclamation mark. */}
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>

          {/* This span is invisible visually but helps screen readers know this is 'Info'. */}
          <span class="sr-only">Info</span>

          {/* This is the main message shown to the user.
              - span with font-medium makes the first part bold.
              - rest is a normal sentence telling the user to login and share a video. */}
          <div>
            <span class="font-medium">Login alert!</span> Please login your account and share your video.
          </div>

        </div>

        {/* --------- Alert content ends here --------- */}

      </div>
    </div> // Closes the outer container
  )
}

// We export this component so other parts of our app can import and use it.
export default Main
