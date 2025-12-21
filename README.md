# Assignment Service

## Purpose
Manages assignment of IT assets to employees.

## Prerequisites
- Node.js 18+
- PostgreSQL
- Asset Service running
- Employee Service running

## Environment Variables
ASSIGNMENT_DB_URL
ASSET_SERVICE_BASE_URL
EMPLOYEE_SERVICE_BASE_URL

## Run Locally

npm install
npm start

Service runs on port 8080.

## Initialize DB
POST /assignments/init-db

## APIs
POST /assignments
GET /assignments/employee/{employeeCode}
GET /assignments/asset/{assetId}
POST /assignments/{id}/return
