
# Merch Api NestJs

Merch_Api_NestJs is a RESTful API built with NestJS and Prisma, utilizing PostgreSQL as the database. This project was created as an assessment for a job application and provides a backend for managing users, designs, products, and merchandise.

## Features

- **User Management:** CRUD operations for users, with secure password storage.
- **Design and Product Management:** Supports creation and management of designs and products, with relational mappings.
- **Merchandise Management:** Combines products and designs into merchandise items, calculating profitability.
- **Database Integration:** Uses Prisma ORM for data modeling and interaction with PostgreSQL.
- **Testing:** Includes tests written in Jest to ensure reliable functionality.

## Technologies

- **NestJS:** A progressive Node.js framework for building scalable server-side applications.
- **Prisma:** An ORM for seamless integration with a PostgreSQL database.
- **Jest:** Testing framework for JavaScript, used here for unit and integration tests.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/erfanasgari21/Merch_Api_NestJs.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment:
   - Copy `.env.example` to `.env` and fill in your PostgreSQL `DATABASE_URL`.
4. Run the migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Start the application:
   ```bash
   npm run start:dev
   ```

## Usage

Access the API at `http://localhost:3000`. The available endpoints include:

- `/auth`
- `/design`
- `/product`
- `/merchandise`

## Testing

Run tests with:
```bash
npm run test
```

## License

This project is licensed under the MIT License.
