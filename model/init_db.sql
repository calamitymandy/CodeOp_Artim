--
-- Drop Tables
--

SET foreign_key_checks = 0;

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS ArtistProfiles;
DROP TABLE IF EXISTS ArtCategories;
DROP TABLE IF EXISTS Posts;


SET foreign_key_checks = 1;

--
-- Create Tables
--

CREATE TABLE Users
(
    UserID INT NOT NULL AUTO_INCREMENT,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    FullName VARCHAR(40) NOT NULL,
    Pronouns VARCHAR(40) NULL,
    UserCategory VARCHAR(255) NULL,
    UserAvatar VARCHAR(600) NULL,
    UserBio TEXT NULL,
    UserWeb VARCHAR(200) NULL,
    PRIMARY KEY (UserID)
);


INSERT INTO Users (Email, Password, FullName) VALUES

(
  "rosy.hunt@email.com",
  "$2b$10$HTqJU9vp4p6uW1bIqpmM1elQ5vi5soQLsbHqRdr6dgxeleZv4aL5K",
  "Rosy Hunt"
  ),

(
  "carlos.Lopez@email.com",
  "$2b$10$t5IfQ96eZFrgZ8Y57UWku.5PITs8wqAuVt4w7TC9cmjflaKlVgXOq",
  "Carlos Lopez"
  ),
  
(
 "hanna.artist@email.com",
 "$2b$10$fmXzrK.BB0l85WkwXcS/6.OYdrKluIZ.Q.6ktzrtmheJsejuvK2fy",
 "Hanna Sutton"
),


 (
 "janedoe@hotmail.com",
 "$2b$10$Hn3IVV6SLf.pPd4DZHTwUeuQaKJYZVr/whYfYiS2Sru8soh5iLeX6",
 "Jane Doe"

 );


CREATE TABLE ArtCategories
(
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    Category VARCHAR(60) NOT NULL,
    INDEX idx_category (Category)
);

INSERT INTO ArtCategories (Category) VALUES 
("Traditional Art"), 
("Digital Art"), 
("Audiovisual");


CREATE TABLE Posts (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    UserID INT NOT NULL,
    Title VARCHAR(200) NOT NULL,
    Category VARCHAR(60) NOT NULL,
    Body TEXT(1000) NOT NULL,
    Image1 VARCHAR(600) NOT NULL,
    Image2 VARCHAR(600) NULL,
    Image3 VARCHAR(600) NULL,
    Video VARCHAR(600) NULL,
    FOREIGN KEY (Category) REFERENCES ArtCategories (Category),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);


INSERT INTO Posts(UserID, Title, Category, Body, Image1, Video) VALUES 
(1, "We talk about Digital Art", "Digital Art", "In an age where technology continues to reshape our lives, art too has embraced the digital frontier, giving birth to an awe-inspiring realm of creativity known as digital art. This ever-evolving medium transcends the traditional confines of canvas and paint, inviting artists to explore endless possibilities and redefine the very essence of visual expression. In this post, we embark on a journey through the captivating world of digital art, where pixels become pigments and imagination knows no bounds.", "https://img.freepik.com/premium-photo/woman-s-face-is-made-up-geometric-shapes-cyberpunk-colorful-fractalism-cubism_834088-1.jpg", "https://youtu.be/2RWop0Gln24?si=y5wjQ2XRqeLmEPuS");

INSERT INTO Posts(UserID, Title, Category, Body, Image1, Image2) VALUES 
(2, "My Studio Time", "Traditional Art", "My Atlanta studio, a cozy space under 500 sq. ft., is my artistic haven. Its intimate size challenges me to be resourceful and focus solely on my art. Large windows let in Atlanta's soft sunlight, casting a warm glow on my creations. Weathered wooden floors tell stories of artistic growth. This space has been witness to my journey, from tentative strokes to bold brushwork, from self-doubt to self-assurance. It's where I confront fears and doubts, bear my soul on canvas, and discover the depths of my own creativity. My studio isn't just a place; it's a spiritual connection, a sanctuary for my artistry.","https://static.timesofisrael.com/atlantajewishtimes/uploads/2020/11/chai-style_DSC_1310_1-1.jpg" , "https://i.etsystatic.com/41069558/r/il/4e6525/4658628669/il_fullxfull.4658628669_bo06.jpg");

INSERT INTO Posts(UserID, Title, Category, Body,Image1, Video) VALUES 
(3, "Capturing London's Essence: A Filmmaker's Journey", "Audiovisual", "As a filmmaker based in London, I've had the privilege of witnessing this incredible city from behind the lens. In this blog post, I want to take you on a visual journey through some of my favorite locations in London and share the stories behind the scenes. The Iconic Tower Bridge. There's something timeless about the Tower Bridge. Its majestic architecture and the way it gracefully spans the River Thames never cease to inspire me. It's the perfect spot for capturing both the historic and modern sides of London in a single frame.","https://www.hastingsinternational.com/images/tower-bridge.jpg","https://youtu.be/Bl3akjUfM3U?si=XxewcbEwe2jUh8cr");

INSERT INTO Posts(UserID, Title, Category, Body, Image1, Video) VALUES 
(4, "The Artistry of Chalk Drawings: A World of Creativity on Pavement", "Traditional Art", "Chalk drawings, often overlooked, are a unique form of art that brings color and creativity to the most unexpected places. These temporary masterpieces can be found on sidewalks, walls, and even driveways. In a world filled with high-tech gadgets and digital art, there's something charmingly simple about chalk drawings that captivates both artists and spectators alike.", "https://www.signs.com/blog/wp-content/uploads/2013/08/hikers-e1376598722518.png","https://youtu.be/ms1CbzNNHhA?si=8QrQjGn1WWllDkU4");

