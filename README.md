# MovieNoms

A webpage that can search OMDB for movies, and allow the user to save 5 of their favourite films to nominate. When 5 nominees they are selected they can share a personal nomination page.

Simple to use interface that makes it easy to:

- Search OMDB and display the results (movies only)
- Add a movie from the search results to our nomination list
- View the list of films already nominated
- Remove a nominee from the nomination list

## Tech Stack

React

- Hooks used to manage state instead of using Redux
- CSS modules for keeping component styling more organized
- Deployed using netlify: [https://movienoms.netlify.app](https://movienoms.netlify.app)

### Application in Action

![Application in action](https://github.com/harrishs/movieNoms/blob/main/preview.gif)

## Requirements

1. Search results should come from OMDB's API.
2. Each search result should list at least its title, year of release and a button to nominate that film.
3. Updates to the search terms should update the result list
4. Movies in search results can be added and removed from the nomination list.
5. If a search result has already been nominated, disable its nominate button.
   Display a banner when the user has 5 nominations.

## Additional Features

- Responsive/ Mobile Friendly
- Persistant Nomination List Using LocalStorage (Saves nominations if user leaves page)
- Create shareable nomination link once 5 nominations are selected
- Pagination and additional messaging
