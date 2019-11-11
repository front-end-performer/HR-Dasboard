DROP TABLE IF EXISTS admin CASCADE;

CREATE TABLE admin(
    id SERIAL PRIMARY KEY,
    admin_first VARCHAR(255) NOT NULL CHECK(admin_first != ''),
    admin_last VARCHAR(255) NOT NULL CHECK(admin_last != ''),
    admin_imgurl VARCHAR(300),
    admin_bio VARCHAR(300),
    admin_email VARCHAR NOT NULL UNIQUE,
    admin_password VARCHAR(255) NOT NULL,
    admin_time_stamp TIMESTAMP NOT NULL DEFAULT NOW()
);

-- INSERT INTO admin (admin_first, admin_last, admin_email, admin_password, admin_imgurl, admin_bio) VALUES ('admin', 'admin', 'admin@admin.com', '$2a$10$2jXFpRYDEWKCNNGzRv7jqu31hokr1Od2NIm5DxeGeEasCphvX9GMu', 'https://randomuser.me/api/portraits/lego/6.jpg', 'Tequila! ⛲️🍟🐴');