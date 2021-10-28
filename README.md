<div id="top"></div>


<!-- PROJECT SHIELDS -->
<!--
*** This layout reused from an other project Sebastian has created. 
*** Sebastian is the author of the original version with some inspiration from the web.
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://gitlab.stud.idi.ntnu.no/it2810-h21/team-38/prosjekt-3">
    <img src="docs/logo.svg" alt="Logo" width="280" height="280">
  </a>

<h3 align="center">Project 3</h3>

  <p align="center">
    The second group project created by team 38. A group of four members. 
    <br />
    <a href="https://gitlab.stud.idi.ntnu.no/it2810-h21/team-38/prosjekt-3"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://gitlab.stud.idi.ntnu.no/it2810-h21/team-38/prosjekt-3/-/issues">Issues</a>
    ·
    <a href="https://gitlab.stud.idi.ntnu.no/it2810-h21/team-38/prosjekt-3/-/commits/master">Commits</a>
    ·
    <a href="https://gitlab.stud.idi.ntnu.no/it2810-h21/team-38/prosjekt-3/-/wikis/home">Wiki</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#starting">Starting</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

This project is created by Alexander, Iver, Sebastian and Victoria. The final result is based of requirement from the project description. By using Apollo server, MongoDB, react and other features is the final result what you are whatcing right now. Victoria has been the chief development manager during the project.
<div align="right">(<a href="#top">back to top</a>)</div>



### Built With

* [React.js](https://reactjs.org/)
* [Angular](https://angular.io/)
* [GraphQL](https://www.apollographql.com/docs/)
* [BMongoDB](https://www.mongodb.com)
* [JQuery](https://jquery.com)
* [Node.js](https://node.com)

### Decisions related frontend 

### Decisions related backend
Backend is coded with typescript. As we rapidly used components within multiple elements was it necessary to make it clear what type we were dealing with when reusing an variable or component. While JavaScript works with _any_ type would TypeScript serve the specific type. 
Both query and mutation was appropriate for this project as both registration and new posts are functions creating new data. Query, however, were, more rapidly taken in use as more getters of element already excisting appeared. In the util folder were two validator files created. The first one, validators.tsx, is created to validate registration and login to prevent illegal inputs, as well as confirming that a username exists and the password is correct. The second validator file, validateAuth, is to validate if the user has authorization to create a new reviewe of movies. 

Resolvers, where queries and mutations are found, is the folder with most logics in backend. We did discuss for a while if we shoudl create a resolvers folder and divide the code. The final decission ended to not use this approache. We decided the resolvers code was just about the propper size to not be divided. Beside, it is easier to work the one folder even though a folder would challenged us.

### Chosen API

<div align="right">(<a href="#top">back to top</a>)</div>



<!-- GETTING STARTED -->
## Getting Started

In order to set up the project locally, please follow given steps. 

### Prerequisites
Install correct node version through your terminal.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://gitlab.stud.idi.ntnu.no/it2810-h21/team-38/prosjekt-3.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

### Starting
</br>

#### Run backend

1. Navigate to backend
   ```sh
   cd backend
   ```
2. Run backend
   ```sh
   npm start
   ```

#### Run frontend
1. Open a new terminal

2. Navigate to frontend 
  ```sh
   cd ../frontend
   ```
3. Run frontend 
  ```sh
   npm start
   ```

<div align="right">(<a href="#top">back to top</a>)</div>



<!-- USAGE EXAMPLES -->
## Usage

The product is a movie database. By typing in the searching bar could users search for specific movies. If users aren't entirely sure which movie to look for is the filter feature a possibility. Genre, year of production and actors are all variables to choose from.  


_For more info, please refere to [Documentation](https://gitlab.stud.idi.ntnu.no/it2810-h21/team-38/prosjekt-3/docs)_

<div align="right">(<a href="#top">back to top</a>)</div>


<!-- LICENSE -->
## License

Distributed under the TEAM 38 License. See [LICENSE](https://gitlab.stud.idi.ntnu.no/it2810-h21/team-38/prosjekt-3/docs/LICENSE.txt) for more information.

<div align="right">(<a href="#top">back to top</a>)</div>



<!-- CONTACT -->
## Contact

Victoria - [@github_](https://github.com/) - email@stud.ntnu.no

Alexander - [@github_](https://github.com/) - email@stud.ntnu.no

Sebastian - [@github_nazgul735](https://github.com/nazgul735) - sebasv@stud.ntnu.no

Iver - [@github_](https://github.com/) - email@stud.ntnu.no

Project Link: [Team 38](https://gitlab.stud.idi.ntnu.no/it2810-h21/team-38)

<div align="right">(<a href="#top">back to top</a>)</div>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Apollo documentation](https://www.apollographql.com/docs/)
* [MongoDB documentation](https://docs.mongodb.com/)
* [hidjou Github](https://github.com/hidjou/classsed-graphql-mern-apollo/tree/master)
* []()
* []()
* []()
* []()
<div align="right">(<a href="#top">back to top</a>)</div>

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<div align="center">
  <a href="https://gitlab.stud.idi.ntnu.no/it2810-h21/team-38/prosjekt-3">
    <img src="docs/logo.svg" alt="Logo" width="280" height="280">
  </a>

<h3 align="center">Group 38</h3>
</div>
