CREATE TABLE users (
  id uuid PRIMARY KEY NOT NULL,
  name CHARACTER VARYING(30),
  address CHARACTER VARYING(255),
  department CHARACTER VARYING(30),
  skill CHARACTER VARYING(50)
);

INSERT INTO users VALUES ('c13bf598-a9b3-4658-8a67-480e43624a1a','John Smith', '123 Mabolo Ave', 'Engineering', 'Java'), 
('da05a73e-b0fb-4bef-82ce-0a3df25ce23e','Mike Fernandez', '453 Cebu St', 'Engineering', 'Javascript'),
('1e1384b5-0e07-45ae-abdf-09dbe115dc32', 'Jose Rizal', '333 Intramuros Ave', 'Engineering', 'SQL'),
('9ab4117c-5774-4894-8d99-df3b508e7b87','Lapu Lapu', '444 Mactan Street', 'Engineering', 'Java')
