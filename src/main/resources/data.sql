INSERT INTO appuser (email, username, password) VALUES ('johndoe@mail.com', 'johnDoe', '$2a$10$Atm57glf1cUZLqvkdv6t1eZv30tGnW9bkUy5L3l8fNEPrMzh47G/i');
INSERT INTO appuser (email, username, password) VALUES ('alexJr@mail.com', 'alexJr', '$2a$10$Atm57glf1cUZLqvkdv6t1eZv30tGnW9bkUy5L3l8fNEPrMzh47G/i');

INSERT INTO trip (user_id, name, startDate, endDate) VALUES (1, 'London', '2025-06-13', '2025-06-13');
INSERT INTO trip (user_id, name, startDate, endDate) VALUES (1, 'Oslo', '2025-08-17', '2025-08-21');
INSERT INTO trip (user_id, name, startDate, endDate) VALUES (1, 'Berlin', '2026-03-10', '2025-03-13');
INSERT INTO destination (trip_id, name, startDate, endDate) VALUES (1, 'London Eye', '2025-06-13 10:30:00', '2025-06-13 11:30:00');
INSERT INTO destination (trip_id, name, startDate, endDate) VALUES (1, 'Buckingham Palace', '2025-06-13 12:00:00', '2025-06-13 15:30:00');
INSERT INTO destination (trip_id, name, startDate, endDate) VALUES (1, 'Restaurant', '2025-06-13 16:15:00', '2025-06-13 18:00:00');

INSERT INTO trip (user_id, name, startDate, endDate) VALUES (2, 'Warsaw', '2025-07-21', '2025-07-28');
INSERT INTO trip (user_id, name, startDate, endDate) VALUES (2, 'New York', '2025-08-17', '2025-08-21');