# APEX Backend Questions & Answers Microservice

## Description
This is a backend microservice designed for the questions and answers of an ecommerce store. The database queries have been written with read operations and a horizontal scaling approach in mind.

## Getting Started

### Technologies
- Express
- Node 14+
- PostgreSQL through either sudo or from the postgreSQL website https://www.postgresql.org/download/

### Installation
- Clone the project to your own repository
- Use npm to install all project dependencies

```bash
npm install
```

### Environment Setup
Create a .env file in the root of the directory:

```bash
USER="FILL_ME_IN"
HOST="FILL_ME_IN"
DATABASE="FILL_ME_IN"
PASSWORD="FILL_ME_IN"
PORT="FILL_ME_IN"
```
If you are not using a load balancer but would like to test using loader.io
- add this line to the .env file:

```bash
LOADER_IO_KEY="FILL_ME_IN"
```
- Uncomment this line in index.js of root directory:
```bash
// app.get(`/${process.env.LOADER_IO_KEY}`, (req, res) => {
// res.status(200).send(process.env.LOADER_IO_KEY);
// });
```

### CSV data
Create a director named "data" in the root director. This is where we will store CSV files that contain all our questions and answers data

## Running the project
### ELT
Run the scripts

```bash
npm run build-db
```

to fill postgres with your data

### Run Server

```bash
npm run start
```

## REST API

## List Questions
### GET /qa/questions/:id
Status Code: 200 OK
```bash
{
  "product_id": "5",
  "results": [{
        "question_id": 37,
        "question_body": "Why is this product cheaper here than other sites?",
        "question_date": "2018-10-18T00:00:00.000Z",
        "asker_name": "williamsmith",
        "question_helpfulness": 4,
        "reported": false,
        "answers": {
          68: {
            "id": 68,
            "body": "We are selling it here without any markup from the middleman!",
            "date": "2018-08-18T00:00:00.000Z",
            "answerer_name": "Seller",
            "helpfulness": 4,
            "photos": []
            // ...
          }
        }
      },
      {
        "question_id": 38,
        "question_body": "How long does it last?",
        "question_date": "2019-06-28T00:00:00.000Z",
        "asker_name": "funnygirl",
        "question_helpfulness": 2,
        "reported": false,
        "answers": {
          70: {
            "id": 70,
            "body": "Some of the seams started splitting the first time I wore it!",
            "date": "2019-11-28T00:00:00.000Z",
            "answerer_name": "sillyguy",
            "helpfulness": 6,
            "photos": [],
          },
          78: {
            "id": 78,
            "body": "9 lives",
            "date": "2019-11-12T00:00:00.000Z",
            "answerer_name": "iluvdogz",
            "helpfulness": 31,
            "photos": [],
          }
        }
      },
      // ...
  ]
}
```
## Answers List
### GET /qa/questions/:question_id/answers
Status Code: 200 OK
```bash
{
  "question": "1",
  "page": 0,
  "count": 5,
  "results": [
    {
      "answer_id": 8,
      "body": "What a great question!",
      "date": "2018-01-04T00:00:00.000Z",
      "answerer_name": "metslover",
      "helpfulness": 8,
      "photos": [],
    },
    {
      "answer_id": 5,
      "body": "Something pretty durable but I can't be sure",
      "date": "2018-01-04T00:00:00.000Z",
      "answerer_name": "metslover",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "urlplaceholder/answer_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/answer_5_photo_number_2.jpg"
        },
        // ...
      ]
    },
    // ...
  ]
}
```
## Add a Question
#### POST /qa/questions/:id
Status Code: 201 CREATED

## Add an Answer
### POST /qa/questions/:question_id/answers
Status Code: 201 CREATED

## Mark Question as Helpful
### PUT /qa/questions/:question_id/helpful
Status Code: 204 NO CONTENT

## Report Question
### PUT /qa/questions/:question_id/report
Status Code: 204 NO CONTENT

## Mark Answer as Helpful
### PUT /qa/answers/:answer_id/helpful
Status Code: 204 NO CONTENT

## Report Answer
### PUT /qa/questions/:question_id/report
Status Code: 204 NO CONTENT