BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "users" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"name"	TEXT,
	"email"	TEXT,
	"salt"	TEXT,
	"hash"  TEXT
);
CREATE TABLE IF NOT EXISTS "matches" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"secretItemId"	INTEGER,
	"score"	INTEGER,
	"date"	DATE,
	"level"	INTEGER,
	"userId"	INTEGER
);
CREATE TABLE IF NOT EXISTS "itemSet" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"name"	TEXT,
	"class"	TEXT,
	"legs"	INTEGER,
	"fly"	INTEGER,
	"color"	TEXT,
	"extinct" INTEGER,
	"order" TEXT,
	"url" 	TEXT
);
INSERT INTO "users" VALUES (1,'luigi', 'luigi@test.com', 'rebkrvbrvibrekbvv','4ba46e2f4ec688ceced04fa454d4dc8a4bfc3207d1db8687ad993544e2792a3b');
INSERT INTO "users" VALUES (2,'frank','frank@test.com', 'x34n8y37f9n', 'fdfce0aac45c417af25a0b837e7978ead5f1168bf97c173e270b7d9955a0b997');
INSERT INTO "users" VALUES (3,'mario', 'mario@test.com', '387ey3xy743', '81cbc7c9172448acb296ecfaf64ffba169370e4fa7e665f97083142c61d52c22');
INSERT INTO "matches" VALUES (1,5,3,'2023-03-06',12,1);
INSERT INTO "matches" VALUES (2,5,3,'2022-03-15',32,1);
INSERT INTO "matches" VALUES (3,15,1,'2023-04-10',24,1);
INSERT INTO "matches" VALUES (4,20,4,'2023-05-26',24,1);
INSERT INTO "matches" VALUES (5,1,5,'2023-01-20',12,2);
INSERT INTO "matches" VALUES (6,25,0,'2022-07-09',32,2);
INSERT INTO "itemSet" VALUES (1,'woodpecker', 'bird',2, 1, 'green',	0, 'c', 'greenwoodpecker.jpg');
INSERT INTO "itemSet" VALUES (2,'electric eel', 'fish', 0,	0, 'grey',	0, 'c', 'electriceel.jpg');
INSERT INTO "itemSet" VALUES (3,'chameleon', 'reptile', 4,	0, 'red',0, 'c', 'chameleon.jpg');
INSERT INTO "itemSet" VALUES (4,'kangaroo', 'mammal', 4,0, 'brown',0, 'h', 'kangaroo.jpg');
INSERT INTO "itemSet" VALUES (5,'owl', 'bird', 2,1, 'white',0, 'c', 'owl.jpg');
INSERT INTO "itemSet" VALUES (6,'swan', 'bird', 2,	1, 'white',0, 'h', 'swan.jpg');
INSERT INTO "itemSet" VALUES (7,'red fish', 'fish', 0,	0, 'red',0, 'o', 'redfish.jpg');
INSERT INTO "itemSet" VALUES (8,'penguin', 'bird', 2, 0, 'black',0, 'c', 'penguin.jpg');
INSERT INTO "itemSet" VALUES (9,'monkey', 'mammal', 4,	0, 'red',0, 'o', 'monkey.jpg');
INSERT INTO "itemSet" VALUES (10,'horse', 'mammal', 4,	0, 'white',0, 'h', 'horse.jpg');
INSERT INTO "itemSet" VALUES (11,'canary', 'bird', 2, 1, 'yellow',0, 'h', 'canary.jpg');
INSERT INTO "itemSet" VALUES (12,'peacock', 'bird', 2, 0, 'blue',0, 'o', 'peacock.jpg');
INSERT INTO "itemSet" VALUES (13,'rabbit', 'mammal', 4,	0, 'grey',0, 'h', 'rabbit.jpg');
INSERT INTO "itemSet" VALUES (14,'king cobra', 'reptile', 0,0, 'striped',0, 'c', 'kingcobra.jpg');
INSERT INTO "itemSet" VALUES (15,'rhinoceros', 'mammal', 4,	0, 'white',1, 'h', 'rhinoceros.jpg');
INSERT INTO "itemSet" VALUES (16,'zebra', 'mammal', 4,	0, 'striped',0, 'h', 'zebra.jpg');
INSERT INTO "itemSet" VALUES (17,'cow', 'mammal', 4, 0, 'spots',0, 'h', 'cow.jpg');
INSERT INTO "itemSet" VALUES (18,'mammut', 'mammal', 4,	0, 'brown',1, 'h', 'mammut.jpg');
INSERT INTO "itemSet" VALUES (19,'polar bear', 'mammal', 4,	0, 'white',0, 'c', 'polarbear.jpg');
INSERT INTO "itemSet" VALUES (20,'dolphin', 'mammal', 0,	0, 'grey',0, 'c', 'dolphin.jpg');
INSERT INTO "itemSet" VALUES (21,'eagle', 'bird', 2, 1, 'brown',0, 'c', 'eagle.jpg');
INSERT INTO "itemSet" VALUES (22,'flamingo', 'bird', 2,	1, 'pink',0, 'o', 'flamingo.jpg');
INSERT INTO "itemSet" VALUES (23,'dodo', 'bird', 2,	0, 'white',1, 'o', 'dodo.jpg');
INSERT INTO "itemSet" VALUES (24,'panda', 'mammal', 4,	0, 'spots',0, 'h', 'panda.jpg');
INSERT INTO "itemSet" VALUES (25,'tiger', 'mammal', 4,	0, 'striped',0, 'c', 'tigre.jpg');
INSERT INTO "itemSet" VALUES (26,'cat', 'mammal', 4, 0, 'black',0, 'c', 'blackcat.jpg');
INSERT INTO "itemSet" VALUES (27,'frog', 'amphibian', 4,0, 'green',0, 'c', 'frog.jpg');
INSERT INTO "itemSet" VALUES (28,'rattlesnake', 'reptile', 0, 0, 'brown',0, 'c', 'rattlesnake.jpg');
INSERT INTO "itemSet" VALUES (29,'whale', 'mammal', 0, 0, 'blue',0, 'c', 'whale.jpg');
INSERT INTO "itemSet" VALUES (30,'bear', 'mammal', 4, 0, 'brown',0, 'c', 'bear.jpg');
INSERT INTO "itemSet" VALUES (31,'bat', 'mammal', 2,1, 'black', 0, 'o', 'bat.jpg');
INSERT INTO "itemSet" VALUES (32,'parrot', 'bird', 2, 1, 'red', 0, 'o', 'parrot.jpg');
INSERT INTO "itemSet" VALUES (33,'red lionfish', 'fish', 0, 0, 'red', 0, 'c', 'lionfish.jpg');
INSERT INTO "itemSet" VALUES (34,'ostrich', 'bird', 2, 0, 'black', 0, 'h', 'ostrich.jpg');
INSERT INTO "itemSet" VALUES (35,'dart frog', 'amphibian', 4, 0, 'blue', 0, 'c', 'dartfrog.jpg');
INSERT INTO "itemSet" VALUES (36,'green mamba', 'reptile', 0, 0, 'green', 0, 'c', 'mamba.jpg');

COMMIT;
