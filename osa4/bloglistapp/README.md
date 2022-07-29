TODO
- parempi dokumentaatio, että pääsee taas vauhtiin kun jää kesken ja aloittaa uudestaan
- Docker-konffit järkevämmiksi:
-- dev-kontille volume?
-- testikontti
- ohjeet dockerille

.env-tiedosto:
PORT=3000
MONGODB_URI=???
MONGODB_TEST_URI=???

Create MongoDB Docker container for dev:
docker run -d --name mongodev -v $PWD/devdata:/data/db -p 27016:27017 mongo

MongoDB Docker container for tests?
docker run -d --name mongotest mongo

