# Prosjekt 3

## Prerequisite

MongoDB må lastes ned og kjøres lokalt under utvikling, og da vil databasen kjøres på mongodb://127.0.0.1:27017. Se https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/ for hvordan installere MongoDB på Mac, og https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/ for hvordan installere det på Windows.

## Bytte mellom databaser

Per nå er appen koblet til databasen som ligger i VM-en. For å bruke lokal database, må du bare endre variabelen, `mongoDBURL` i `config.js` filen til å peke på linken til den lokal databasen i stedet. Den er lagt til som kommentar i config filen nå.
Husk at du må koble på vpn for å kunne bruke databasen fra VM-en.

## Sette opp lokal database

1. Etter å ha lastet ned mongoDB, kjør den lokale databasen ved å bruke kommandoen `mongosh`.
2. Last ned MongoDB compass: https://www.mongodb.com/try/download/compass og åpne linken til databasen (vil på default være mongodb://localhost:27017/test).
3. Importer data fra backend/resources/movies.json til kolleksjonen, `movies`.

## Starte server

For å kjøre backend:

1.  `cd backend`
2.  `npm start`
    Du vil da få opp playground som er en UI av Apollo Server for å teste graphql queries og mutations.

For å starte Frontend:

1. `cd frontend`
2. `npm start`
   Frontend er vanlig react applikasjon. Er enda work in process å få frontend til å koble mot graphql serveren.

## Database

Data er hentet fra https://github.com/FEND16/movie-json-data/blob/master/json/movies-coming-soon.json.
