CREATE TABLE users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) NULL,
    address VARCHAR(255) NULL,
    role VARCHAR(10) NOT NULL DEFAULT 'user',
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME NOT NULL DEFAULT GETDATE()
);
GO

-- Optional: Enforce allowed roles
ALTER TABLE users
ADD CONSTRAINT CHK_users_role CHECK (role IN ('user', 'admin'));
GO

CREATE TABLE parcels (
    parcel_id INT IDENTITY(1,1) PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    pickup_location VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME NOT NULL DEFAULT GETDATE(),
    deleted_at DATETIME NULL,
    CONSTRAINT FK_parcels_sender FOREIGN KEY (sender_id) REFERENCES users(user_id),
    CONSTRAINT FK_parcels_receiver FOREIGN KEY (receiver_id) REFERENCES users(user_id)
);
GO

ALTER TABLE parcels
ADD CONSTRAINT CHK_parcels_status CHECK (status IN ('pending', 'in transit', 'delivered', 'cancelled'));
GO

CREATE TABLE parcel_updates (
    update_id INT IDENTITY(1,1) PRIMARY KEY,
    parcel_id INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    updated_by INT NULL,
    update_message VARCHAR(255) NULL,
    updated_at DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_parcel_updates_parcel FOREIGN KEY (parcel_id) REFERENCES parcels(parcel_id)
);
GO

ALTER TABLE parcel_updates
ADD CONSTRAINT CHK_parcel_updates_status CHECK (status IN ('pending', 'in transit', 'delivered', 'cancelled'));
GO


CREATE TABLE notifications (
    notification_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    parcel_id INT NULL,
    message VARCHAR(255) NOT NULL,
    type VARCHAR(10) NOT NULL DEFAULT 'email',
    status VARCHAR(10) NOT NULL DEFAULT 'sent',
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_notifications_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);
GO

ALTER TABLE notifications
ADD CONSTRAINT CHK_notifications_type CHECK (type IN ('email'));
GO

ALTER TABLE notifications
ADD CONSTRAINT CHK_notifications_status CHECK (status IN ('sent', 'failed'));
GO

CREATE PROCEDURE sp_manageUser
    @p_user_id INT,
    @p_username VARCHAR(255),
    @p_email VARCHAR(255),
    @p_password VARCHAR(255),
    @p_phone_number VARCHAR(50),
    @p_address VARCHAR(255),
    @p_role VARCHAR(10),
    @p_action VARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;

    IF (@p_action = 'INSERT')
    BEGIN
        INSERT INTO users (username, email, password, phone_number, address, role, created_at, updated_at)
        VALUES (@p_username, @p_email, @p_password, @p_phone_number, @p_address, @p_role, GETDATE(), GETDATE());
    END
    ELSE IF (@p_action = 'UPDATE')
    BEGIN
        UPDATE users 
        SET username = @p_username,
            email = @p_email,
            password = CASE WHEN @p_password IS NOT NULL THEN @p_password ELSE password END,
            phone_number = @p_phone_number,
            address = @p_address,
            updated_at = GETDATE()
        WHERE user_id = @p_user_id;
    END
END
GO



CREATE PROCEDURE sp_getUserByUsername
    @p_username VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM users WHERE username = @p_username;
END
GO


CREATE PROCEDURE sp_getUserById
    @p_user_id INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM users WHERE user_id = @p_user_id;
END
GO



CREATE PROCEDURE sp_manageParcel
<<<<<<< HEAD
    @p_parcel_id INT,
    @p_sender_id INT,
    @p_receiver_id INT,
    @p_pickup_location VARCHAR(255),
    @p_destination VARCHAR(255),
    @p_status VARCHAR(20),
    @p_updated_by INT,
=======
    @p_parcel_id INT = NULL,
    @p_sender_id INT = NULL,
    @p_receiver_id INT = NULL,
    @p_pickup_location VARCHAR(255) = NULL,
    @p_destination VARCHAR(255) = NULL,
    @p_status VARCHAR(20) = NULL,
    @p_updated_by INT = NULL,
>>>>>>> 5befa322306a6ce5631946bdb3a2ba248b8366e2
    @p_action VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;

<<<<<<< HEAD
    IF (@p_action = 'INSERT')
=======
    IF @p_action = 'INSERT'
>>>>>>> 5befa322306a6ce5631946bdb3a2ba248b8366e2
    BEGIN
        INSERT INTO parcels (sender_id, receiver_id, pickup_location, destination, status, created_at, updated_at)
        VALUES (@p_sender_id, @p_receiver_id, @p_pickup_location, @p_destination, @p_status, GETDATE(), GETDATE());
    END
<<<<<<< HEAD
    ELSE IF (@p_action = 'UPDATE_STATUS')
=======
    ELSE IF @p_action = 'UPDATE_STATUS'
>>>>>>> 5befa322306a6ce5631946bdb3a2ba248b8366e2
    BEGIN
        UPDATE parcels 
        SET status = @p_status,
            updated_at = GETDATE()
        WHERE parcel_id = @p_parcel_id AND deleted_at IS NULL;
        
<<<<<<< HEAD
        -- Record the update in parcel_updates
        INSERT INTO parcel_updates (parcel_id, status, updated_by, update_message, updated_at)
        VALUES (@p_parcel_id, @p_status, @p_updated_by, 'Status updated to ' + @p_status, GETDATE());
    END
=======
        -- Ensure we do not insert NULL status into parcel_updates
        INSERT INTO parcel_updates (parcel_id, status, updated_by, update_message, updated_at)
        VALUES (@p_parcel_id, @p_status, @p_updated_by, 'Status updated to ' + @p_status, GETDATE());
    END
    ELSE IF @p_action = 'UPDATE_DETAILS'
    BEGIN
        -- Get the current status of the parcel
        DECLARE @current_status VARCHAR(20);
        SELECT @current_status = status FROM parcels WHERE parcel_id = @p_parcel_id;

        UPDATE parcels
        SET pickup_location = @p_pickup_location,
            destination = @p_destination,
            updated_at = GETDATE()
        WHERE parcel_id = @p_parcel_id AND deleted_at IS NULL;
        
        -- Ensure we log an update with the correct status
        INSERT INTO parcel_updates (parcel_id, status, updated_by, update_message, updated_at)
        VALUES (@p_parcel_id, @current_status, @p_updated_by, 'Parcel details updated', GETDATE());
    END
    ELSE IF @p_action = 'DELETE'
    BEGIN
        UPDATE parcels
        SET deleted_at = GETDATE(),
            updated_at = GETDATE()
        WHERE parcel_id = @p_parcel_id AND deleted_at IS NULL;
    END
    ELSE
    BEGIN
        RAISERROR('Invalid action specified', 16, 1);
    END
>>>>>>> 5befa322306a6ce5631946bdb3a2ba248b8366e2
END
GO



CREATE PROCEDURE sp_getParcelById
    @p_parcel_id INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM parcels 
    WHERE parcel_id = @p_parcel_id AND deleted_at IS NULL;
END
GO


CREATE PROCEDURE sp_getParcelsByUserId
    @p_user_id INT
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Parcels sent by the user
    SELECT * FROM parcels 
    WHERE sender_id = @p_user_id AND deleted_at IS NULL;
    
    -- Parcels received by the user
    SELECT * FROM parcels 
    WHERE receiver_id = @p_user_id AND deleted_at IS NULL;
END
GO


CREATE PROCEDURE sp_manageNotification
    @p_notification_id INT,
    @p_user_id INT,
    @p_parcel_id INT,
    @p_message VARCHAR(255),
    @p_type VARCHAR(10),
    @p_status VARCHAR(10),
    @p_action VARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;

    IF (@p_action = 'INSERT')
    BEGIN
        INSERT INTO notifications (user_id, parcel_id, message, type, status, created_at)
        VALUES (@p_user_id, @p_parcel_id, @p_message, @p_type, @p_status, GETDATE());
    END
END
GO


<<<<<<< HEAD
=======
CREATE PROCEDURE sp_getAllParcels
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM parcels 
    WHERE deleted_at IS NULL;
END
GO



>>>>>>> 5befa322306a6ce5631946bdb3a2ba248b8366e2







