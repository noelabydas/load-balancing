# Load balancing

Load balancing in NodeJs and Express

### Algorithms

1. Round Robin
2. Least Connections

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to install node in your system. Download it from [here](https://nodejs.org/en/download/).

### Installing

A step by step series of examples that tell you how to get  the web application running

Clone the repo and enter inside the directory

```shell
$ git clone https://github.com/leonatwork/load-balancing.git
$ cd load-balancing
```

Install all npm modules

```shell
$ npm install
```
##### Running the node app

To run the round robin version
```shell
   $ node server-rr.js
```

- The app should be up and running at [localhost:8080](http://localhost:8080/)
- The Round Robin server listens at port 8080, and three other servers run at ports 3000,3001 and 3002

To run least connection version

```shell
   $ node server-lc.js
```
- The app should be up and running at [localhost:8081](http://localhost:8081/)
- The Least Connection server listens at port 8081, and three other servers run at ports 4000,4001 and 4002

### Built With

* HTML
* Javascript
* CSS/bootstrap
* NodeJs
* Express
