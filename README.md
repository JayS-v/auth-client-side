# Client-Side Authentication App

## Description
Next.js/Tailwind CSS based authentication app with protected dynamic routes, Server-Side Rendering and JWT token management

## Features
- **Client-Side Authentication**: Secure client-side authentication using JWT tokens stored in cookies and removed upon logout
- **Dynamic Routing and Server-Side Rendering**: Next.js server-side components and URL management based on dynamic navigation and data fetching
- **Protected Pages**: Custom hooks checking authentication tokens to secure specific pages
- **Tailwind CSS Integration**

## Try the Deployed App: [auth-client-app.jayseyidov.com](https://auth-client-app.jayseyidov.com)
You can log in using pre-filled data: 

<p align="center">
    <img src="https://api.jayseyidov.com/auth-client-app-screens/login-page-screen.jpg" width="500" alt="Login page screen"/>
</p>

Or [create your account](https://auth-client-app.jayseyidov.com/registration). Ensure to **enter only fake data** for testing purposes!

<p align="center">
    <img src="https://api.jayseyidov.com/auth-client-app-screens/registration-page-screen.jpg" width="500" alt="Registration page screen"/>
</p>


## Set up locally

1. **Clone the Repository**: Clone this repository to your local machine
2. **Install Dependencies**: Run `npm install` to install all necessary dependencies
3. **Set Up Environment Variables**: Create a `.env` file based on the provided `.env.example` and configure environment variables. You can use my backend authentification API: `NEXT_PUBLIC_BACKEND_URL=auth-server-api.jayseyidov.com` or set it up [locally](https://github.com/JayS-v/auth-server) : `NEXT_PUBLIC_BACKEND_URL_LOCAL=http://localhost:8080`. *Please note that these endpoints are for testing purposes only and should not be used in a production environment! When using these endpoints, ensure to **enter only fake data** for testing purposes!*

4. **Run the Development Server**: Execute `npm run dev` to launch the app

## Project Structure

- **`pages/`**: Contains Next.js pages for routing and dynamic URL queries, including protected pages: 

<p align="center">
    <img src="https://api.jayseyidov.com/auth-client-app-screens/main-page-screen.jpg" width="500" alt="Main page screen"/>
</p>

- **`pages/api`**: Server side functions to save tokens as Http only cookies or to remove them upon logout
- **`components/`**: Contains reusable React components
- **`lib/`**: Contains utility functions, custom hooks for authentication and token management and Higher-Order Components for page protection
- **`styles/`**: Contains reusable CSS modules based on Tailwind CSS

## Contributing

Contributions are welcome! If you encounter any issues, have suggestions for improvements, or would like to contribute new features, feel free to open an issue or submit a pull request

## License

This project is licensed under the ISC License. Refer to the `LICENSE` file for details.
