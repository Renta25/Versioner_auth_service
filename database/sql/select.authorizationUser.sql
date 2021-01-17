SELECT 
    id, 
    name, 
    surname, 
    email, 
    pass, 
    active
FROM accounts
WHERE
    LOWER(email) = LOWER(?)
    AND pass = SHA2(?, 256)
    AND  active = true;