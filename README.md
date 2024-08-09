# Recipe Ingredient Substitute Finder

This project is a simple web application that allows users to search for ingredient substitutes. If an ingredient is not found, users can add new substitutes to the database.

## Table of Contents

1. [Installation Instructions](#installation-instructions)
2. [API Usage](#api-usage)
3. [API Documentation](#api-documentation)
    - [GET /api/substitutes](#get-apisubstitutes)
    - [POST /api/add-substitute](#post-apiadd-substitute)
    - [PUT /api/update-substitute](#put-apiupdate-substitute)
    - [DELETE /api/delete-substitute](#delete-apidelete-substitute)
4. [Examples](#examples)

## Installation Instructions

To set up and run the back-end server locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/felipavil/CS326Project1
   cd CS326Project1/src/frontend/backend


2. **Install dependencies:**

    npm install

3. **Run the server:**

    Start the server by typing: 
    
    node index.js

4. **Access the application:**

    Open the web browser and navigate to http://localhost:3260 to use the application.


## API Usage

The API allows you to interact with the ingredient substitutes database. You can create, read, update, and delete substitutes through the following endpoints.

## API Documentation

**GET /api/substitutes**

Endpoint: /api/substitutes
Method: GET
Description: Retrieves the substitute for a given ingredient.
Parameters: 'ingredient' (required, string) - The name of the ingredient to search for.
Response:

{
  "substitute": "1 cup of rice flour"
}

or

{
  "substitute": "No substitute found for this ingredient."
}


Success Status Code: 200 OK
Error Status Code: 404 Not Found (if the ingredient is not found)


**POST /api/add-substitute**

Endpoint: /api/add-substitute
Method: POST
Description: Adds a new ingredient substitute to the database.
Request:

{
  "ingredient": "egg",
  "substitute": "1/4 cup unsweetened applesauce per egg"
}

Response: 

{
  "status": "ok",
  "message": "Substitute added successfully."
}

Success Status Code: 201 Created
Error Status Code: 400 Bad Request (if there is an issue with the data)

**PUT /api/update-substitute**

Endpoint: /api/update-substitute
Method: PUT
Description: Updates an existing substitute for a given ingredient.
Request:

{
  "ingredient": "sugar",
  "substitute": "1 cup of honey"
}

Response:

{
  "status": "Success",
  "message": "Substitute updated."
}

Success Status Code: 200 OK
Error Status Code: 400 Bad Request (if there is an issue with the data)

**DELETE /api/delete-substitute**

Endpoint: /api/delete-substitute
Method: DELETE
Description: Deletes an existing substitute for a given ingredient.
Request:

{
  "ingredient": "sugar"
}

Response:

{
  "status": "Success",
  "message": "Substitute deleted."
}

Success Status Code: 200 OK
Error Status Code: 404 Not Found (if the ingredient does not exist)

## Examples

Examples demonstrating how to interact with the API using curl or similar tools:


**Example 1: Searching for an Ingredient Substitute**

curl "http://localhost:3260/api/substitutes?ingredient=flour"

Response:

{
  "substitute": "1 cup of rice flour"
}

**Example 2: Adding a New Ingredient Substitute**

curl -X POST "http://localhost:3260/api/add-substitute" -H "Content-Type: application/json" -d '{"ingredient": "egg", "substitute": "1/4 cup unsweetened applesauce per egg"}'


Response:

{
  "status": "ok",
  "message": "Substitute added successfully."
}

**Example 3: Updating an Existing Substitute**

curl -X PUT "http://localhost:3260/api/update-substitute" -H "Content-Type: application/json" -d '{"ingredient": "sugar", "substitute": "1 cup of honey"}'


Response:

{
  "status": "Success",
  "message": "Substitute updated."
}


**Example 4: Deleting a Substitute**

curl -X DELETE "http://localhost:3260/api/delete-substitute" -H "Content-Type: application/json" -d '{"ingredient": "sugar"}'


Response:

{
  "status": "Success",
  "message": "Substitute deleted."
}

