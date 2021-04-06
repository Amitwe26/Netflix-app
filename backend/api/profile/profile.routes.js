const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getProfile, getProfiles, deleteProfile, updateProfile } = require('./profile.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getProfiles)
router.get('/:id', getProfile)
router.put('/:id', updateProfile)

// router.put('/:id',  requireAuth, updateProfile)
router.delete('/:id', requireAuth, requireAdmin, deleteProfile)

module.exports = router