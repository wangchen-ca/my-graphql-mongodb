# My sample React application - my-graphql-mongodb

This sample NodeJs application uses GraphQL and MongoDB. I did little bit more work to make it close to ones running in real world.

## Technical notes:
- The 2 different Documents, Author and Books in MongoDB, are logically linked, Books contains [authorIds]. The GraphQL query aggregates them together into response.

```
{
  authors {
    _id
    name
    gender
    yob
  }
}

{
  "data": {
    "authors": [
      {
        "_id": "654c873561cde12d6458c82b",
        "name": "Charles Archar",
        "gender": "M",
        "yob": 1960
      },
      {
        "_id": "654c876461cde12d6458c82d",
        "name": "Julia Woods",
        "gender": "F",
        "yob": 1980
      },
      {
        "_id": "654c878c61cde12d6458c82f",
        "name": "W.O. Mitchell",
        "gender": "M",
        "yob": 1914
      }
    ]
  }
}

--
{
  books {
    name
    genre
    authors {
      _id
      name
      gender
      yob
    }
  }
}

{
  "data": {
    "books": [
      {
        "name": "Who Has Seen The Wind",
        "genre": "This novel is a classic in Canadian literature",
        "authors": [
          {
            "_id": "654c878c61cde12d6458c82f",
            "name": "W.O. Mitchell",
            "gender": "M",
            "yob": 1914
          }
        ]
      },
      {
        "name": "Love Sotres",
        "genre": "Books wrote by 2 authors",
        "authors": [
          {
            "_id": "654c873561cde12d6458c82b",
            "name": "Charles Archar",
            "gender": "M",
            "yob": 1960
          },
          {
            "_id": "654c876461cde12d6458c82d",
            "name": "Julia Woods",
            "gender": "F",
            "yob": 1980
          }
        ]
      }
    ]
  }
}

```
- Blogs document lives alone in MongoDB. The field posted_at is Date type in DB. Query output and mutation addBlog input use format 'yyyy-mm-dd'. Conversion is added into Type and Model to support this.

```
--
mutation {
  addBlog(title: "Hello GraphQL", content: "It is good tool", status: false, posted_at: "1999-09-01") {
    id
  }
}

--
{
  blogs {
    content
    id
    status
    title
    posted_at
  }
}


{
  "data": {
    "blogs": [
      {
        "content": "It is better now",
        "id": "654d179c3ba2c825dc91eafa",
        "status": false,
        "title": "Today is a new day",
        "posted_at": "1999-09-09"
      },
      {
        "content": "Whether changes",
        "id": "654d283db2e5f35b062f73a5",
        "status": false,
        "title": "Tomorrow better",
        "posted_at": "1999-09-01"
      },
      {
        "content": "It is good tool",
        "id": "654d2bfc54f7d145e5139cd5",
        "status": false,
        "title": "Hello GraphQL",
        "posted_at": "1999-09-01"
      },
    ]
  }
}


```



## How to Run

In the project directory, you can run:

### `npm start`

browser @ http://localhost:4000/graphql

I use MongoDB Atlas cloud service to run the application at my local. The file creadential.js, containing my user id and password,  is not committed. To run from your local host you need to add your own creadential.js and replace with your own MongoDB connection url in app.js. Once started, you can use mutation/add or query data from MongoDB in browser.

