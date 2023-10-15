
# Marketta Bookstore

My first serious attempt to create an online store, which includes APIs,  
server-side rendering, user login system, management and merging of local  
and server copies, connection security and much more.


## Run Locally

Clone the project

```bash
  git clone https://github.com/kejczor/marketta-bookstore.git
```

Go to the project directory

```bash
  cd marketta-bookstore
```

Install dependencies

```bash
  npm install
```

Create an .env file
```bash
  touch .env
```

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL="file:./dev.db"`

`NEXTAUTH_SECRET=some_secret_key`

`NEXTAUTH_URL=http://localhost:3000`

Finally start the server

```bash
  npm run dev
```


## Technologies

- Language: **Typescript**
- Framework: **Next.js**
- State managment: **React Context**
- Database: **Prisma on SQLite**
- Authentication: **NextAuth.js**
- Styles: **TailwindCSS**


## License

[MIT](https://choosealicense.com/licenses/mit/)

