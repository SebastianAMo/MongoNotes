# 👉 Step 1: Start container

> I have to remind again in case you missed 😊
> If you need to set cluster with keyfile authentication, [check here](https://github.com/minhhungit/mongodb-cluster-docker-compose/tree/Feature/Auth/with-keyfile-auth)

Clone this repository, open powershell or cmd on the repo folder and run:

```bash
docker-compose up -d
```

## 👉 Step 2: Initialize the replica sets (config servers and shards)

Run these command one by one:

```bash
docker-compose exec mongo_container sh -c "mongosh < /init-mongo.js"
```

If you get error like "E QUERY    [thread1] SyntaxError: unterminated string literal @(shellhelp2)", problem maybe due to:

>On Unix, you will get this error if your script has Dos/Windows end of lines (CRLF) instead of Unix end of lines (LF).

To fix it, modify script files in `scripts` folder, remove newline, change multi line to one line.

Or save the file with Unix mode in notepad++ [Edit menu => EOL Conversion => Unix](https://github.com/minhhungit/mongodb-cluster-docker-compose/tree/master/assets/EOL-unix-mode.png)

Link: <https://stackoverflow.com/a/51728442/3007147>

## 👉 Step 3: Initializing the router

>Note: Wait a bit for the config server and shards to elect their primaries before initializing the router

```bash
m
```

## 👉 Step 4: Enable sharding and setup sharding-key

```bash
docker-compose exec router01 mongosh --port 27017

// Enable sharding for database `MyDatabase`
sh.enableSharding("MyDatabase")

// Setup shardingKey for collection `MyCollection`**
db.adminCommand( { shardCollection: "MyDatabase.Notes", key: { oemNumber: "hashed", zipCode: 1, supplierId: 1 } } )

```
