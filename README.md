# Meetup App
Demo @ http://ec2-54-67-104-152.us-west-1.compute.amazonaws.com/

The purpose of the application is to allow friend groups to schedule meetups and decide where to eat quickly.  We always run into the problem where no one knows what to eat, where to eat, and when to eat.  The hope is that this will simplify the process.  Eventually, the goal is to connect people with other nearby people that share common food interests and hobbies. Use cases of this includes college campuses, metropolitan cities, etc. The end goal is to recreate a more social Yelp.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [Deployment](#deployment) for notes on how to deploy the project on a live system.

**Install Docker and Run**
```
docker-compose build
docker-compose up
```

## Testing
**1. Run tests for backend**
```
cd backend
coverage run --source="." manage.py test meetup
coverage report
```
**2. Run tests for frontend**
```
cd frontend
npm test
```

## Deployment (For AWS EC2, Amazon Linux 2)
**1. SSH into EC2 instance (t2.medium is good, t2.micro stalls due to cpu/memory overusage)**
``` 
ssh -i meetup.pem ec2-user@ec2-54-67-104-152.us-west-1.compute.amazonaws.com 
```
**2. Install Docker & Grant Permissions**
```
sudo amazon-linux-extras install docker
sudo service docker start
sudo usermod -a -G docker ec2-user
sudo chkconfig docker on
```
**3. Install Git**
```
sudo yum install -y git
```
**4. Install Docker Compose**
```
sudo curl -L https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```
**6. Reboot Server**
```
sudo reboot
```
**7. Clone Github Repository** 
```
git clone https://github.com/alined908/meetup.git
```
**8. Install Node**
```
sudo yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_13.x | sudo -E bash -
sudo yum install -y nodejs
```
**9. Install Packages Locally**
```
cd meetup/frontend
npm install
```
**10. Run Docker**
```
docker-compose build
docker-compose up
docker exec -i -t <container_id> bash
python manage.py migrate
python manage.py loaddata meetup/fixtures/*.json
```

## Built With

* **Docker/AWS EC2** - Deployment
* **Django** - Backend
* **React/Redux** - Frontend
* **Postgres** - Database
* **Nginx** - Web Server
* **Redis** - Channel layer for django channels
* **Yelp Api** - Generate food options
* **Material UI** - Design

## Author
* **Daniel Lee** 

## Todo General
- [ ] Write tests for frontend
- [ ] Safari presentation
- [ ] Have to click all fields?

## Todo Next Iteration
- [ ] Block people, admin functionality for meetup member
- [ ] Search bar on top app nav bar
- [ ] MeetupEventOption Delete
- [ ] Friends delete
- [ ] Authenticate JWT automatically after expiration
- [ ] Authenticate Websocket
- [ ] Info dissapears on meetup edit form reload
- [ ] Suggest restauraunt
- [ ] Change lock icon + default public/private
- [ ] Pagination on entities
- [ ] Fallback if no latitude/longitude provided.
- [ ] Get user location before render
- [ ] Write tests for consumers
- [ ] Form validation + Validation for time and date
- [ ] Handle 404 page
- [ ] Add transitions (ex Natural transition to new options when meetup event is changed)
- [ ] Meetup email message nice html
- [ ] Meetupmembers give roles and allow admin to give roles/kick/etc
- [ ] Add friends, redux action/websockets
- [ ] Edit Meetup Form On reload doesnt populate data
- [ ] Specify proptypes
- [ ] Reload animation on chat scroll up/Throttle scroll event
- [ ] Create meetup with member 
- [ ] Add google social auth 
- [ ] Confirm email, Change password
- [ ] Find people who have similar food taste near you?
- [ ] Change name of preference
- [ ] Refactor onTagsChange of MeetupsComponent
- [ ] Add calendar of meetups
- [ ] Add scrollable notifications box for meetupevent 
- [ ] Delete Friend, Give friend/meetupmember nickname 
- [ ] Edit chat messages and add emojis, upload picture
- [ ] Rearrange chat contacts (and list notifications) based off of whoever messaged recently
- [ ] Disable redux dev tools in production
- [ ] Separate css files
- [ ] Handle timestamp logic
- [ ] Continuous integration
- [ ] Bundle chat messages together
- [ ] Past activity