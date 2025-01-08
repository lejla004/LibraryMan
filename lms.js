const fs = require('fs');
const readline = require('readline');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


class Book{

    constructor(title,author,serialNum){
        this.title=title;
        this.author=author;
        this.serialNum= serialNum;
        this.available= true;
    }

    setAvailable(status) {
        this.available=status;
    }

    isAvailable(){
        return this.available;
    }
}


class Member{
    constructor(id,name,address,phone,email){
        this.id=id;
        this.name=name;
        this.address=address;
        this.phone=phone;
        this.email=email;
        this.fine = 10.00;
        this.rentedItems=[];
       
       }
       rentBook(book){
        if(book ==null){
         console.log("Book is not in the list");
        }
        if(book.isAvailable()){
            
         book.setAvailable(false);
            this.rentedItems.push(book);
           console.log(`Member "${this.name}" rented "${book.title}"`);
        }
     
      }
      returnBook(item) {
         // Check if the book is in the rentedItems array
         const index = this.rentedItems.findIndex(rentedItem => rentedItem.serialNum === item.serialNum);
         if (index !== -1) {
             // The book is found in the rentedItems array
             this.rentedItems.splice(index, 1); // Remove it from the rented list
             item.setAvailable(true); // Set the book as available again
             console.log(`Member "${this.name}" returned "${item.title}".`);
         } else {
             console.log(`The book "${item.title}" was not rented by "${this.name}".`);
         }
     }
     
 }
 class Rental{
     constructor(book, member) {
         this.book = book; 
         this.member = member; 
         this.rentalDate = new Date(); 
         const dueDate = new Date(this.rentalDate);
         dueDate.setDate(this.rentalDate.getDate() + 14); // Adding 14 days to rental date
         this.dueDate = dueDate; // The due date for the rental
     }
 
 
     
 
     isOverdue(){
         const currentDate = new Date();
         return currentDate>this.dueDate;
     }
    
 }
 class Library{
     constructor() {
         this.books = []; // Array to store all the books
         this.members=[]; // array to store all members
        this.rentals =[]; // array to store all rentals
        this.memberID = this.loadMemberID();
     }
 
    
 // additional method
  isString(user_input) {
     return typeof user_input === 'string';
 }
  numValidation(user_input){
     return user_input>100 && user_input<1000;
  }
 addBook() {
     try{
             rl.question("Enter book title " ,(title)=>{
                 rl.question("Enter a book author ",(author)=>{
                     rl.question("Enter a serial number " ,(serNum)=>{
                     if(this.isString(title) && this.isString(author) && this.numValidation(serNum)){
     
       const book = new Book(title,author,serNum);
                     this.books.push(book);
                     console.log(`Book "${book.title}" added to the library.`);
                    
     
     }
     else{
     console.log("Invalid input. Input should be in string format and required number should be 3 digits ");
     }
                      this.saveToFile();
                     userInputMenu();
     
                     });
                 });
             });
     }
     catch (error){
     console.log("Input should be in string format" , error.message);
             
         }
 
 
 
 
 
 
 
     }
     isValidEmail(email) {
         const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
         return emailRegex.test(email);
     }
     isString(value) {
         return typeof value === 'string' && value.trim() !== '';
     }
     
     // Check if the phone number consists only of digits (and allows empty spaces or dashes)
     isNumber(phone) {
         const phoneRegex = /^[0-9]+$/; // Only digits are allowed
         return phoneRegex.test(phone);
     }
     // Load the last used memberID from a file
     loadMemberID() {
         try {
             const data = fs.readFileSync('memberID.txt', 'utf8');
             return parseInt(data) || 100; // Default to 100 if no valid data is found
         } catch (err) {
             console.log("No previous member ID found. Starting from 100.");
             return 100; // Default value if the file doesn't exist
         }
     }
 
     // Save the current memberID to a file
     saveMemberID() {
         fs.writeFileSync('memberID.txt', this.memberID.toString());
     }
     addMember(){
     try{
             rl.question(" Enter member name " ,(name)=>{
                 rl.question("Enter member address " ,(address)=>{
                     rl.question("Enter member phone ", (phone)=>{
                         rl.question("Enter member email address " ,(email)=>{
                         if(this.isString(name) && this.isString(address) && this.isValidEmail(email) && this.isNumber(phone)){
                             const id = this.memberID;
                             this.memberID++;
     
     
                           const  member = new Member(id,name,address,phone,email);
                             this.members.push(member);
                             console.log(`Member "${member.name}" added to the library.`);
                             this.saveMemberID();
     }
     else{
       console.log("Invalid input. Input should be in string format and phone should consist of digits ");
             }
                     this.saveToFile();
                             userInputMenu();
                         });
                     });
                 });
             });
             
         }
     catch(error){
     console.log("invalid input " ,error.message());
 }
 }
     
     addRental(rental){
         this.rentals.push(rental);
 
     }
 
     rental1() {
         rl.question("Enter book title you want to rent: ", (bookTitle) => {
             rl.question("Enter member ID: ", (memberId) => {
                 
                 const normalizedBookTitle = bookTitle.trim().toLowerCase();
         
                 const book = this.books.find(b => b.title.trim().toLowerCase() === normalizedBookTitle);
         
                 // Find the member by member ID
                 const member = this.members.find(m => m.id == memberId);
         
                 
                 console.log('Found book:', book);
                 console.log('Found member:', member);
         
                 if (book && member) {
                     if (book instanceof Book) {  // Ensuring the book is an instance of the Book class
                         if (book.isAvailable()) {
                             // Rent the book to the member
                             member.rentBook(book);
         
                             // Create a rental record
                             const rental = new Rental(book, member);
                             this.addRental(rental);
         
                             console.log(`Book "${bookTitle}" rented to member "${member.name}".`);
                         } else {
                             console.log(`The book "${bookTitle}" is currently unavailable.`);
                         }
                     } else {
                         console.log("The found book is not an instance of the Book class.");
                     }
                 } else {
                     if (!book) {
                         console.log(`The book "${bookTitle}" is not available in the library.`);
                     }
                     if (!member) {
                         console.log(`Member with ID "${memberId}" not found.`);
                     }
                 }
         
                 this.saveToFile();
                 userInputMenu(); // Show menu after operation
             });
         });
     }
     
     
     removeMember() {
         rl.question("Please enter id of a member you want to remove " , (memberToBeRemoved) =>{
             const index = this.members.findIndex(member => member.id === memberToBeRemoved);
             if (index !== -1) {
                 const removedMember = this.members.splice(index, 1);
                 console.log(`Member "${removedMember[0].name}" removed.`);
             } else {
                 console.log('Member not found.');
             }
             userInputMenu();
         });
         
     }
     removeBook() {
         rl.question(" Please enter a serial number of book you want to remove",(num)=>{
             const index = this.books.findIndex(book => book.serialNum === num);
             if (index !== -1) {
                 const removedBook = this.books.splice(index, 1);
                 console.log(`Book "${removedBook[0].name}" removed.`);
             } else {
                 console.log('Book not found.');
             }
             userInputMenu();
         });
         
     }
     findBook(title) {
         return this.books.find(book => book.title.toLowerCase() === title.toLowerCase());
     }
 
     // Function to find a member by their name
     findMember(id) {
         return this.members.find(member => member.id === id);
     }
    
 
     returnBook() {
         rl.question("Enter the title of the book you want to return: ", (title) => {
             rl.question("Enter your id: ", (memberId) => {
                 
                 if (this.numValidation1(memberId)) {
                     const book = this.findBook(title);
                     
                     if (!book) {
                         console.log(`The book "${title}" is not available in the library.`);
                         this.returnBook();  // Allow the user to try again
                         return;
                     }
     
                     
                     console.log("Found book:", book);
     
                    
                     const member = this.findMember(Number(memberId)); // Convert memberId to a number
                     if (!member) {
                         console.log(`No member found with the id "${memberId}".`);
                         this.returnBook();  // Allow the user to try again
                         return;
                     }
     
                    
                     console.log("Found member:", member);
     
                    
                     console.log("Rented books by member:", member.rentedItems);
     
                    
                     member.returnBook(book);
                     console.log(`The book "${book.title}" has been returned by member "${member.name}".`);
     
                     this.saveToFile();
                     userInputMenu();  // Show the main menu after successful operation
                 } else {
                     console.log("Please input a valid memberId.");
                     this.returnBook();  // Allow the user to try again
                 }
             });
         });
     }
     
     numValidation1(value) {
         return !isNaN(value) && Number.isInteger(Number(value)); // Ensure value is a valid number
     }    
     
    
     
     
     displayBooks() {
         console.log("--- All Books ---");
         this.books.forEach(book => {
             console.log(`ID: ${book.serialNum}, Name: "${book.title}", Author: "${book.author}", Available: ${book.available}`);
             
         });
         userInputMenu();
     }
    displayMembers() {
         console.log("--- All Members ---");
         this.members.forEach(member => {
             console.log(`ID: ${member.id}, Name: "${member.name}" , Fine : ${member.fine} `);
      
         });
         
         userInputMenu();
     }
 
     checkOverdue() {
         let foundOverdue = false;
         
         this.rentals.forEach(rental => {
             if(rental instanceof Rental){
                 console.log("It is instance of rental");
             if (rental.isOverdue()) { 
                 console.log(`Overdue: "${rental.book.title}" rented by ${rental.member.name}`);
                 foundOverdue = true;
                 userInputMenu();
             } }
 
         });
     
         if (!foundOverdue) {
             console.log("No overdue rentals.");
             userInputMenu();
         }
     }
 
 
 
     saveToFile(){
         const data ={
             books : this.books,
             members : this.members,
             rentals : this.rentals
         };
         fs.writeFileSync('libraryfile.json',JSON.stringify(data,null,2));
         console.log("Data is saved to file libraryfile.json");
     }
 
     loadData() {
         try {
             const data = fs.readFileSync('libraryfile.json');
             const parsedData = JSON.parse(data);
     
          
             this.books = parsedData.books.map(bookData => new Book(bookData.title, bookData.author, bookData.serialNum));
     
          
             this.members = parsedData.members.map(memberData => new Member(memberData.id, memberData.name, memberData.address, memberData.phone, memberData.email));
     
          
             this.rentals = parsedData.rentals;
     
             console.log("Data loaded");
         } catch (error) {
             console.log("No data in file, starting with an empty list.");
         }
     }
     displayRentals(){
 
         console.log("Rentals");
         this.rentals.forEach(rental=>{ 
         const book = rental.book;
         const member = rental.member ;
    
 
         let rentalDate = new Date(rental.rentalDate);
         let dueDate = new Date(rental.dueDate);
         
                   console.log(`Rental ID: ${this.rentals.indexOf(rental) + 1}`);
                   console.log(`Book: "${book.title}" by ${book.author}`);
                   console.log(`Member: ${member.name} (ID: ${member.id})`);
                   console.log(`Rental Date: ${rentalDate.toDateString()}`);
                   console.log(`Due Date: ${dueDate.toDateString()}`);
                  
                   console.log("-----------------------------------------------------");
               });
              userInputMenu();
           }
        }
  
function login(){

    rl.question("Enter your username " ,(username)=>{
        rl.question("Enter your password " , (password)=>{

            username = username.trim();
            password = password.trim();

            if(username === 'admin@library.com' && password === 'admin16'){
               console.log("You are logged in ");
             userInputMenu();
            }
            else{
                console.log("Invalid email or address");
                console.log("Please enter again ");
             login();
            }
        });
    });
}
const lib = new Library();
function userInputMenu(){

    rl.question("Please choose your option " ,(option) =>{
    switch(option){
   
        case '1':
          lib.addMember() ;
          
            break;
        case '2':
            lib.removeMember();
           
            break;
        case '3':
            lib.addBook();
            
            break;
        case '4':
            lib.removeBook();
      
            break;
        case '5':
           lib.displayBooks();
       
           
            break;
        case '6':
          
            lib.displayMembers();
   
          
            break;
        case '7':
          lib.rental1();
         
            break;
        case '8':
            lib.checkOverdue();
            break;
        case '9':
            lib.returnBook();
            break;
       
        case '10':
            console.log("exit");
            process.exit(0);
            break;
        case '11':
         lib.displayRentals();
           break; 
        default:
            console.log('Invalid option, try again.');
            showMenu();
            userInputMenu();
            break;
    }
    } );
}


function showMenu() {
    console.log("          Menu      ");
    console.log("1. Add Member       |  2. Remove Member");
    console.log("3. Add Book         |  4. Remove Book");
    console.log("5. Display Books    |  6. Display Members");
    console.log("7. Rent             |  8. Check Overdue Rentals");
    console.log("9. Return           |  10. Exit");
    console.log("11.Display Rentals  |   ");
}
login();
lib.loadData();

showMenu();
userInputMenu();
