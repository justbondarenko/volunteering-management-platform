Overview
This task involves implementing the user interface and front-end logic for the platform's central Administrative Panel. This panel will be the control center for managing user data, moderating content, maintaining reference data, and viewing platform analytics. The focus is strictly on Front-End development, including UI implementation, state management, form handling, and integration with existing API endpoints (GET, POST, PUT, DELETE).

Target Audience: Junior Front-End Developer

1. User Management Module
Implement a dedicated section for viewing and managing all platform users.

1.1 User List and Search (Read)
Data Table: Display a table listing users with key fields: User ID (UID), Full Name, Email, Role (User/Admin/Org Rep), and Status (Active/Blocked).

Search & Filtering:

Implement an instant search bar to filter users by Name or Email address.

Implement a status filter (All, Active, Blocked) and a Role filter.

Pagination: Implement client-side or server-side pagination (based on FE state) for large user lists.

Sorting: Allow sorting the table by Name and Registration Date.

1.2 User Profile Editing (Update)
Implement a modal or dedicated profile editing view triggered by clicking an "Edit" button next to a user.

Forms: Create forms to edit:

Basic Info (Name, Email).

Role Assignment (Dropdown to change the user's role).

Profile Details (e.g., Contact information, Bio).

Save Logic: Implement API call to update the user data (PUT /api/users/{userId}). Show a success message upon completion and handle error states.

1.3 User Status Control (Block/Unblock)
Block Action: Implement a dedicated "Block" or "Toggle Status" button.

Confirmation Dialog: Before blocking, present a custom modal confirmation dialog asking the administrator to confirm the action, possibly requiring a brief reason.

API Integration: Call the appropriate endpoint to toggle the user's active status (PUT /api/users/{userId}/status). Visually update the user's status in the data table immediately upon success.

2. Organization Verification Queue
Implement a workflow for reviewing and managing applications from organizations seeking verification.

2.1 Verification Request Queue
Request List: Display a list of pending verification requests in a responsive card or table view. Key fields to display: Organization Name, Applicant Name, Submission Date, and a Status Badge (Pending).

Filtering: Implement filters to view Pending, Approved, and Rejected requests.

Click Action: Clicking a request opens a detailed review panel/modal.

2.2 Detailed Review Panel
Data Display: Clearly present all submitted data from the organization (e.g., Legal Name, Address, Website, Contact Info, provided documents/IDs).

Action Buttons: Implement two prominent actions:

"Approve": Triggers a confirmation modal and sends an approval API call.

"Reject": Triggers a modal requiring the admin to input a mandatory rejection reason before sending the API call.

Visual Feedback: Show loading state during API interaction and update the status of the request in the queue list upon successful action.

3. Content Moderation Tools
Develop interfaces for administrators to review and manage user-generated content, specifically Events and Reviews.

3.1 Events Moderation
List View: Display all active/reported events in a sortable, filterable list (Event Title, Creator, Creation Date, Status).

Edit Functionality: Implement an "Edit" button that navigates to or opens a modal with the event creation form, pre-populated with existing event data. The admin must be able to modify all fields.

Deletion: Implement a "Delete" button. This action must be protected by a custom confirmation dialog stating the permanence of the action.

3.2 Review/Feedback Moderation
Dedicated List: Display a list of all submitted reviews or a filtered list of reported reviews. Include fields: Content Snippet, Author, Target (Event/Organization), and Report Count (if applicable).

Preview: Allow the admin to click to view the full text of the review.

Delete Action: Implement a "Delete" button with the mandatory custom confirmation dialog.

API Integration: Ensure a DELETE call is correctly sent to the relevant review endpoint.

4. Reference Data Management (Dictionaries)
Create a system for administrators to maintain the platform's core lookup data (e.g., Categories, Tags, Cities).

4.1 Generic CRUD Interface
Design a flexible interface that can be reused for managing all dictionary types: Cities, Volunteering Categories, and Skill Tags.

List Display: Show the existing list of items (e.g., a list of city names).

Add New Item: Implement an input field and a "Add" button to create a new entry.

Validation: Client-side validation to ensure the input field is not empty.

Edit Item: Implement an inline edit or a small modal to modify an existing item's name/value.

Delete Item: Implement a "Delete" icon/button next to each item with a custom confirmation dialog (to prevent accidental deletion of critical data).

API Mapping: Map the front-end actions to the appropriate back-end endpoints (e.g., POST /api/dictionaries/cities, PUT /api/dictionaries/categories/{id}, etc.).

5. Analytics and Statistics Dashboard
Implement a read-only dashboard to display key platform metrics.

5.1 Dashboard Layout
Design a responsive dashboard layout using grid or flexbox for presenting various widgets (charts and metric cards).

5.2 Key Metrics Cards (Kpis)
Display simple metric cards with the latest counts (Fetched via API):

Total Users

New Users (Last 30 Days)

Active Events

Total Verified Organizations

5.3 Data Visualization (Charting)
Integrate a Front-End charting library (e.g., Recharts, Chart.js, or similar) to display data graphically.

Implement at least two charts:

Line Chart: Showing New User Registrations over the last 90 days.

Bar Chart or Map Visualization: Showing Activity Level by Region/City (e.g., total events created per region).

Data Handling: Fetch and process the analytical data from the relevant API endpoint (GET /api/analytics).

General Requirements
Technology: Use the main FE framework (React/Angular/Vue - assume one is pre-selected for the platform).

Styling: Ensure the UI is clean, modern, and adheres to the platform's design system (or use a modern utility-first CSS framework like Tailwind CSS for quick implementation).

Responsiveness: All pages, especially data tables and the dashboard, must be fully responsive and usable on both desktop and mobile devices.

Error Handling: Implement robust error boundaries and display user-friendly error messages for all API failures.

Loading States: Implement visual loading indicators (spinners, skeleton loaders) for all data-fetching operations to improve perceived performance.

Interaction: MUST use custom confirmation modals/dialogs for destructive actions (Delete, Block, Reject). DO NOT use built-in browser alert() or confirm() functions.