## Table of contents
* [General info](#Todo-app)
* [Adopt animals app](#Adopt-animals-app)
* [Images](#Images)
* [How to Install and Run the Project](#How-to-Install-and-Run-the-Project)
* [Technologies](#technologies)

## General info
This application was created for a thesis. I expanded my knowledge about Django Rest Framework and Vue.js. I learned about JWT authentication, Vuex and make responsive pages.

# Adopt animals app
The application allows the user to view animals added by others, filtering and check details of them. User can also create an account and log in.
Logged in user can add new animal via the form. He can also change the password, e-mail address, phone number and delete the animal he has added.

## Images
![Photo one](https://github.com/Dariusz95/Adopt-animals-app/blob/master/Frontend/public/AdoptImg1.jpg)
![Photo two](https://github.com/Dariusz95/Adopt-animals-app/blob/master/Frontend/public/AdoptImg2.jpg)
![Photo three](https://github.com/Dariusz95/Adopt-animals-app/blob/master/Frontend/public/AdoptImg3.jpg)

## How to Install and Run the Project
### Backend
```
$ clone this repository - git clone https://github.com/Dariusz95/Adopt-animals-app
$ cd Adopt-animals-app\Backend
$ pip install virtualenv
$ virtualenv env
```
#### Activate the virtual environment
##### Mac OS / Linux
```
$ source env/bin/activate
```
##### Windows
```
$ env\Scripts\activate
```
```
$ pip install -r requirements.txt
$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py runserver
```
### Frontend
```
$ cd Adopt-animals-app\Frontend
$ npm install
$ npm run serve
```

# technologies
* Vue.js 2.6.11
* Django Rest Framework 3.13.1
* Django 3.1.4
