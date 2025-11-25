<div align='center'>
        <h1>Orizon - Travel Agency | A Node.js Project</h1>   
        <p>Managment software for travel agency - API Development<p>
</div>

<br>
<br>

<div align='center'>
  <img src="/src/public/images/screen.JPG" alt="sceen applicazione" style='margin: 10px auto 30px; width:200px'>
</div>

<br>
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

![screenshot](./assets/img/pc-display.JPG)

<br>
<br>

# Orizon Agency

## Presentation  

Node.js Project by Arianna Pesce | Back-End Development | start2impact University

Visit the site:
https://pescearianna.github.io/Progetto-JavaScript-di-Arianna-Pesce/

Orizon is a Node.js project that provides a RESTful API for a travel agency.
The goal is to create a backend system that manages users, travel packages, and orders, offering a clear and scalable structure.

**Endpoints for api**: .../api/packs
**Endpoints for frontend**: .../packs

---  

## API Development

1. PACKS:

GET /api/packs --> Returns the list of travel packages.
GET /api/packs/:id --> Returns a single (:id) travel package.
POST /api/packs/ --> create a new travel package.
PUT /api/packs/:id --> update a specific (:id) travel package.
DELETE /api/packs/:id --> delete a specific (:id) travel pakage.

2. USERS

GET /api/users --> Returns the list of users.
GET /api/users/:id --> Returns a single (:id) user.
POST /api/users/ --> create a new user.
PUT /api/users/:id --> update a specific (:id) user.
DELETE /api/users/:id --> delete a specific (:id) user.

3. ORDERS

GET /api/orders --> Returns the list of orders.
GET /api/orders/:id --> Returns a single (:id) order.
POST /api/orders/ --> create a new order.
PUT /api/orders/:id --> update a specific (:id) order.
DELETE /api/orders/:id --> delete a specific (:id) order.


---

## Database

The migrations.sql file in /database folder includes all SQL statements needed to reconstruct the database:
-Table creation
-Relationships
-Initial seed data
<br>

To recreate the database:
<pre> ```bash npm install npm run dev mysql -u root -p < migrations.sql ``` </pre>

---


## Setup & Installation 

1. Clone the repository
<pre> ```bash git clone https://github.com/your-username/orizon.git
cd orizon ``` </pre>


2. Install dependencies
<pre>```bash npm install ```</pre>

3. Create a .env file

Example:
<pre>```bash 
MYSQL_HOST = local
MYSQL_USER = 'root'
MYSQL_PASSWORD = ''
MYSQL_DATABASE = 'horizon'
PORT= 3000
```</pre>

4. Start the server

Production:
<pre>```bash npm start ```</pre>



Development:
<pre>```bash npm run dev ```</pre>

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