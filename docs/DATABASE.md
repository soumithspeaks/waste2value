# Database Schema

## Tables

### users
User accounts for waste generators

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | User ID |
| name | VARCHAR | NOT NULL | Full name |
| email | VARCHAR | UNIQUE, NOT NULL | Email address |
| phone | VARCHAR | UNIQUE, NOT NULL | Phone number |
| password | VARCHAR | NOT NULL | Hashed password |
| profilePicture | VARCHAR | | Profile image URL |
| isVerified | BOOLEAN | DEFAULT false | Email/phone verified |
| isActive | BOOLEAN | DEFAULT true | Account status |
| totalWasteRecycled | FLOAT | DEFAULT 0 | Total weight in kg |
| carbonFootprintSaved | FLOAT | DEFAULT 0 | Carbon saved in kg |
| totalEarnings | DECIMAL(10,2) | DEFAULT 0 | Total earnings |
| referralCode | VARCHAR | UNIQUE | Referral code |
| referredBy | UUID | FOREIGN KEY | Who referred this user |
| fcmToken | TEXT | | Firebase token |
| preferences | JSONB | | User preferences |
| lastLoginAt | TIMESTAMP | | Last login time |
| createdAt | TIMESTAMP | | Created timestamp |
| updatedAt | TIMESTAMP | | Updated timestamp |

### agents
Waste collection agents

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Agent ID |
| name | VARCHAR | NOT NULL | Full name |
| email | VARCHAR | UNIQUE, NOT NULL | Email address |
| phone | VARCHAR | UNIQUE, NOT NULL | Phone number |
| password | VARCHAR | NOT NULL | Hashed password |
| profilePicture | VARCHAR | | Profile image URL |
| isVerified | BOOLEAN | DEFAULT false | Verified status |
| isActive | BOOLEAN | DEFAULT true | Account status |
| isOnline | BOOLEAN | DEFAULT false | Online status |
| currentLocation | GEOMETRY(POINT) | | Current location |
| locationUpdatedAt | TIMESTAMP | | Location update time |
| vehicleType | ENUM | NOT NULL | bike/auto/van/truck |
| vehicleNumber | VARCHAR | NOT NULL | Vehicle registration |
| vehicleCapacity | FLOAT | | Capacity in kg |
| assignedGodownId | UUID | FOREIGN KEY | Assigned godown |
| rating | DECIMAL(3,2) | DEFAULT 0 | Average rating |
| totalRatings | INTEGER | DEFAULT 0 | Number of ratings |
| totalPickups | INTEGER | DEFAULT 0 | Completed pickups |
| totalEarnings | DECIMAL(10,2) | DEFAULT 0 | Total earnings |
| acceptanceRate | DECIMAL(5,2) | DEFAULT 0 | Acceptance rate % |
| completionRate | DECIMAL(5,2) | DEFAULT 0 | Completion rate % |
| documents | JSONB | | Document URLs |
| bankDetails | JSONB | | Bank account info |
| fcmToken | TEXT | | Firebase token |
| lastActiveAt | TIMESTAMP | | Last active time |
| createdAt | TIMESTAMP | | Created timestamp |
| updatedAt | TIMESTAMP | | Updated timestamp |

### pickups
Waste pickup requests

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Pickup ID |
| userId | UUID | FOREIGN KEY | User who requested |
| agentId | UUID | FOREIGN KEY | Assigned agent |
| wasteTypeId | UUID | FOREIGN KEY | Type of waste |
| addressId | UUID | FOREIGN KEY | Pickup address |
| status | ENUM | DEFAULT 'pending' | Current status |
| estimatedWeight | FLOAT | NOT NULL | Estimated weight kg |
| actualWeight | FLOAT | | Actual weight kg |
| images | TEXT[] | | Image URLs |
| aiClassification | JSONB | | AI results |
| estimatedPayment | DECIMAL(10,2) | NOT NULL | Estimated amount |
| actualPayment | DECIMAL(10,2) | | Actual amount |
| scheduledFor | TIMESTAMP | | Scheduled time |
| pickupOTP | VARCHAR(6) | | Verification OTP |
| agentReachedAt | TIMESTAMP | | Agent arrival time |
| startedAt | TIMESTAMP | | Pickup start time |
| completedAt | TIMESTAMP | | Completion time |
| cancelledAt | TIMESTAMP | | Cancellation time |
| cancelledBy | ENUM | | Who cancelled |
| cancellationReason | TEXT | | Reason for cancel |
| notes | TEXT | | Additional notes |
| createdAt | TIMESTAMP | | Created timestamp |
| updatedAt | TIMESTAMP | | Updated timestamp |

### waste_types
Types of waste materials

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Waste type ID |
| name | VARCHAR | UNIQUE, NOT NULL | Waste type name |
| category | ENUM | NOT NULL | Main category |
| subCategory | VARCHAR | | Sub-category |
| description | TEXT | | Description |
| pricePerKg | DECIMAL(10,2) | NOT NULL | Price per kg |
| icon | VARCHAR | | Icon URL |
| color | VARCHAR | | Display color |
| isActive | BOOLEAN | DEFAULT true | Active status |
| recyclingInstructions | TEXT | | Instructions |
| environmentalImpact | JSONB | | Impact metrics |
| createdAt | TIMESTAMP | | Created timestamp |
| updatedAt | TIMESTAMP | | Updated timestamp |

### payments
Payment transactions

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Payment ID |
| pickupId | UUID | FOREIGN KEY | Related pickup |
| userId | UUID | FOREIGN KEY | User receiving |
| agentId | UUID | FOREIGN KEY | Agent earning |
| amount | DECIMAL(10,2) | NOT NULL | Total amount |
| agentCommission | DECIMAL(10,2) | NOT NULL | Agent commission |
| platformFee | DECIMAL(10,2) | DEFAULT 0 | Platform fee |
| userPayout | DECIMAL(10,2) | NOT NULL | User payout |
| status | ENUM | DEFAULT 'pending' | Payment status |
| paymentMethod | ENUM | DEFAULT 'wallet' | Payment method |
| transactionId | VARCHAR | UNIQUE | Transaction ID |
| gatewayResponse | JSONB | | Gateway response |
| processedAt | TIMESTAMP | | Processing time |
| failureReason | TEXT | | Failure reason |
| createdAt | TIMESTAMP | | Created timestamp |
| updatedAt | TIMESTAMP | | Updated timestamp |

### godowns
Waste collection centers

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Godown ID |
| name | VARCHAR | NOT NULL | Godown name |
| location | GEOMETRY(POINT) | NOT NULL | GPS location |
| address | TEXT | NOT NULL | Full address |
| capacity | FLOAT | NOT NULL | Total capacity kg |
| currentLoad | FLOAT | DEFAULT 0 | Current load kg |
| operatingHours | JSONB | | Operating hours |
| isActive | BOOLEAN | DEFAULT true | Active status |
| contactPerson | VARCHAR | | Contact person |
| contactPhone | VARCHAR | | Contact number |
| wasteTypesAccepted | TEXT[] | | Accepted types |
| createdAt | TIMESTAMP | | Created timestamp |
| updatedAt | TIMESTAMP | | Updated timestamp |

### addresses
User addresses

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Address ID |
| userId | UUID | FOREIGN KEY | Owner user |
| label | VARCHAR | | Address label |
| fullAddress | TEXT | NOT NULL | Full address |
| landmark | VARCHAR | | Nearby landmark |
| location | GEOMETRY(POINT) | NOT NULL | GPS location |
| city | VARCHAR | | City |
| state | VARCHAR | | State |
| pincode | VARCHAR | | Postal code |
| country | VARCHAR | DEFAULT 'India' | Country |
| isDefault | BOOLEAN | DEFAULT false | Default address |
| createdAt | TIMESTAMP | | Created timestamp |
| updatedAt | TIMESTAMP | | Updated timestamp |

### ratings
Agent ratings

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Rating ID |
| pickupId | UUID | UNIQUE, FOREIGN KEY | Related pickup |
| userId | UUID | FOREIGN KEY | User rating |
| agentId | UUID | FOREIGN KEY | Rated agent |
| rating | INTEGER | NOT NULL (1-5) | Rating value |
| review | TEXT | | Review text |
| tags | TEXT[] | | Rating tags |
| createdAt | TIMESTAMP | | Created timestamp |
| updatedAt | TIMESTAMP | | Updated timestamp |

### wallets
User and agent wallets

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Wallet ID |
| userId | UUID | FOREIGN KEY | Owner user |
| agentId | UUID | FOREIGN KEY | Owner agent |
| balance | DECIMAL(10,2) | DEFAULT 0 | Current balance |
| totalEarnings | DECIMAL(10,2) | DEFAULT 0 | Total earnings |
| totalWithdrawals | DECIMAL(10,2) | DEFAULT 0 | Total withdrawn |
| pendingAmount | DECIMAL(10,2) | DEFAULT 0 | Pending amount |
| createdAt | TIMESTAMP | | Created timestamp |
| updatedAt | TIMESTAMP | | Updated timestamp |

## Indexes

- User: email, phone, referralCode
- Agent: email, phone, isOnline, currentLocation (GIST)
- Pickup: userId, agentId, status, scheduledFor, createdAt
- WasteType: category, name
- Payment: pickupId, userId, agentId, status, transactionId
- Godown: location (GIST), isActive
- Address: userId, location (GIST)
- Rating: pickupId, userId, agentId, rating
- Wallet: userId, agentId

## Relationships

- User → Pickups (1:N)
- User → Addresses (1:N)
- User → Wallet (1:1)
- User → Ratings Given (1:N)
- Agent → Pickups (1:N)
- Agent → Godown (N:1)
- Agent → Wallet (1:1)
- Agent → Ratings Received (1:N)
- Pickup → User (N:1)
- Pickup → Agent (N:1)
- Pickup → WasteType (N:1)
- Pickup → Address (N:1)
- Pickup → Payment (1:1)
- Pickup → Rating (1:1)
- Payment → Pickup (1:1)
- Payment → User (N:1)
- Payment → Agent (N:1)
- Rating → User (N:1)
- Rating → Agent (N:1)
- Rating → Pickup (1:1)
