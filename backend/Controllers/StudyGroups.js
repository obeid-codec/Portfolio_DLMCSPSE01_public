const User = require('../models/User');
const StudyGroup = require('../models/StudyGroup');




/* GET all study groups */

const getStudyGroups = async (req, res) => {
    try {
        let studyGroups = await StudyGroup.find();
        return res.status(200).json({
            groups: studyGroups
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: error.message
        });
    }
};
/* GET all Joined study groups */

const getJoinedStudyGroups = async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                msg: 'User not found'
            });
        }

        let studyGroups = await StudyGroup.find({ members: user.id });
        return res.status(200).json({
            groups: studyGroups
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: error.message
        });
    }
};

/* GET all Joined study groups */

const getSpecificStudyGroups = async (req, res, next) => {
    const { groupId } = req.params;

    try {
        let studyGroup = await StudyGroup.findById(groupId);
        if (!studyGroup) {
            return res.status(404).json({
                msg: "Study Group not found"
            });
        }
        return res.status(200).json({
            group: studyGroup
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: error.message
        });
    }
}


/* create study group if admin */
const createStudyGroup = async (req, res) => {
    const { name, description } = req.body;

    try {
        const studyGroup = new StudyGroup({
            name,
            description,
        });

        await studyGroup.save();
        return res.status(200).json({
            msg: 'Study Group Created Successfully',
            group: studyGroup,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: error.message,
        });
    }
};

/* delete study group if admin */

const deleteStudyGroup = async (req, res) => {
    const { groupId } = req.params;

    try {
        const studyGroup = await StudyGroup.findByIdAndDelete(groupId);
        if (!studyGroup) {
            return res.status(404).json({
                msg: 'Study Group not found'
            });
        }
        return res.status(200).json({
            msg: 'Study Group Deleted Successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: error.message
        });
    }
};

/* update study group if admin */
const updateStudyGroup = async (req, res) => {
    const { groupId } = req.params;
    const { name, description } = req.body;

    try {
        const studyGroup = await StudyGroup.findById(groupId);
        if (!studyGroup) {
            return res.status(404).json({
                msg: 'Study Group not found'
            });
        }

        studyGroup.name = name || studyGroup.name;
        studyGroup.description = description || studyGroup.description;

        await studyGroup.save();

        return res.status(200).json({
            msg: 'Study Group Updated Successfully',
            group: studyGroup
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: error.message
        });
    }
};
/* join study group if user */
const joinStudyGroup = async (req, res) => {
    const studyGroupId = req.params.groupId;

    try {
        let studyGroup = await StudyGroup.findById(studyGroupId);
        if (!studyGroup) {
            return res.status(404).json({
                msg: "Study Group not found"
            });
        }

        // Check if the user is already a member
        if (studyGroup.members.includes(req.user.id)) {
            return res.status(400).json({
                msg: "User is already a member of the Study Group"
            });
        }

        studyGroup.members.push(req.user.id);
        await studyGroup.save();
        return res.status(200).json({
            msg: "Joined Study Group Successfully",
            group: studyGroup
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: error.message
        });
    }
}

/* leave study group if user */

const leaveStudyGroup = async (req, res) => {
    const { groupId } = req.params;

    try {
        const studyGroup = await StudyGroup.findById(groupId);
        if (!studyGroup) {
            return res.status(404).json({
                msg: 'Study Group not found'
            });
        }

        const memberIndex = studyGroup.members.indexOf(req.user.id);
        if (memberIndex === -1) {
            return res.status(400).json({
                msg: 'User is not a member of this study group'
            });
        }

        studyGroup.members.splice(memberIndex, 1);
        await studyGroup.save();

        return res.status(200).json({
            msg: 'Left Study Group Successfully',
            group: {
                id: studyGroup.id,
                members: studyGroup.members
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: error.message
        });
    }
};




module.exports = {
    getStudyGroups: getStudyGroups,
    createStudyGroup: createStudyGroup,
    deleteStudyGroup: deleteStudyGroup,
    updateStudyGroup: updateStudyGroup,
    joinStudyGroup: joinStudyGroup,
    leaveStudyGroup: leaveStudyGroup,
    getJoinedStudyGroups: getJoinedStudyGroups,
    getSpecificStudyGroups: getSpecificStudyGroups

}