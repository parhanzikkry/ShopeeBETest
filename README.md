# Shopee BE TEST

## About This App

This apps provide api for front-end engineer to store, delete, and show the record of daily currency exchanges rate. This application run with:
1. Node.Js with Express framework.
2. Mysql with ORM sequelize framework.
3. Flat html and jquery in front-end to show and access the rocord of data.

## How To Run
### Via Docker
#### Prerequisites
You are already have docker:18.09.0 (same version is recomended), and docker-compose:1.23.1 (same version is recomended) in your PC. (Note: im use Ubuntu 18.04)
#### Step
1. Pull this git repository first.
2. Move to directory shopeeTest Ex: cd shopeeTest
3. Run docker-compose up in this directory
4. This app will run in localhost:3000 in your browser
### Without Docker
#### Prerequisites
You are already have mysql:5.7.24 (same version is recomended), Node:8.14.0 (same version is recomended) and npm:6.4.1 (same version is recomended) in your PC. (Note: im use Ubuntu 18.04)
#### Step
1. Pull this git repository first.
2. Move to directory shopeeTest Ex: cd shopeeTest.
3. Run npm install to install dependency.
4. Open dbconnection.js and set the connection with your environment.
5. Run Node database/table.database (dont forget to kill this process with ctrl+c)
6. Run Node database/tracks.database (dont forget to kill this process with ctrl+c) (optional)
7. Run Node database/histories.database (dont forget to kill this process with ctrl+c) (optional)
8. Run npm start
9. This app will run in localhost:3000 in your browser

## API DOCUMENTATION
You can read Api documentation in here:
1. Postman collection (<https://www.getpostman.com/collections/afc7d2c21bf2348d35b9>)
2. Postman Web (<https://web.postman.co/collections/4513754-f0aa2b03-2091-4048-b9a3-6070632d2a87?workspace=5372c511-8b3b-4d65-868a-a39d3c7c3173>)
 
## Database Design
This application work in architectural patterns MVC. Each model in this app is modeled with ORM in Sequelize framework and saved in folder models in this github. if we modeled with ERD, structure and relation between two table can be described like this.

![alt text](https://raw.githubusercontent.com/parhanzikkry/ShopeeBETest/master/ERD_ShopeeTest.png "ERD")

There is 2 table, Tracks and histories. Tracks is table for describe every currency exchange will be record in this app. there is 3 attribute, id is primary key for this table, from is currency exchange from, and to is currency exchange to. Histories is table for store every record of currency exchange already track in tracks's table. there is 4 attribute, id is primary key for this table, fk_track_id is foreign key from tracks's table, history_date is date of currency exchange occur, history_rate is rate of currency exchange occur.

## Any Question?
Do you have any question, opinion, or suggestion, you can send it with email: parhanzikkrypadly@gmail.com i really appreciate it.

Best regards
Parhan Zikkry Padly
