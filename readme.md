<div align='center'>
        <h1>Orizon - Travel Agency | A Node.js Project</h1>   
        <p>Develop a RESTful API for a travel agency<p>
</div>

<br>

<div align='center'>
<p>
  <a href="#presentation">Presentation</a> •
  <a href="#api-development">API Development</a> •
  <a href="#database">Database</a> •
  <a href="#setup-&-Installation">Setup & Installation</a> •
  <a href="#technologies-used">Technologies used</a> •
  <a href="#contact">Contact</a>
</p>
</div>

![screenshot](/src/public/images/screen.JPG)

<br>

# Orizon Agency

## Presentation  

Node.js Project by Arianna Pesce | Back-End Development | start2impact University

Orizon is a Node.js project that provides a RESTful API for a travel agency.
The goal is to create a backend system that manages users, travel packages, and orders, offering a clear and scalable structure.<br>
<br>
**Endpoints for api**: .../api/packs<br>
**Endpoints for frontend**: .../packs

---  

## API Development

1. PACKS:

GET /api/packs --> Returns the list of travel packages. <br>
GET /api/packs/:id --> Returns a single (:id) travel package.<br>
POST /api/packs/ --> create a new travel package.<br>
PUT /api/packs/:id --> update a specific (:id) travel package.<br>
DELETE /api/packs/:id --> delete a specific (:id) travel pakage.<br>

2. USERS

GET /api/users --> Returns the list of users.<br>
GET /api/users/:id --> Returns a single (:id) user.<br>
POST /api/users/ --> create a new user.<br>
PUT /api/users/:id --> update a specific (:id) user.<br>
DELETE /api/users/:id --> delete a specific (:id) user.<br>

3. ORDERS

GET /api/orders --> Returns the list of orders.<br>
GET /api/orders/:id --> Returns a single (:id) order.<br>
POST /api/orders/ --> create a new order.<br>
PUT /api/orders/:id --> update a specific (:id) order.<br>
DELETE /api/orders/:id --> delete a specific (:id) order.<br>

4. FILTERS

GET /api/orders?dateStart=2025-01-01&dateEnd=2025-12-31&pack=1&user=1
<br>

Parameters:<br>
- dateStart: yyyy/mm/dd<br>
- dateEnd: yyyy/mm/dd<br>
- pack: id<br>
- user: id<br>
<br>

---

## Database

The migrations.sql file in /database folder includes all SQL statements needed to reconstruct the database:<br>
-Table creation<br>
-Relationships<br>
-Initial seed data<br>
<br>

To recreate the database:
<pre> mysql -u your_mysql_user -p your_database_name < database/migrations.sql </pre>

---


## Setup & Installation 

1. Clone the repository
<pre>  git clone https://github.com/pescearianna/Progetto-Node.js-di-Arianna-Pesce.git
       cd Progetto-Node.js-di-Arianna-Pesce  </pre>


2. Install dependencies
<pre> npm install </pre>

3. Create a .env file

Example:
<pre> 
MYSQL_HOST = localhost
DB_USER= your_mysql_user
DB_PASSWORD= your_mysql_password
DB_NAME= your_database_name
DB_PORT= 3000
</pre>

4. Start the server

Production:
<pre> npm run start </pre>

---  

## Technologies Used  

- **EJS**: For the front-end structure.  
- **CSS**: For styling and animations.  
- **JavaScript**: For logic and interactions. 
- **Node.js**: For back-end logic.
- **Express.js**: For back-end logic.
- **MySQL**: Manage DB.  

---  

## Contact

> GitHub [@pescearianna](https://github.com/pescearianna) &nbsp;&middot;&nbsp;
> LinkedIn [Arianna Pesce](https://www.linkedin.com/in/ariannapesce/)

---