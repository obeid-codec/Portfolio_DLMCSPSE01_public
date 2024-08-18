# UniConnect Profile

UniConnect serves to enrich the university experience by providing a robust platform aimed at bolstering educational support and fostering social connections. Its goal is to encourage academic cooperation, the exchange of resources, and the cultivation of a community spirit among students. After setting up the project, users can access a web page to explore features such as academic resources sharing, community events, and peer support.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Method 1: Manual Installation](#method-1-manual-installation)
  - [Method 2: Docker Installation](#method-2-docker-installation)
- [Usage](#usage)


## Prerequisites

Before you begin, ensure you have met the following requirements:

- Docker installed on your system.
- Works on all major platforms.

## Installation

There are two ways to install and run this project.

### Method 1: Manual Installation

1. Clone or download the project repository.
2. Upload the files inside the `backend` and `frontend` folders, along with the `docker-compose.yml` file to your host server.
   - Your directory structure should look like this:
     ```
     - docker-compose.yml
     - backend/
     - frontend/
     ```
3. Open a terminal and navigate to the directory containing `docker-compose.yml`.
4. Build the Docker containers:
   ```bash
   docker-compose build
   ```
5. Start the application in the background:
   ```bash
   docker-compose up -d
   ```
The application will be accessible on port 80 by default.

### Method 2: Docker Installation

To install and run the application using Docker, follow these steps:

1. Upload the `docker-compose.prod.yml` file to your host server if you haven't already.

2. Open a terminal and navigate to the directory containing `docker-compose.prod.yml`.

3. Pull the required Docker images:

   ```bash
   docker-compose -f docker-compose.prod.yml pull
   ```
 
4. Start the application in the background:

   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```
 
The application will be accessible on port 80 by default.

## Usage

#### 1. **Accessing the Application**
   - Once the application is up and running, navigate to the web interface using your server's IP address or domain name. The default port is 80.

#### 2. **User Registration and Login**
   - **Register**: 
     - Navigate to the "Sign Up" page.
     - Fill in the required fields: `Name`, `Email`, `Password`.
     - Optionally upload an avatar.
     - Click "Register" to create your account.
   - **Login**:
     - Use your registered `Email` and `Password` to log in.

#### 3. **Profile Management**
   - **Creating a Profile**:
     - After logging in, go to the "Profile" section.
     - Fill in details such as `Education`, `Experience`, and `Social` links.
     - Click "Create Profile" to save your information.
     - **Note**: Before adding details like experience, education, or courses, ensure you have created your profile.
   - **Updating Profile**:
     - You can update your profile details anytime by navigating to the "Profile" section and clicking "Edit Profile."
   - **Viewing Profiles**:
     - View your profile or browse other users' profiles through the "Profiles" section.
   - **Deleting Profile**:
     - To delete your profile, go to the "Settings" and select "Delete Profile."

#### 4. **Course Enrollment**
   - **Adding Courses**:
     - In the "Courses" section, select the courses you are enrolled in.
     - Provide details such as `Name`, `Semester`, and a brief `Description`.
     - Click "Add Course" to include it in your profile.
   - **Managing Courses**:
     - Update or delete courses as needed through the "Edit Profile" option.

#### 5. **Post and Interaction**
   - **Creating Posts**:
     - Navigate to the "Community" or "Groups" sections.
     - Click on "Create Post", write your content, and optionally upload an image.
     - Click "Post" to share it with others.
     - **Note**: You must create or join a group before you can post. Posts cannot be made outside of a group context.
   - **Interacting with Posts**:
     - Like or comment on posts by other users.
     - To like a post, click the "Like" button. To unlike, click the "Unlike" button.
     - To comment, click on "Comment" and type your message.
   - **Managing Posts**:
     - You can delete your posts through the "My Posts" section.
   - **Viewing Posts**:
     - Posts can be viewed based on user ID or study group ID through the "Community" or "Groups" sections.

#### 6. **Events and Study Groups**
   - **Creating Events**:
     - Go to the "Events" section.
     - Click "Create Event", and provide details such as `Name`, `Image`, `Description`, `EventDate`, `Location`, and any related group.
     - Click "Submit" to create the event.
   - **Managing Events**:
     - Edit or delete events through the "My Events" section.
   - **Participating in Events**:
     - View all events and RSVP to those you're interested in attending.
   - **Joining Study Groups**:
     - Browse available study groups in the "Groups" section.
     - Click "Join Group" to become a member.
   - **Managing Study Groups**:
     - Create a new group by clicking "Create Group" and providing the necessary information.
     - Group admins can update details or delete groups.
     - Members can leave groups at any time.

#### 7. **Settings**
   - **Account Settings**:
     - Users can update their account settings, including changing passwords and adjusting privacy settings, through the "Settings" menu.

#### 8. **Admin Features**
   - **Default Admin Account**:
     - A default admin account is created automatically with the following credentials:
       - **Email**: `administrator@example.com`
       - **Password**: `administrator123`
     - This account has full administrative privileges and should be used to manage users, posts, and events. It's recommended to change the default password after the first login for security purposes.
   - **Admin Controls**:
     - Admin users have additional privileges such as managing users, posts, and events. Admins can be designated using the `MakeAdmin` method.


