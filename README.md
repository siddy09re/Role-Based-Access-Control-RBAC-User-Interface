The Role-Based Access Control (RBAC) System is a web application designed to manage user access based on predefined roles: Admin, Editor, and Reader. Each role has specific permissions, allowing the system to provide a secure and structured way to manage users within an organization or platform.

The Admin role has full control over the system, with the ability to perform all actions such as reading data, adding new users, modifying user roles, changing the active/inactive status of users, and deleting users. Admins can quickly update user roles, and the system reflects these changes in real-time. When an Admin modifies a user’s role, the system immediately updates the user's information in the new role section while removing it from the previous section.

The Editor role has restricted permissions compared to the Admin. Editors can add new users and delete existing ones but do not have the ability to modify user roles or change their active status. This makes the Editor role useful for managing the user base but prevents unauthorized privilege escalation.

The Reader role is the most restricted, with permission only to view the data. Readers cannot perform any actions such as adding, deleting, or modifying users. This role is ideal for users who need access to the system's data without making changes to it.

The application begins by asking for login credentials based on the user's role. Sample login credentials include:

    Admin: admin@gmail.com, admin@123
    Editor: editor@gmail.com, editor@123
    Reader: reader@gmail.com, reader@123

Alternatively, the system can use real user emails from the database corresponding to each role. The application is responsive, ensuring a smooth experience on both desktop and mobile devices. The front end is built using React.js, Tailwind CSS, and HTML, while the backend is powered by Firebase for performing CRUD operations.

This RBAC system offers a secure, role-driven approach to user management, allowing different levels of access based on user roles. It ensures that users can only access and perform the functions appropriate to their assigned role, making the system both secure and efficient.

Website is deployed via netlify :- https://siddharth-rbac.netlify.app/