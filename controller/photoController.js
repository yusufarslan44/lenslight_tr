const Photo = require('../models/model');
const cloudinary = require('cloudinary').v2
const fs = require('fs');


const createPhoto = async (req, res) => {
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath, {
        use_filename: true,
        folder: 'Lenslight_tr'
    }
    )
    console.log("RESULT", result)

    try {
        const photo = await Photo.create({
            name: req.body.name,
            description: req.body.description,
            user: res.locals.user._id,
            url: result.secure_url,
            image_id: result.public_id
        })
        fs.unlinkSync(req.files.image.tempFilePath)

        res.status(201).redirect('/users/dashboard')
    }
    catch (err) {
        res.status(500).json({
            succeded: false,
            err
        })

    }
}
const getaPhoto = async (req, res) => {
    try {
        const photo = await Photo.findById({ _id: req.params.id }).populate('user')
        const localId = res.locals.user._id
        res.status(200).render("site/aphoto", {
            photo,
            localId,
            link: "photos"
        })

    }
    catch (err) {
        res.status(500).json({
            ucceded: false,
            err
        })

    }
}

const getallPhoto = async (req, res) => {
    try {
        const photos = res.locals.user
            ? await Photo.find({ user: { $ne: res.locals.user._id } })
            : await Photo.find({})
        res.status(200).render("site/gallery", {
            photos,
            link: 'photos'
        })
    }
    catch (err) {
        res.status(500).json({
            succeded: false,
            err
        })

    }
}
const updatePhoto = async (req, res) => {

    try {
        const photo = await Photo.findById(req.params.id)
        if (req.files) {
            const photoId = photo.image_id

            await cloudinary.uploader.destroy(photoId)
            const result = await cloudinary.uploader.upload(
                req.files.image.tempFilePath, {
                use_filename: true,
                folder: 'Lenslight_tr'
            })

            photo.url = result.secure_url
            photo.image_id = result.public_id
            fs.unlinkSync(req.files.image.tempFilePath)


        }
        photo.name = req.body.name
        photo.description = req.body.description
        photo.save()
        res.status(200).redirect(`/photos/${req.params.id}`)

    }
    catch (err) {
        res.status(500).json({
            succeded: false,
            err
        })

    }
}

const deletePhoto = async (req, res) => {
    console.log("delete çalıştı")
    try {
        const photo = await Photo.findById(req.params.id)
        console.log("PHOTO :", photo)
        const photoId = photo.image_id
        console.log("PHOTOID :", photoId)


        await cloudinary.uploader.destroy(photoId)
        await Photo.findByIdAndDelete(req.params.id)
        res.status(200).redirect('/users/dashboard')
    }
    catch (err) {
        res.status(500).json({
            succeded: false,
            err
        })

    }
}

module.exports = {
    createPhoto,
    getallPhoto,
    getaPhoto,
    deletePhoto,
    updatePhoto
}