const profileService = require('./profile.service')
const logger = require('../../services/logger.service')

async function getProfile(req, res) {
    try {
        console.log('req im in is:', req);
        const profile = await profileService.getById(req.params.id)
        res.send(profile)
    } catch (err) {
        logger.error('Failed to get profile', err)
        res.status(500).send({ err: 'Failed to get profile' })
    }
}

async function getProfiles(req, res) {
    try {
        // const filterBy = {
        //     txt: req.query?.txt || '',
        //     minBalance: +req.query?.minBalance || 0
        // }
        const profiles = await profileService.query()
        res.send(profiles)
    } catch (err) {
        logger.error('Failed to get profiles', err)
        res.status(500).send({ err: 'Failed to get profiles' })
    }
}

async function deleteProfile(req, res) {
    try {
        await profileService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete profile', err)
        res.status(500).send({ err: 'Failed to delete profile' })
    }
}

async function updateProfile(req, res) {
    console.log('req.body with newprofile is:', req.body);
    try {
        const profile = req.body
        const savedProfile = await profileService.update(profile)
        res.send(savedProfile)
    } catch (err) {
        logger.error('Failed to update profile', err)
        res.status(500).send({ err: 'Failed to update profile' })
    }
}

module.exports = {
    getProfile,
    getProfiles,
    deleteProfile,
    updateProfile
}