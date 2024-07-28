import './App.css';
import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './layout/home/Home';
import UserLogin from './pages/users/user-login/UserLogin';
import UserRegister from './pages/users/user-register/UserRegister';
import StudentDetails from './pages/students/student-details/StudentDetails';
import StudentList from './pages/students/student-list/StudentList';
import AddEducation from './pages/profiles/add-education/AddEducation';
import AddExperience from './pages/profiles/add-experience/AddExperience';
import CreateProfile from './pages/profiles/create-profile/CreateProfile';
import Dashboard from './pages/profiles/dashboard/Dashboard';
import * as userActions from './redux/users/users.actions';
import EditProfile from './pages/profiles/edit-profile/EditProfile';
import AddCourse from './pages/profiles/add-course/AddCourse';
import PostDetails from './pages/posts/post-details/PostDetails';
import PostList from './pages/posts/post-list/PostList';
import EventList from './pages/events/event-list/EventList';
import Alert from './layout/misc/alert/Alert';
import Navbar from './layout/misc/navbar/Navbar';
import { useDispatch } from 'react-redux';
import GroupList from './pages/groups/group-list/GroupList';
import GroupEdit from './pages/groups/group-list/GroupEdit';
import Upload from './pages/events/upload/Upload';
import EventDetails from './pages/events/event-details/EventDetails';
import PrivateRoute from "./util/PrivateRoute";
import UserEdit from './pages/users/user-edit/UserEdit';

function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(userActions.getUserInfo());
  }, [dispatch])

  return (
    <Fragment>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/login" element={<UserLogin />} />
          <Route path="/users/register" element={<UserRegister />} />
          <Route path="/users/edit" element={<UserEdit />} />

          <Route path="/student/:studentId" element={<PrivateRoute element={<StudentDetails />} />} />
          <Route path="/students/posts/:studentId?" element={<PrivateRoute element={<PostList />} />} />
          <Route path="/students" element={<PrivateRoute element={<StudentList />} />} />
          <Route path="/profiles/add-education" element={<PrivateRoute element={<AddEducation />} />} />
          <Route path="/profiles/add-experience" element={<PrivateRoute element={<AddExperience />} />} />
          <Route path="/profiles/add-course" element={<PrivateRoute element={<AddCourse />} />} />
          <Route path="/profiles/create" element={<PrivateRoute element={<CreateProfile />} />} />
          <Route path="/profiles/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/profiles/edit" element={<PrivateRoute element={<EditProfile />} />} />
          <Route path="/posts/:postId" element={<PrivateRoute element={<PostDetails />} />} />
          <Route path="/posts" element={<PrivateRoute element={<PostList />} />} />
          <Route path="/groups" element={<PrivateRoute element={<GroupList />} />} />
          <Route path="/groups/edit/:groupId" element={<PrivateRoute element={<GroupEdit />} />} />
          <Route path="/groups/:groupId?" element={<PrivateRoute element={<PostList />} />} />

          <Route path="/events/create" element={<PrivateRoute element={<Upload />} />} />
          <Route path="/events/:groupId?" element={<PrivateRoute element={<EventList />} />} />
          <Route path="/events/event/:eventId" element={<PrivateRoute element={<EventDetails />} />} />


          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
