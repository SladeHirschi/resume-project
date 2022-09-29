CREATE TABLE basic_info (
	id INT NOT NULL auto_increment,
    user_id INT NOT NULL,
    label VARCHAR(255),
    `value` VARCHAR(255),
    hyperlink VARCHAR(255),
    
    PRIMARY KEY (id),
    FOREIGN KEY (user_id)
		REFERENCES users(id)
		ON UPDATE CASCADE ON DELETE RESTRICT
	
);