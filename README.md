# E-commerce Product Dashboard

## Overview
This project is an E-commerce Product Dashboard built using React, Redux, and Material-UI. It allows users to search, filter, and sort products, with dynamic data loading and responsive design.

## Design Decisions

### 1. Modular Components
The project follows a modular design approach, where each component is self-contained and reusable:
- **`SortAndFilter`**: Handles product search, filter, and sort functionalities.
- **`ProductsList`**: Displays the list of products with infinite scrolling.
- **`ProductCard`**: Represents individual product cards.
- **`ProductModal`**: Shows detailed product information in a modal.
- **`ProductCardSkeleton`**: Displays skeletons for loading states.

### 2. Redux for State Management
Redux is used for global state management, allowing easy access and modification of product data across the application. Thunks (`getMoreProducts` and `searchProducts`) handle asynchronous API calls.

### 3. Debounce and Infinite Scrolling
The `ProductsList` component uses a debounce function to limit the rate of API calls and an Intersection Observer for infinite scrolling, ensuring efficient data loading without unnecessary re-fetches.

### 4. Responsiveness and UI
Material-UI components and utility classes are used to ensure the application is responsive and visually appealing across different screen sizes. The close button in the modal is styled to render properly on mobile devices.

### 5. Performance Optimization
- **Lazy Loading**: Images are lazy-loaded to improve performance.
- **Debounce**: API calls are debounced to prevent frequent re-fetches.
- **Conditional Rendering**: Skeleton loaders are used to improve user experience during data fetching.

### 6. Visual Enhancements
- **Background Color**: Added a light grey background color (`#f8f9fa`) to the product cards and skeletons.
- **Borders**: Added a light grey border (`1px solid #ccc`) and a border radius (`8px`) to the product cards and skeletons to enhance their visual appeal.

## Known Limitations
- **Limited Categories**: The current implementation only supports a predefined set of product categories. Adding dynamic category support would enhance flexibility.
- **Hardcoded API URLs**: The API URLs are hardcoded, limiting flexibility. Using environment variables or configuration files would improve maintainability.
- **Basic Error Handling**: Error handling is basic and could be improved with more detailed user feedback.

## Additional Enhancements
- **Enhanced Error Handling**: Provide detailed error messages and fallback UI.
- **Improved Filtering**: Add advanced filtering options like price range, ratings, and more.
