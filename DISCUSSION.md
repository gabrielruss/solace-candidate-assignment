I would not normally put ADJUSTMENT or BUGFIX as a comment within the code, I put those there to point directly to the changes and my reasoning behind them. :)

I implemented pagination for fetching the advocates, but didn't have time to move the search functionality to the backend. Normally with large data sets I would have the search functionality on the backend in order to search all records in a speedy way. I understand that the current setup with pagination not loading in all records and therefore limiting what the user can filter with the search box doesn't make much real world sense. I also understand that if there were hundreds of thousands of advocates, that a "Load More" button might not be the best solution. Both of these were to save time. :)

I would have liked to make the page more responsive to fit down to a smaller screen size.

Accessibility would also be a top priority if this had been a real ticket.

I would have made the inputs and buttons more fleshed out with colors and borders for hover, focus, active, etc.

Table could be it's own reusable component assuming we will be using more than a few tables in the app.

The instructions noted that I could create as many PRs as I felt appropriate. I will be creating 1 under the assumption that this was a full stack ticket I was assigned.

I would fix the issue where the page jumps to the top when loading more for the pagination.

For the way the search works, I would work with UX and Product to figure out how the user would want to search for phone number and/or years experience. We could potentially have advanced search features that allowed you to specify which field to search on instead of the search box searching everything.

I would prefer to add a debounce to the searching function in order to avoid too many hits on the backend or shaky UI.

Full disclosure on the time, I did run over the 2 hour mark. The items I finished within that time are fixing the UI issues, adding the backend, and implementing the styling. I was having fun and wanted to add the pagination so I spent about an extra hour doing that. :)
