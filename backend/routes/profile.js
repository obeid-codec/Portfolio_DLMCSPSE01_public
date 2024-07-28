const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const { getMyProfile, updateProfile, getAllProfiles, getProfileByUserId, deleteProfile, addExperience, deleteExperience, addEducation, deleteEducation, createProfile, addCourse, deleteCourse, getProfileByProfileId } = require('../Controllers/ProfileController');



/* Create profile */

router.post('/create', authenticate, createProfile);

/* GET my profile */
router.get('/me', authenticate, getMyProfile);

/* Update profile */

router.put('/update', authenticate, updateProfile);

/* GET all profiles */

router.get('/', getAllProfiles);

/* GET profile profile id */

router.get('/user/:profileId', getProfileByProfileId);


/* Delete own profile */

router.delete('/delete/', authenticate, deleteProfile);

/* Post new Experience */

router.put('/experience', authenticate, addExperience);

/* Delete Experience */

router.delete('/experience/:exp_id', authenticate, deleteExperience);

/* Post new Education */

router.put('/education', authenticate, addEducation);

/* Delete Education */

router.delete('/education/:edu_id', authenticate, deleteEducation);


// Post new Course
router.put('/course', authenticate, addCourse);

// Delete Course
router.delete('/course/:course_id', authenticate, deleteCourse);


module.exports = router;