# Project Documentation

## Overview

This project implements a Telegram bot that provides weather updates and logs user requests. The bot interacts with the Weather API to fetch weather information for specified cities. The logged requests can be accessed via specific endpoints, enabling users to retrieve their weather queries and manage their settings.

## API Endpoints

### 1. `/logs/`

#### **Method**: `GET`

#### **Description**:
The `/logs/` endpoint retrieves a paginated list of all logged user requests to the Telegram bot. It supports optional query parameters for pagination and filtering based on timestamps.

#### **Query Parameters**:
- `page` (optional): Specifies the page number for pagination. Defaults to `1`.
- `limit` (optional): Defines the number of logs to return per page. Defaults to `10`.
- `afterTime` (optional): Filters logs to include only those after the specified date and time (ISO 8601 format).
- `beforeTime` (optional): Filters logs to include only those before the specified date and time (ISO 8601 format).

#### **Response**:
Returns a JSON object containing:
- `totalLogs`: Total number of logs available.
- `totalPages`: Total number of pages based on the limit.
- `currentPage`: The current page number.
- `logs`: An array of log objects containing details about each request.

#### **Example Request**:
```
GET /logs?page=1&limit=10&afterTime=2024-01-01T00:00:00Z&beforeTime=2024-12-31T23:59:59Z
```

### 2. `/logs/:user_id`

#### **Method**: `GET`

#### **Description**:
The `/logs/:user_id` endpoint retrieves all logs associated with a specific user identified by `user_id`. It also supports filtering based on timestamps.

#### **Path Parameters**:
- `user_id`: The ID of the Telegram user whose logs you want to retrieve.

#### **Query Parameters**:
- `afterTime` (optional): Filters logs to include only those after the specified date and time (ISO 8601 format).
- `beforeTime` (optional): Filters logs to include only those before the specified date and time (ISO 8601 format).

#### **Response**:
Returns an array of log objects associated with the specified `user_id`.

#### **Example Request**:
```
GET /logs/123456789?afterTime=2024-01-01T00:00:00Z&beforeTime=2024-12-31T23:59:59Z
```

## Bot Commands

### `getPogodaBot`

The `getPogodaBot` is a Telegram bot that provides weather information through two main commands:

#### 1. `/weather cityName`

- **Description**: This command attempts to retrieve the current weather information for the specified city (`cityName`).
- **Usage**: Users can call this command by typing `/weather` followed by the name of the city they are interested in (e.g., `/weather London`). The bot will respond with the current weather details for that city.

#### 2. `/city cityName`

- **Description**: This command sets a default city for the user. After using this command, the specified city (`cityName`) will be used as the default for future weather requests.
- **Usage**: Users can call this command by typing `/city` followed by the name of the city they wish to set as default (e.g., `/city Paris`). Once set, users can simply type `/weather` without specifying a city name, and the bot will return the weather information for the default city.

### Example Interaction:
1. User types: `/city New York`
   - Bot sets New York as the default city.
2. User types: `/weather`
   - Bot responds with the weather information for New York.
