const express = require('express');
const { getStudyGroups, createStudyGroup, deleteStudyGroup, updateStudyGroup, joinStudyGroup, leaveStudyGroup, getJoinedStudyGroups, getSpecificStudyGroups } = require('../Controllers/StudyGroups');
const checkAdmin = require('../middlewares/checkAdmin');

const authenticate = require('../middlewares/authenticate');
const router = express.Router();


/* GET all study groups */
router.get('/', authenticate, getStudyGroups);

/* GET all Joined study groups */
router.get('/joined', authenticate, getJoinedStudyGroups);

/* GET specific study groups */
router.get('/:groupId', authenticate, getSpecificStudyGroups);


/* create study group if admin */

router.post('/create-study-group', authenticate, checkAdmin, createStudyGroup);

/* delete study group if admin */

router.delete('/delete-study-group/:groupId', authenticate, checkAdmin, deleteStudyGroup);


/* update study group if admin */

router.put('/update-study-group/:groupId', authenticate, checkAdmin, updateStudyGroup);
/* join study group if user */

router.post('/join-study-group/:groupId', authenticate, joinStudyGroup);
/* leave study group if user */


router.post('/leave-study-group/:groupId', authenticate, leaveStudyGroup);


module.exports = router;