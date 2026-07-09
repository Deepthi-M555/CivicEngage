# 🏛️ CivicEngage – NGO Management System (Backend Core)

This repository contains the robust, secure, and scalable RESTful API backend engineered for the **CivicEngage NGO Management System**[cite: 1]. Built using the Node.js ecosystem, this subsystem handles secure entity authentication and full-lifecycle campaign orchestration[cite: 1].

---

## 🛠️ Tech Stack & Architecture

*   **Runtime Environment:** Node.js[cite: 1]
*   **Framework:** Express.js (REST API Architecture)[cite: 1]
*   **Database:** MongoDB[cite: 1]
*   **ODM:** Mongoose[cite: 1]
*   **Security & Encryption:** JSON Web Tokens (JWT), bcrypt[cite: 1]
*   **Testing Suite:** Postman[cite: 1]

---

## 🚀 Core Modules & Technical Implementation

### 1. Cryptographic Authentication & Security Subsystem
*   **Secure Onboarding:** Implemented an NGO Registration (Signup) protocol capturing vital organizational telemetry including NGO Name, Email, Phone Number, Address, and Password[cite: 1].
*   **At-Rest Encryption:** Zero plain-text footprint. Integrated `bcrypt` to deterministically hash user credentials prior to MongoDB database storage[cite: 1].
*   **Stateless Authorization:** Engineered a high-performance JWT (JSON Web Token) generation pipeline upon successful validation of verified emails and matching hashes[cite: 1].
*   **Gatekeeper Middleware:** Built custom authentication middleware that validates incoming bearer tokens, extracts the logged-in NGO ID, and blocks unauthenticated access to campaign-related APIs[cite: 1].

### 2. Campaign Lifecycle Management (CRUD Engine)
Engineered an isolated, authenticated CRUD engine allowing NGOs absolute control over their operational initiatives[cite: 1]:
*   **Creation Engine:** Validates and initializes structural data models including Campaign Title, Description, Goal Amount, Location, and Timeline Bounds (`Start/End Dates`), initializing `Raised Amount` to `0` and `Status` to `Active`[cite: 1].
*   **Isolated Fetching:** Scopes queries to return data sets strictly matching the authenticated `NGO ID`.
*   **Granular Modification & Deletion:** Enforces strict ownership verification before executing updates or hard deletes on targeted Campaign documents.

---

## 📊 Database Architecture & Relations

The data layer uses an optimized relational approach inside a non-relational database engine, establishing a **One-to-Many ($1 \rightarrow N$) relationship** between organizations and initiatives. One NGO can create multiple campaigns.
