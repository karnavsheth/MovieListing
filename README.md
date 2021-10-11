# MovieListing
 
<b>Overview of Stack</b>
</br>
<i>Server:</i>
ASP.NET Core 3.1<br/>
<i>Client:</i>
React 16
CSS Modules
axios API for REST requests

</br>
<b>For the sake of simplicity json file is being used as datastore, which can replaced any database easily.</b>


## Setup

1. Install the following:
   - [.NET Core 3.1](https://www.microsoft.com/net/core)
   - [Node.js >= v8](https://nodejs.org/en/download/)
   
2. Run `npm install && npm start`
3. Open browser and navigate to [http://localhost:5000](http://localhost:5000).


## Scripts

### `npm install`

When first cloning the repo or adding new dependencies, run this command.  This will:

- Install Node dependencies from package.json
- Install .NET Core dependencies from api/api.csproj and api.test/api.test.csproj (using dotnet restore)

### `npm start`

To start the app for development, run this command.  This will:

- Run `docker-compose up` to ensure the PostgreSQL and MailCatcher Docker images are up and running
- Run `dotnet watch run` which will build the app (if changed), watch for changes and start the web server on http://localhost:5000
- Run Webpack dev middleware with HMR via [ASP.NET JavaScriptServices](https://github.com/aspnet/JavaScriptServices)
