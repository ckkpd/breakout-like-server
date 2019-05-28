import express from 'express'
import db from '../../db'
import Score from '../../models/score'
import config from '../../config';

let router = express.Router()

router.post('/add', async (req, res) => {
    let score = req.body as Score
    if(!score.name || !score.score) {
        res.status(400).json({status: "bad", "error": "too few parameters"})
        return
    }
    if(score.name.length > 10) {
        res.status(400).json({status: "bad", error: "too long name"})
        return
    }
    await db.insert([{score: score.score, name: score.name}], (e, v) => {
        if(e) res.status(400).json({status: "bad", error: e})
        else res.json({status: "ok"})
    })
})

router.get('/all', async (req, res) => {
    await db.find({}).exec(async (e, v) => {
        if(e) res.status(500).json({status: "bad", error: e})
        else res.json(v)
    })
})

router.get('/latest', async (req, res) => {
    let n = req.body.n || 10
    await db.find({}).sort({score: -1}).limit(n).exec(async (e, v) => {
        if(e) res.json({status: "error", error: e})
        else res.json(v)
    })
})

router.post(config.resetEndpoint, async (req, res) => {
    if(req.body.sure != 'yes') res.status(400).json({status: "bad", error: 'Please specify "sure: yes" to execute this command.'})
    else await db.remove({}, {multi: true}, (e, n) => {
        res.json({status: "ok", count: n})
    })
})

router.post(config.removeEndpoint, async (req, res) => {
    let _id = req.body._id
    if(!_id) res.status(400).json({status: "bad", error: 'id not specified'})
    else await db.remove({_id: _id}, {}, (e, n) => {
        if(e) res.status(500).json({status: "bad", error: e})
        else res.json({status: "ok", count: n})
    })
})

export default router