CREATE TABLE work_data (
	id INT NOT NULL auto_increment,
    user_id INT NOT NULL,
    occupation VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    hyperlink VARCHAR(255) DEFAULT NULL,
    description VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    
    PRIMARY KEY (id),
    FOREIGN KEY (user_id)
		REFERENCES users(id)
		ON UPDATE CASCADE ON DELETE RESTRICT
	
);