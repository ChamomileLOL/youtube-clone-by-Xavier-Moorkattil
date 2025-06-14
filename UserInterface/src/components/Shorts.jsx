// We're calling in the React library – this is the toolbox that lets us build components.
import React from 'react';

// We're crafting a visual card called 'Shorts'.
// Think of it like drawing a page that says, "Sorry, this area is under construction."
function Shorts() {

  // Returning the JSX (the HTML-like code React understands)
  return (
    // This outer <div> is like the main container – a big box wrapping everything inside.
    // It has some Tailwind CSS classes to make it look good: margin on top, white background, padding, and a grid layout.
    <div className="lg:mt-8 bg-white grid grid-cols-1 px-8 pt-6 xl:grid-cols-3 xl:gap-4">

      {/* This is a small box inside the big box. It spans the full width. */}
      <div className="mb-4 col-span-full xl:mb-2">

        {/* Title area */}
        {/* This is the main headline saying “Shorts” in big bold letters. */}
        <div className=' mb-7 text-3xl font-black text-gray-900'>
          Shorts
        </div>

        {/* This is the warning message box – like a yellow notice board saying "Access Denied." */}
        <div 
          className="bg-yellow-50 border border-yellow-200 text-sm text-yellow-800 rounded-lg p-4" 
          role="alert"
        >

          {/* This flexbox helps align the alert symbol and message horizontally */}
          <div className="flex">

            {/* This inner box is just for the alert icon – that little triangular warning symbol */}
            <div className="flex-shrink-0">

              {/* Here’s the SVG icon – it’s a triangle with an exclamation mark inside, like on road signs */}
              <svg
                className="flex-shrink-0 size-4 mt-0.5"  // Ensures it doesn't grow or shrink oddly
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Outer triangle path */}
                <path d="M21.73 18l-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                {/* Vertical line (exclamation mark line) */}
                <path d="M12 9v4"></path>
                {/* Bottom dot of exclamation mark */}
                <path d="M12 17h.01"></path>
              </svg>
            </div>

            {/* Now comes the text message next to the icon */}
            <div className="ms-4"> {/* "ms" means "margin start", so there's space before the text */}

              {/* Title of the warning */}
              <h3 className="text-sm font-semibold">
                Cannot access this page.
              </h3>

              {/* Detailed reason for the warning */}
              <div className="mt-1 text-sm text-yellow-700">
                The page is currently under maintenance.
              </div>

            </div> {/* End of text box */}

          </div> {/* End of flex row containing icon and text */}

        </div> {/* End of alert box */}

        {/* Done with the content zone */}
      </div>

    </div> // End of outer container
  );
}

// Finally, we export the Shorts component so it can be used elsewhere in our project
export default Shorts;
