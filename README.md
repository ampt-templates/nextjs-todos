<p align="center">
    <div width="100%" align="center">
        <h1>Ampt + Next.js Template</h1>
    </div>
    <p align="center">
        <img src="https://ampt.dev/public/templates/ampt-api.svg" alt="ampt-logo" width="180" height="150" />
        <img src="https://ampt.dev/public/templates/nextjs.svg" alt="nuxt-logo" width="180"height="150" />
    </p>
</p>

## Welcome to Ampt!

[<img src="https://getampt.com/button"/>](https://ampt.dev/start?template=nextjs-todos)

To run this app locally, simply clone down this repository and run `ampt`. You may need to login to the Ampt CLI if you haven't already (you can install this by running `npm install -g @ampt/cli`). To start the local development server, run `ampt dev` or `dev` in the Ampt shell.

This project uses a mix of Express (`./api`) and Next.js (`./app`) to show how you can use Ampt with a Next.js app. The Express server is used to serve the API, and the Next.js app is used to serve the frontend. The frontend is a simple todo app that uses the API to create, read, and delete todos. Outbound requests from the app are proxied through the Next.js server to the API, so even when running the Next app locally, you can still make requests to the API running on your personal sandbox (and mutate its respective `@ampt/data` values).

Once you're up and running, visit the [Ampt Dashboard](https://ampt.dev) to see an overview of your app. Here, you can query data stored with `@ampt/data`, view logs, and more.


Testing branch deploys
