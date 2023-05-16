# E-commerce Challenge

## 💻 About

This web application is specifically designed for updating product prices within an e-commerce database. Users have the ability to modify both individual product prices and pack prices by uploading CSV files while adhering to business rules established by the finance and marketing teams.

The client-side of the application is built using React.js (JavaScript), providing a user-friendly interface. On the server-side, Node.js (TypeScript) with Express.js powers the application, enabling seamless communication and request handling. The database interaction is managed through a containerized MySQL setup, leveraging Docker Compose for efficient management.

## 🚀 Built With

> [![Javascript][Javascript]][Javascript-url][![React][React.js]][React-url][![axios][axios]][axios-url][![Node.js][Node.js]][Node.js-url][![express][express]][express-url][![typescript][typescript]][typescript-url]

## 📌 Lessons Learned

- Develop an e-commerce database management application using React.js and Node.js to fulfill business rules requirements.
- Plan and organize both the directory structure and the fulfillment of the requirements.
- Implement functionality to upload and manipulate CSV files for updating the MySQL database.

## Getting Started

### ⬇️ Dependencies

Open a terminal on root directory and use this command for installing client dependencies

```bash
npm install
```

This script installs dependencies for both the client and server!

### ⚡ Running the Aplication

Initially, you need to configure your environment variables:

Rename `.env.example` file, on root directory, to `.env`.

*You can choose to alter this environment if you fell the need to do it.*

After that, the application can be started with:

```bash
npm start
```

This script starts both the client and server!

Or, also with the development script:

```bash
npm run dev
```

This script starts both the client and server (on development mode)!

## 📜 Business Rules

1. The pricing file provided by the Purchasing team must always be in CSV format, containing the product code and the new price, as shown in the example below.

```csv
product_code,new_price
16,25.50
```

2. The system must prevent the selling price of products from being below their cost.
3. The system must prevent any price adjustments that exceed 10% of the current product price.
4. Products sold in packs must have their components adjusted so that the final price of the components equals the price of the pack.
    - *This business rule is partially fulfilled. Changes in product prices result in adjustments to the prices of the packs they belong to. However, changes in pack prices do not generate price adjustments for the individual products within the pack.*

## 📜 Requirements

1. Development of a system with a Node.js backend and a React.js frontend.
2. Utilization of the JavaScript or TypeScript programming languages.
3. MySQL database (version 5 or 8).
4. Ability to upload the pricing file.
5. Validation button that checks if all the required fields are correctly filled, if the product codes exist, if the prices are correctly filled, and if the file adheres to the established business rules.
6. Display of information for the submitted products, including code, name, current price, and new price.
7. Display of the violated validation rules next to each product.
8. Update button that is only enabled if all the products in the file are validated and without broken rules.
9. Upon clicking update, the system should save the new prices to the database and be ready to receive a new file.
10. Update of the pack cost price as the sum of the component costs. The cost prices of individual products that are not part of packes should not be updated.
    - *This requirement was not fulfilled within the given deadline for this challenge. I didn't fully understand how the changes in cost prices would be handled concurrently with the other business rules and requirements, so I decided to leave it for the next steps of this project.*


## 🧪 Testing

While there is currently no automated testing routine in place, all business rules have been manually tested using CSV files located in the csv_mocks directory. This manual testing process ensured that these business rules were successfully validated and fulfilled.

## 🚶 Next Steps

- Fulfill all the business rules and requirements missing;

- Automated testing: Implement automated testing to validate business rules, ensuring reliable and efficient testing processes;

- UI styling with Material UI: Enhance the user interface by utilizing Material UI to create visually appealing and user-friendly designs;

- Refactor project structure: Improve the project's architecture and design patterns to enhance code organization, maintainability, and scalability.

## 💬 Contact Me

<div align="left" style="display: inline_block">
  <a href="https://arthur-debiasi.github.io" target="_blank">
  <img height="28rem" src="https://img.shields.io/badge/my_portfolio-3fc337?style=for-the-badge" target="_blank">
  </a>
  <a href="https://www.linkedin.com/in/arthur-debiasi" target="_blank"><img height="28rem" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>
  <a href = "mailto:arthurdebiasi@hotmail.com"><img height="28rem" src="https://img.shields.io/badge/outlook-0078D4?style=for-the-badge&logo=microsoftoutlook&logoColor=white" target="_blank"></a>
</div>

[Javascript]: https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[Javascript-url]: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[MUI]: https://img.shields.io/badge/material_ui-007FFF?style=for-the-badge&logo=mui&logoColor=white
[MUI-url]: https://img.shields.io/badge/material_ui-007FFF?style=for-the-badge&logo=mui&logoColor=white

[axios]: https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white
[axios-url]: https://axios-http.com/ptbr/docs/intro

[Node.js]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white
[Node.js-url]: https://nodejs.org/

[express]: https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white
[express-url]: https://expressjs.com/

[typescript]: https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org
