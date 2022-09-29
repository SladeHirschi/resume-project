CREATE TABLE users (
	id INT NOT NULL auto_increment,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    date_of_birth VARCHAR(255) DEFAULT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id)
);