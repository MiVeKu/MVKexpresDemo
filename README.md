# MVKexpresDemo

[Description](https://github.com/MiVeKu/MVKexpresDemo#description)  |  [Install](https://github.com/MiVeKu/MVKexpresDemo#install)  |  [Overview](https://github.com/MiVeKu/MVKexpresDemo#Overview)

## Description

### MVKexpresDemo or ImageDb is a NodeJs application for uploading files to MongoDB using Multer GridFS Collections. The application has functionality to filter upcoming files. Currently the users can upload images, stream them for viewing and delete files from the database. The applications interface is a single view implemented with Pug viewengine.

ImageDb uses:
* MonogoDB, a NoSQL database used to store data
* Express.js, a web application framework that runs on Node.js
* GridFS, a specification for storing and retrieving files that exceed the BSON-document size limit. [GridFS documentation](https://docs.mongodb.com/manual/core/gridfs/)
* Pug,  template engine for Node.js. [Pug homepage](https://pugjs.org/api/getting-started.html)
* Node.js, an execution environment for event-driven server-side and networking applications.


## Install

### 1. Install Node.js. 
   Download Node.js in [here](https://nodejs.org/en/download/). LTS version recommended.
### 2. Install MongoDB
   Download MongoDB in [here](https://www.mongodb.com/download-center/community). MongoDB can be installed using complete install with default settings.
### 3. Clone or download this repository
   If you download this repository as a ZIP file file unzip it before continuing.
### 4. Move into the project folder using command line or file explorer
   Open command line and use command **cd C:\Example\Folder\nodejs-harjoitusTYöCop\** to move to the project folder.
### 5. Install dependencies and setting enviroment variables
   **npm install**. Remember to create .env file with variables specified in .envExample.
### 6. Start the server
   **npm start**
   
   Now ImageDb can be accessed with a internet browser in **localhost:3000**


## Overview

### Main view and Functionality
In the view there is a filemanager instance for uploading images and a list of images currently uploaded to database. The application's view's appearance can change according to the state of the database, for example when there are files in the database:

![alt text](https://github.com/MiVeKu/FileServer/blob/main/images/ViewExample.png "The main view")

### Anomalies
The application doesn't have functionality to show status reports or errors in the view, in wich case the message is shown in an otherwice empty html page: 

![alt text](https://github.com/MiVeKu/FileServer/blob/main/images/ViewExample2.png "a report")

to return to the index navigate back to **localhost:3000**

## Author
[MiVeKu](https://github.com/MiVeKu)

