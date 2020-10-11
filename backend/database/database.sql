CREATE DATABASE CellMindMap;

CREATE TABLE cells_properties (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(1000) NOT NULL,
    description VARCHAR(100),
    position INT(11) NOT NULL,
    idStemCell INT(11) NOT NULL,
    date_added DATETIME DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE cells_properties;

CREATE TABLE cells_trees (
    bar  int[] default '{}'
);



CREATE DATABASE CellMindMapUnitTest;

CREATE TABLE cells_properties (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(1000) NOT NULL,
    description VARCHAR(100),
    position INT(11) NOT NULL,
    idStemCell INT(11) NOT NULL,
    date_added DATETIME DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE cells_properties;

CREATE TABLE cells_trees (
    bar  int[] default '{}'
);