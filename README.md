# Ecommerce Frontend

A modern, full-featured ecommerce platform frontend built with React and Vite. This application provides a multi-vendor marketplace where users can browse shops, purchase products, manage shopping carts, and track orders.

## Features

### User Features

- **Authentication**: Secure JWT-based sign-up and sign-in
- **Product Browsing**: Browse products from multiple shops with detailed product views
- **Shopping Cart**: Add products to cart and manage quantities
- **Checkout**: Complete purchases with integrated checkout process
- **Order Management**: View and track order history and status
- **User Dashboard**: Personalized dashboard for authenticated users

### Shop Owner Features

- **Shop Management**: Create, edit, and manage your own shop
- **Product Management**: Add, edit, and remove products from your shop
- **Order Management**: View and manage orders placed at your shop
- **Inventory Control**: Track product availability and details

### General Features

- **Multi-vendor Marketplace**: Browse products from various shops
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Protected Routes**: Secure access to user-specific features
- **Unauthorized Access Handling**: Proper error pages for restricted content

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 6
- **Routing**: React Router 7
- **HTTP Client**: Axios
- **Styling**: CSS Modules
- **Linting**: ESLint
- **Authentication**: JWT tokens stored in localStorage

## Project Structure

```
src/
├── components/         # React components
│   ├── Cart/          # Shopping cart functionality
│   ├── Checkout/      # Checkout process
│   ├── Dashboard/     # User dashboard
│   ├── Landing/       # Landing page
│   ├── NavBar/        # Navigation component
│   ├── Orders/        # Order management
│   ├── Products/      # Product components (grid, details, forms)
│   ├── Shops/         # Shop components (grid, details, forms)
│   ├── SignInForm/    # User authentication
│   ├── SignUpForm/    # User registration
│   └── Unauthorized/  # Error page
├── contexts/          # React Context providers
│   └── UserContext.jsx
├── services/          # API service layer
│   ├── apiConfig.js
│   ├── authService.js
│   ├── cartService.js
│   ├── checkoutService.js
│   ├── orderService.js
│   ├── productService.js
│   └── shopService.js
└── styles/            # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Backend API server running (see backend repository)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd ecommerce-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment configuration:
   Create a `.env` file in the root directory:

```env
VITE_BACK_END_SERVER_URL=http://localhost:3000
```

Replace the URL with your backend API server address.

### Running the Application

#### Development Mode

```bash
npm run dev
```

The application will start at `http://localhost:5173` (default Vite port).

## Environment Variables

| Variable                   | Description            | Required |
| -------------------------- | ---------------------- | -------- |
| `VITE_BACK_END_SERVER_URL` | Backend API server URL | Yes      |

## API Integration

The application communicates with a backend REST API for all data operations. The API client is configured in `src/services/apiConfig.js` and automatically:

- Attaches JWT tokens to authenticated requests
- Handles request/response interceptors
- Manages error responses

### Service Modules

- **authService**: User authentication and registration
- **cartService**: Shopping cart operations
- **checkoutService**: Order placement and checkout
- **orderService**: Order history and tracking
- **productService**: Product CRUD operations
- **shopService**: Shop CRUD operations
- **userService**: User profile management
- **industryService**: Industry/category data
- **productCategoryService**: Product categorization

## User Roles & Permissions

The application supports role-based access:

- **Guest Users**: Browse products and shops
- **Registered Users**: Purchase products, manage cart, view orders
- **Shop Owners**: Create and manage shops, add products, manage shop orders

## Routes

| Path                        | Component         | Access    |
| --------------------------- | ----------------- | --------- |
| `/`                         | Landing/Dashboard | Public    |
| `/sign-up`                  | SignUpForm        | Public    |
| `/sign-in`                  | SignInForm        | Public    |
| `/shops`                    | ShopGrid          | Public    |
| `/shops/new`                | ShopCreateForm    | Protected |
| `/shops/:shopId`            | ShopDetails       | Public    |
| `/shops/:shopId/edit`       | ShopEditForm      | Protected |
| `/shops/:shopId/orders`     | OrderTable        | Protected |
| `/products`                 | ProductGrid       | Public    |
| `/products/:productId`      | ProductDetails    | Public    |
| `/products/new`             | ProductCreateForm | Protected |
| `/products/:productId/edit` | ProductEditForm   | Protected |
| `/cart`                     | CartPage          | Protected |
| `/checkout`                 | CheckoutPage      | Protected |
| `/orders`                   | OrderTable        | Protected |
| `/orders/:orderId`          | UserOrderDetails  | Protected |
| `/unauthorized`             | Unauthorized      | Public    |

## Future Features

The following enhancements are planned for future releases:

### Inventory Management

- **Stock Tracking**: Real-time inventory management for products
- **Low Stock Alerts**: Automatic notifications when inventory runs low
- **Stock History**: Track inventory changes over time
- **Bulk Inventory Updates**: Update stock levels for multiple products at once

### Cart & Checkout Enhancements

- **Cart Validations**:
  - Verify product ID exists when adding/removing items
  - Check for sufficient stock before allowing cart operations
  - Prevent adding unavailable or deleted products
- **Advanced Checkout Validation**:
  - Real-time stock availability checks during checkout
  - Price change detection and notification to users
  - Automatic cart updates if products become unavailable
  - Apply promotions or discount codes
- **Guest Checkout**: Allow purchases without account creation

### Data Integrity & Management

- **Deletion Mechanics**:
  - Implement cascade deletion for related records (products → orders, shops → products)
  - Soft delete option to preserve order history
  - Prevention of orphaned records in the database
  - Archive system for deleted shops and products
- **Shop Order Status Updates**: Endpoint and UI for shop owners to update order fulfillment status (pending, processing, shipped, delivered, cancelled)

### Form & Error Handling

- **Enhanced Error Display**: Backend validation errors passed through and displayed in frontend forms
- **Real-time Validation**: Client-side validation with instant feedback
- **Error Recovery**: Suggested actions for common errors
- **Form Auto-save**: Preserve form data to prevent loss on accidental navigation

### Search & Discovery

- **Advanced Search**: Filter by price, category, rating, availability
- **Product Search**: Full-text search across product names and descriptions
- **Search Suggestions**: Autocomplete and recommended searches
- **Recently Viewed**: Track and display recently viewed products

### User Experience

- **Product Reviews & Ratings**: Allow customers to review and rate products
- **Wishlist/Favorites**: Save products for later purchase
- **Product Recommendations**: AI-powered product suggestions
- **Order Tracking**: Real-time order status with shipping updates
- **Email Notifications**: Order confirmations, shipping updates, and promotions
- **Multiple Addresses**: Save and manage multiple shipping addresses

### Shop Features

- **Shop Analytics**: Sales metrics, popular products, and revenue tracking
- **Bulk Product Import**: CSV/Excel upload for adding multiple products
- **Product Variants**: Support for size, color, and other variations
- **Shop Policies**: Display shipping, return, and refund policies
- **Shop Reviews**: Allow users to rate and review shops

### Payment Integration

- **Payment Methods**: Credit cards
- **Secure Payment Processing**: Integration with Stripe, PayPal, or similar
- **Saved Payment Methods**: Securely store payment information
- **Split Payments**: Pay with multiple payment methods

### Admin Features

- **Admin Dashboard**: Platform-wide analytics and management
- **User Management**: Moderate users, handle disputes
- **Commission System**: Track and manage platform fees from sales
- **Reporting Tools**: Generate sales, user, and platform reports

### Performance & Security

- **Image Optimization**: Lazy loading and CDN integration for product images
- **Caching Strategy**: Implement client-side caching for better performance
- **Two-Factor Authentication**: Enhanced account security
- **Password Reset Flow**: Secure password recovery system
- **Session Management**: Better handling of expired sessions
