![Cowin Assist](images/header.png)

## Cowin Assist

Cowin Assist is a discord chat-bot that lets the user track the availability of covid vaccination centres in India via the [CoWin API](https://apisetu.gov.in/public/api/cowin#/). It has a bunch of commands through which the user can set/update their desired filters to receive up to date information regarding the vaccine centres.

### Features

The Cowin Assist lets you,

-   Add the discord bot to a server,
-   Register your district and age (just once, we'll save it for you),
-   Update your saved data if needed,
-   Check for the availability of a vaccine centre using the data provided,
-   Navigate to COWIN site if slot available,
-   Subscribe for an hourly update on open slots if available,

For detailed information regarding the slash commands check [this](src/commands/README.md) out.

### Team Members

1. [Irene Anna Kurien](https://github.com/irenekurien)
2. [Sidharth Ajithkumar](https://github.com/UKnowWhoIm)

### Team Id

**BFH/rech8NtakZf4vVdS5/2021**

### Link to product walkthrough

[Walkthrough](https://drive.google.com/file/d/1azeE2Qa9WF6BtvV06_4fke5SwPUOCXVf/view)

### How to add the bot to your server?

1. Ensure that you have the latest version of the discord client
2. Visit the **Cowin Assist Bot's** [website](https://cowin-discord-bot-1.uknowwhoim.repl.co/) and click on the **Add to server** button.
3. Then login or register with your discord server.
4. After logging in, select the server from the list where you wish to display the Bot.
5. Provide authorization for the Bot to regulate and control your discord server.
6. Check the **Add the bot to a server** and press the **Authorize** option.


### Libraries Used

- Discord.js - 12.5.3
- Mongoose - 5.12.10

### Stacks Used

- Nodejs
- MongoDB

### How to configure

1. Go to [discord developer portal](https://discord.com/developers/applications), and create a new application and a new bot in it.
2. In the OAuth2 section, goto url generator and choose bot and applications.commands scope, then choose Send Messages and Read Message History Permissions in the permissions section.
3. Copy and run the url generated in a browser to add the bot to your server.
4. Clone the repo by running `git clone https://github.com/UKnowWhoIm/cowin-discord-bot.git`
5. Setup the environment file, with the help of `.env.example`.

### Workflow

For detailed understanding of the working of the project refer the [flowchart](images/flowchart.jpg) that we have prepared.

### How to Run

1. Install Node Modules, `npm install`
2. Run the project, `npm start`

### Demo

#### Bot

<div float="left">
    <img src="images/1.jpg"  width="200" height="345">
    <img src="images/4.jpg" width="200" height="345">
    <img src="images/2.jpg" width="200" height="345">
    <img src="images/3.jpg" width="200" height="345">
</div>

#### Web Interface

<div float="left">
    <img src="images/web1.png" width="400">
    <img src="images/web2.png" width="400">
</div>
