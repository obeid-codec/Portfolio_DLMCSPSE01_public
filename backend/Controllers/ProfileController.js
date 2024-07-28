const User = require('../models/User');
const Profile = require('../models/Profile');
const Post = require('../models/Post');




const getMyProfile = async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json(
                [
                    {
                        msg: "No Profile Found"
                    }
                ]
            );
        }
        res.status(200).json({ profile: profile });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: [{ msg: error.message }]
        });
    }
}




const createProfile = async (req, res) => {

    try {

        // Check if the profile already exists
        const existingProfile = await Profile.findOne({ user: req.user.id });
        if (existingProfile) {
            return res.status(400).json({
                msg: "Profile already exists"
            });
        }

        let { youtube, facebook, twitter, instagram, linkedin } = req.body;
        let profileFields = {};
        profileFields.user = req.user.id;
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (facebook) profileFields.social.facebook = facebook;
        if (twitter) profileFields.social.twitter = twitter;
        if (instagram) profileFields.social.instagram = instagram;
        if (linkedin) profileFields.social.linkedin = linkedin;


        let profile = new Profile(profileFields);
        profile = await profile.save();
        res.status(200).json({
            msg: "Profile Created"
            , profile: profile
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: [{ msg: error.message }]
        });
    }

}


const updateProfile = async (req, res) => {

    try {
        //check if profile exists
        let profile = await Profile.findOne({ user: req.user.id });
        if (!profile) {
            return res.status(400).json(
                [
                    {
                        msg: "No Profile Found"
                    }
                ]
            );
        }

        let { youtube, facebook, twitter, instagram, linkedin } = req.body;
        let profileFields = {};
        profileFields.user = req.user.id;
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (facebook) profileFields.social.facebook = facebook;
        if (twitter) profileFields.social.twitter = twitter;
        if (instagram) profileFields.social.instagram = instagram;
        if (linkedin) profileFields.social.linkedin = linkedin;


        if (profile) {
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
            return res.status(200).json({ profile: profile });

        }
        await profile.save();
        res.status(200).json({ profile: profile });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: [{ msg: error.message }]
        });
    }

}


const getAllProfiles = async (req, res) => {
    try {
        let profiles = await Profile.find().populate('user', ['name', 'avatar', 'isAdmin']);
        if (!profiles) {
            return res.status(400).json(
                [
                    {
                        msg: "No Profile Found"
                    }
                ]
            );
        }
        res.status(200).json({ profiles: profiles });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: [{ msg: error.message }]
        });
    }
}


const getProfileByProfileId = async (req, res) => {
    const { profileId } = req.params;
    try {
        let profile = await Profile.findById(profileId).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json(
                [
                    {
                        msg: "No Profile Found"
                    }
                ]
            );
        }
        res.status(200).json({ profile: profile });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: [{ msg: error.message }]
        });

    }
}


const deleteProfile = async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (!profile) {
            return res.status(400).json(
                [
                    {
                        msg: "No Profile Found"
                    }
                ]
            );
        }
        //remove profile
        profile = await profile.deleteOne();

        //check if user exists
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json(
                [
                    {
                        msg: "No User Found"
                    }
                ]
            );
        }
        // remove user
        user = await user.deleteOne({ _id: req.user.id });

        //remove posts related to user
        await Post.deleteMany({ user: req.user.id });

        res.status(200).json({ msg: "Profile Deleted" });


    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: [{ msg: error.message }]
        });
    }

}


const addExperience = async (req, res) => {
    try {

        let { title, company, location, from, to, current, description } = req.body;
        let newExperience = {
            title: title,
            company: company,
            location: location,
            from: from,
            to: to ? to : ' ',
            current: current,
            description: description
        };
        // get profile
        let profile = await Profile.findOne({ user: req.user.id });
        if (!profile) {
            return res.status(400).json(
                [
                    {
                        msg: "No Profile Found"
                    }
                ]
            );


        }

        profile.experience.unshift(newExperience);
        profile = await profile.save();
        res.status(200).json({ profile: profile });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: [{ msg: error.message }]
        });
    }
}
const deleteExperience = async (req, res) => {
    try {
        let experienceId = req.params.exp_id;
        let profile = await Profile.findOne({ user: req.user.id });
        if (!profile) {
            return res.status(400).json(
                [
                    {
                        msg: "No Profile Found"
                    }
                ]
            );
        }
        let removeIndex = profile.experience.map(item => item.id).indexOf(experienceId);
        profile.experience.splice(removeIndex, 1);
        profile = await profile.save();
        res.status(200).json({
            msg: "Experience Deleted"
            , profile: profile
        });



    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: [{ msg: error.message }]
        });
    }
}

const addEducation = async (req, res) => {
    try {

        let { school, degree, fieldofstudy, from, to, current, description } = req.body;
        let newEducation = {
            school: school,
            degree: degree,
            fieldofstudy: fieldofstudy,
            from: from,
            to: to ? to : ' ',
            current: current,
            description: description
        };
        // get profile
        let profile = await Profile.findOne({ user: req.user.id });
        if (!profile) {
            return res.status(400).json(
                [
                    {
                        msg: "No Profile Found"
                    }
                ]
            );

        }
        profile.education.unshift(newEducation);
        profile = await profile.save();
        res.status(200).json({ profile: profile });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: [{ msg: error.message }]
        });
    }



}
const deleteEducation = async (req, res) => {
    try {
        let educationId = req.params.edu_id;
        let profile = await Profile.findOne({ user: req.user.id });
        if (!profile) {
            return res.status(400).json(
                [
                    {
                        msg: "No Profile Found"
                    }
                ]
            );
        }
        let removeIndex = profile.education.map(item => item.id).indexOf(educationId);
        profile.education.splice(removeIndex, 1);
        profile = await profile.save();
        res.status(200).json({
            msg: "Education Deleted"
            , profile: profile
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: [{ msg: error.message }]
        });
    }
}
const addCourse = async (req, res) => {
    try {
        let { course, semester, description } = req.body;
        let newCourse = {
            course: course,
            semester: semester,
            description: description
        };
        // get profile
        let profile = await Profile.findOne({ user: req.user.id });
        if (!profile) {
            return res.status(400).json(
                [
                    {
                        msg: "No Profile Found"
                    }
                ]
            );

        }
        profile.courses.unshift(newCourse);
        profile = await profile.save();
        res.status(200).json({ profile: profile });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: [{ msg: error.message }]
        });
    }
}
const deleteCourse = async (req, res) => {
    try {
        let courseId = req.params.course_id;
        let profile = await Profile.findOne({ user: req.user.id });
        if (!profile) {
            return res.status(400).json(
                [
                    {
                        msg: "No Profile Found"
                    }
                ]
            );
        }
        let removeIndex = profile.courses.map(item => item.id).indexOf(courseId);
        profile.courses.splice(removeIndex, 1);
        profile = await profile.save();
        res.status(200).json({
            msg: "Course Deleted"
            , profile: profile
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: [{ msg: error.message }]
        });
    }
}


module.exports = {

    getMyProfile: getMyProfile,
    createProfile: createProfile,
    updateProfile: updateProfile,
    getAllProfiles: getAllProfiles,
    deleteProfile: deleteProfile,
    addExperience: addExperience,
    deleteExperience: deleteExperience,
    addEducation: addEducation,
    deleteEducation: deleteEducation,
    addCourse: addCourse,
    deleteCourse: deleteCourse,
    getProfileByProfileId: getProfileByProfileId
};