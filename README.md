# EtcdFinder UI

A modern, React-based web interface for managing keys in etcd. This application provides a user-friendly way to search, view, create, edit, and delete keys in your etcd cluster.

## Features

-   **Key Management**: Create, read, update, and delete keys.
-   **Search**: Quickly find keys with a search bar.
-   **Visual Editor**: View and edit key values with a clean interface.

## Getting Started

### Prerequisites

-   Node.js (v25 or higher)
-   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/etcdfinder/etcdfinder-ui.git
    cd etcdfinder-ui
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Running Locally

1.  Start the development server:
    ```bash
    npm run dev
    ```

2.  Open your browser at `http://localhost:5173`.

> **Note**: The application expects a backend API running at `http://localhost:8080`. You can configure the proxy in `vite.config.js`.

### Building for Production

To build the application for production:

```bash
npm run build
```

The output will be in the `dist` directory.

### Running Tests

To run the test suite:

```bash
npm run test
```

## Docker

### Using Pre-built Image from GHCR

Pull and run the latest Docker image:

```bash
docker pull ghcr.io/etcdfinder/etcdfinder-ui:latest
docker run -p 3000:3000 -e BACKEND_URL=http://host.docker.internal:8080 ghcr.io/etcdfinder/etcdfinder-ui:latest
```

The application will be available at `http://localhost:3000`.

### Building Locally

To build the Docker image locally:

```bash
make docker-build
docker run -p 3000:3000 -e BACKEND_URL=http://localhost:8080 etcdfinder-ui
```

### Environment Variables

-   `BACKEND_URL`: URL of the etcd backend API (default: `http://localhost:8080`)
-   `PORT`: Port to run the server on (default: `3000`)


## Project Structure

-   `src/components`: Reusable UI components (Layout, Modal).
-   `src/pages`: Page components (KeyList, KeyDetail).
-   `src/api`: API client functions.
-   `src/styles`: CSS files for components.
-   `src/test`: Test setup and utilities.
