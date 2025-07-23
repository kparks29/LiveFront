# LiveFront Interview Application

This is a React application designed to display a list of concert and theater events, view them on a map, and link to purchase tickets.

## Table of Contents

* [Setup/Installation](#setupinstallation)
* [How to Run Your Application](#how-to-run-your-application)
* [Live Deployment](#live-deployment)
* [Key Architectural Decisions and Trade-offs](#key-architectural-decisions-and-trade-offs)
* [What You Would Add/Improve with More Time](#what-you-would-addimprove-with-more-time)
* [Assumptions Made](#assumptions-made)

## Setup/Installation

To set up and install the project, follow these steps:

1.  **Install pnpm (if you don't have it):**
    This project uses `pnpm` as its package manager, which is generally faster and more disk-space efficient than `npm` or `yarn`. If you don't have `pnpm` installed globally, you can install it using `npm`:
    ```bash
    npm install -g pnpm
    ```

2.  **Clone the repository:**
    ```bash
    git clone https://github.com/kparks29/LiveFront.git
    # Or using SSH:
    # git clone git@github.com:kparks29/LiveFront.git
    # cd into directory
    ```

3.  **Install dependencies using pnpm:**
    ```bash
    pnpm install
    ```

## How to Run Your Application

Once the dependencies are installed, you can run the application:

1.  **Start the development server:**
    ```bash
    pnpm dev
    ```
    This will typically start the application on `http://localhost:5173` (or another available port).

2.  **Open your browser** and navigate to the displayed URL to view the application.

## Live Deployment

The application is deployed and can be accessed live at:

[https://live-front.vercel.app/](https://live-front.vercel.app/)

## Key Architectural Decisions and Trade-offs

* **React with TypeScript:**
    * **Decision:** Using React for a component-based UI and TypeScript for type safety.
    * **Trade-offs:** Adds a build step and a learning curve for developers new to React/TypeScript, but significantly improves code quality, maintainability, and developer experience for larger applications.  Can also increase development time.

* **Vite as Build Tool:**
    * **Decision:** Opted for Vite for its fast development server and optimized build process.
    * **Trade-offs:** While generally superior to older build tools, it might require specific configurations for complex setups or older browser support, though for a modern React app, it's an excellent choice.

* **Tailwind CSS:**
    * **Decision:** Employed Tailwind CSS for utility-first styling.
    * **Trade-offs:** Initial setup can be slightly more involved than traditional CSS, and it requires learning Tailwind's class names. However, it promotes rapid UI development, consistency, and highly optimized CSS bundles.
    Would be good to compliment this with a robust UI library like DaisyUI

* **React Query for Data Fetching and Caching:**
    * **Decision:** Utilized `@tanstack/react-query` for managing server state, including data fetching, caching, synchronization, and error handling.
    * **Trade-offs:** Introduces an additional library and concepts (queries, mutations, invalidation), which can be overkill for very simple applications. For an app dealing with external data, it vastly simplifies state management and improves performance by reducing unnecessary network requests.

* **React Leaflet for Map Integration:**
    * **Decision:** Used `react-leaflet` to integrate interactive maps, displaying resource locations.
    * **Trade-offs:** Relies on the Leaflet library, which might have a steeper learning curve for advanced map customizations compared to simpler map components. However, it provides a robust and flexible mapping solution.

* **Browser Geolocation API:**
    * **Decision:** Used the browser's native Geolocation API to get the user's current location to get local events.
    * **Trade-offs:** Requires user permission, and location accuracy can vary. It's suitable for a client-side application but might not be ideal for applications requiring precise or continuous location tracking without a backend.

* **Ticketmaster API:**
    * **Decision:** Used Ticketmaster's discovery API to get local concert and theater events.
    * **Trade-offs:** Requires api key and location information. Not all entries are uniform requiring much more validation of data coming from the API.  Rate limits with the free tier started becoming an issue during development with cache turned off.

## What You Would Add/Improve with More Time

* **Search and Filtering:** Diving deeper into Ticketmaster's api to be able to build out a Search, Filter, and Pagination features.  This would allow for an overall better user experience.
    * Search directly for event you are looking for
    * Filter by Date, Location, of Genre

* **Dropdown for Additional Filters:** Implement a "More Filters" dropdown to enhance filtering capabilities. This will allow users to access and apply additional filtering options beyond the primary ones, improving usability without cluttering the main interface.

* **Accessibility (A11y) Improvements:** Conduct a thorough accessibility audit using tools like Lighthouse and Axe.

* **Performance Optimizations:**
    * **Virtualization for Long Lists:** For the resource list, if the number of resources grows significantly, implement list virtualization (e.g., `react-window` or `react-virtualized`) to render only visible items, improving scrolling performance.
    * **Image Optimization:** If resources included images, optimize them for web delivery (e.g., lazy loading, responsive images).

* **Detailed Resource View:** Expand the data available for the detail page such as Artist's socials, list of other show times, etc.

* **Testing:** Implemented some of the testing suite, but with more time would fully test out rest of components built.

* **Resource Data Structure:** Assumed an inconsistant structure for the `EventDto` object, leading to a much more complex validation.  Would want to implement a more robust system to handle this better.  Implement some functional programming concepts such as Optionals and Eithers to help with this.  Perhaps this would also be a good example of using a GraphQL approach for this API if supported instead.

* **Maintain Scroll Position:** Implemented a load more items, however the scroll position gets lost.  I would love to figure out why this is being triggered so that I can improve the user's experience.
