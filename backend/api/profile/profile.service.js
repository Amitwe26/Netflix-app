
const dbService = require('../../services/db.service')
// const logger = require('../../services/logger.service')
const profileService = require('../profile/profile.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByProfilename,
    remove,
    update,
    add
}

async function query() {
    // const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('profile')
        var profiles = await collection.find().toArray()
        profiles = profiles.map(profile => {
            delete profile.password
            profile.createdAt = ObjectId(profile._id).getTimestamp()
            // Returning fake fresh data
            // profile.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
            return profile
        })
        return profiles
    } catch (err) {
        logger.error('cannot find profiles', err)
        throw err
    }
}

async function getById(profileId) {
    try {
        const collection = await dbService.getCollection('profile')
        const profile = await collection.findOne({ '_id': ObjectId(profileId) })
        delete profile.password

        profile.givenProfiles = await profileService.query({ byProfileId: ObjectId(profile._id) })
        profile.givenProfiles = profile.givenProfiles.map(profile => {
            delete profile.byProfile
            return profile
        })

        return profile
    } catch (err) {
        logger.error(`while finding profile ${profileId}`, err)
        throw err
    }
}
async function getByProfilename(email, password) {
    try {
        const collection = await dbService.getCollection('profile')
        const profile = await collection.findOne({ email })
        return profile
    } catch (err) {
        logger.error(`while finding profile ${email}`, err)
        throw err
    }
}

async function remove(profileId) {
    try {
        const collection = await dbService.getCollection('profile')
        await collection.deleteOne({ '_id': ObjectId(profileId) })
    } catch (err) {
        logger.error(`cannot remove profile ${profileId}`, err)
        throw err
    }
}

async function update(profile) {
    try {
        // peek only updatable fields!
        const profileToSave = {
            _id: ObjectId(profile._id),
            profilename: profile.profilename,
            fullname: profile.fullname,
            profiles: profile.profiles,
            email: profile.email
        }
        const collection = await dbService.getCollection('profile')
        await collection.updateOne({ '_id': profileToSave._id }, { $set: profileToSave })
        return profileToSave;
    } catch (err) {
        logger.error(`cannot update profile ${profile._id}`, err)
        throw err
    }
}

async function add(profile) {
    console.log('profile in add  is:', profile);
    try {
        // peek only updatable fields!
        const profileToAdd = {
            profilename: profile.profilename,
            password: profile.password,
            fullname: profile.fullname,
            email: profile.email,
            profiles: []
        }
        const collection = await dbService.getCollection('profile')
        await collection.insertOne(profileToAdd)
        return profileToAdd
    } catch (err) {
        logger.error('cannot insert profile', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                profilename: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: filterBy.minBalance }
    }
    return criteria
}


