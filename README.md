Library management system
---



Description
---

Library management system is simple application designed to help library managers to manage data in library. It allows librarian to search for books, track borrowing activities, and receive overdue notifications. It enables administrators to manage inventories and user accounts efficiently, reducing human error and improving access to resources through automation.
This project is designed during the course  Programming Languages  CS305.



Table of contents
---

- Project's goals
- Features
- Technologies used
- Installation


Project's goals
--
The goal of this project is to understand fundamentals of programming by developing simple Library management system.
The project is focused on OOP concepts,programming sytax in three different languages


FEATURES
---

![admin](https://img.shields.io/badge/admin-login-teal.svg?style=flat-square) 
![search](https://img.shields.io/badge/search-books-yellowgreen.svg?style=flat-square)
![rent](https://img.shields.io/badge/rent-books-ff69b4.svg?style=flat-square)
![member](https://img.shields.io/badge/add-member-dodgerblue.svg?style=flat-square) 
![add](https://img.shields.io/badge/add-books-orange.svg?style=flat-square) 

-Book management : add and remove books
- Member management :add and remove member
- Availability : update availability status of the book(based on rentals and returns)
- Books tracking: track which books are checked out and when is due to be returned
- Display list  : display a list of all books/members
- Fine calculation: check overdue books and calculate fines


CORE FUNCTIONS
---

- Add/Remove member : Manage member information
- Add/Remove book : Manage books collection
- Rent :  Allows members to borrow books therefore they update book's status
- Return : Allows members to return book and update book's status
- Save data : Saves data to json to have all history in one file
- Display Lists : Allows administrators to see all collection of books,members and rentals


MODULES
---

- Book
- Member
- Rental
- Library

Technologies used 
---
JavaScript
Data Format : JSON



## Installation
1. Download the project files from GitHub
2. You need to have correct IDE for programming language
   For JavaScript use  VS Code with Node.js
3. Install required software
   JavaScript : Node.js should be installed
4. Run the application


## How to run?
1. Install Node.js.

2. Save the project files in a folder.

3. Open a terminal and navigate to the folder.

4. Run the command:

if you are running application through command prompt
then you should write node fileName.js


5. Follow the menu options to manage the library.

### IMPORTANT
### USERNAME : admin@library.com 
### PASSWORD : admin16
### NOTE :
"If this program is run for the first time, it will create a new JSON file"libraryfile.json". On subsequent runs, any new data will be added to the existing file."






   


