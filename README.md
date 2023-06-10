# E-Commerce Platform: ECOMZ

### An embedded screenshot of the app
![Screenshot](https://ojrecgvwozpmhtbesver.supabase.co/storage/v1/object/public/public/Screenshot%202023-06-10%20at%201.45.46%20pm.png)

### Explanations of the technologies used
React.js: JavaScript library for building user interfaces.
Supabase: Open-source Supabase alternative for database and authentication.
Mantine: A customizable React component and hooks library

### A couple paragraphs about the general approach you took
My aim was to create a responsive and user-friendly e-commerce platform using modern web technologies. The frontend was built with React.js. Supabase was chosen as the backend solution to handle the database and user authentication. The steps I took were:

- **Design the user interface:** I designed an intuitive user interface using Mantine components. They have built in responsive designs to handle good experience across different devices.


- **Implement user authentication:** I integrated Supabase's authentication system to handle user login and signup functionality. I used the Supabase Auth JavaScript library to manage user authentication state and provide secure access to protected routes within the app.


- **Connect to Supabase backend:** I used Supabase to store and retrieve product data. I set up the database tables and schema to store product information and cart details. I used the Supabase JavaScript library to interact with the database, fetching products for display on the home screen and storing user-specific data like product lists and cart items.


- **Implement CRUD operations:** I then implemented CRUD (Create, Read, Update, Delete) operations on products and cart items. I built react components and backend API functions that allow users to add, edit, and delete products. I then added functionalities to add and remove items from the cart, updating the database accordingly.


- **Build cart and checkout functionality:** I then setup the cart view, where users can see the products they've added, along with their prices. I used React context to manage the cart data across components. I then implemented the checkout process, including delivery and payment information.

### Complete installation and set up instructions for running your app locally

```
git clone <repository_url>
npm install
npm run start
```

### Link to your user stories – who are your users, what do they want, and why?
- https://docs.google.com/document/d/1jk_RDx3eN98-sGYS-pNtPkNOjS3hpwAjIoOdppWAa-0/edit

### Link to or embed your wireframes – sketches of major views / interfaces in your application

### Descriptions of any unsolved problems or major hurdles you had to overcome
- Cart - Had to use contexts to make the cart usable from every component.
- Checkout process doesn’t change anything on the backend. Need to set up product quantity and order processing.
