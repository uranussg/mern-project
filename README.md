# Theme Chat Room

[Theme Chat Room live](https://thegameroom100.herokuapp.com/#/)

During the COVID-19 quarantine it is important to have the ability to play board/card games remotely. OurApp provides channels/game rooms for users to play their favorite role playing games with live chat. OurApp is a minimal viable product that tackles the following challenges:

* Live Chat: Real time communication that feel instantaneous.  
* User can have freedom to chat with their friends and random users within game mode on the app.  
* Gives users the tools to create games with their friends. Custom card creation allows players personalize their game room and playing experience.   

OurApp is primarily built with the MERN stack, a combination of following four technologies: MongoDB, Express, React, and Node.

[Theme Chat Room live](frontend/public/readme_images/theme_example.png)

# Functionality & MVP

* User authorization: 
   * sign up and log in
   * each user can only join one game room at one time
* Live chat functionality 
  * can support multi rooms realize live chat functionality
* Game room
   * the game room is based on a live chat window
   * can toggle to display users list
   * A player can create game rooms that other players can join via a link
   * New players cannot join a game room after the game starts 
   * Creator of the game room will be the admin to submit which theme/name cards to use for the game. If the admin leaves the game, this role will be randomly assigned to another player
* Role play game mode
   * After the game starts, the game room name will be set to the theme of the game and each player's username will be set to his/her name card
   * The admin can choose a theme and the name cards from pre-set options, or create customized ones  
   * The name cards will be randomly distributed to each player. 
   * Still stay in game mode after hard refresh.
   
## Technologies & Technical Challenges
The main challenge of this website will be to facilitate fast and efficient communication between players across multiple different game rooms simultaneously. This is achieved using socket.io which will allow for two-way communication between the user's browser and the server. Another challenge is to share the role-distribution information to each user in the same room, as well as to update the information on time when there's user come in/out of the room. This is realized by combining the React's lifecycle methods and Socket.io  

### Backend: Node, Express, MongoDB
The backend will be responsible for keeping track of and storing game rooms, users, roles. Technical challenges include managing admin privileges in rooms, when to save and fetch the role-distribution information, and when to update the state of a room(in game or not in game)

### Frontend: React/Node.js 
The frontend will need to update the page every time a new message is typed into chat. It will also need to display all relevant information to the user and update that data in real time. Such as when another user leaves the room, the room state changes, or when the game starts/ends.

### Livechat
The application uesed socket.io to implement livechat. Challenges include figuring out how to incorporate socket.io with the mongo db backend.

### UI/UX
The user interface will need to fit all data pertaining to the room a user belongs to: including their role, the admin, what state the game is in, and a list of other users in the room along with their messages. The challenge will be to find ways to fit all this information on the page and still have it be easily readable and intuitive for the user viewing the page.

# Group Members 
**Jonathan Odom, Rakin Rouf, Skylar Zhu, Songge Sun**
