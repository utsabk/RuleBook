# Overview
RuleBook is an interactive, hyperlinked rulebook application for a card game. All the rules are extracted dynamically from [rules.txt.](https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt) and presented in a Table of Content, which makes it easier to navigate through each rules.

# App features
* Parse a text file (rulebook) into each indivisual rules.
* Fetch the rules and populate them in a TOC.
* A Table of Contents with a list of chapters.
* Hyperlinked chapters conataining rules/subrules.
* Search for a rule conataining a word/s



## Built With

- [Express.js](https://expressjs.com/) - Back end web applicaton framework for NodeJS.
- [REST API](https://restfulapi.net/) - Server that transfer to the client a representation of the state of the requested resource.
- [Vanilla JS](http://vanilla-js.com/) - JavaScript to maipulate DOM.


## Application Structure


```
backend
    │
    └─── controllers            #parse rulebook 
    └─── models                 #manage data,logic and rules   
    └─── routes                 #define the endpoints
    └─── index.js               #express app that listens to server port
    └─── .env                   #store all environment variables
    └─── package-lock.json      #npm auto-generated document
    └─── package.json           #holds metadata and npm packagage list
    └─── Procfile               #command to run app on heroku server

frontend
    │
    └─── public
        └─── css                #all css files
        └─── js                 #DOM manipulation
        └─── index.html         #static page for home page

```

<!-- GETTING STARTED -->
# Requirements
For development and production, you will need Node.js and npm, installed in your environement.

### Node
- #### Node installation

  Just go on [official Node.js website](https://nodejs.org/) and download the installer or use your linux distro specific package manager to download it.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

If the installation was successful, you should be able to run the following command.

    $ node --version

    $ npm --version
    

 # Getting started

### Clone

To get the Node server running locally.

```sh
git clone git@github.com:utsabk/RuleBook.git
cd RuleBook
```
### Set up the local environment
Create a new file named `.env` with this environment variables.

   For example:
```
PORT= port where the server is listening to e.g 3000
```

After that run this command on project path

```sh
$ npm install
$ npm start
```
Your app should now be running on [localhost:3000](http://localhost:3000/)

## Demo


- [Live App](https://rulebook21.herokuapp.com/)
