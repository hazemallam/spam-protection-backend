const express = require('express')
const fs = require('fs')
const router = express.Router()

const path = './data/reports.json'

//Utils functions
const saveReportData = (data) =>{
    const stringfyData = JSON.stringify(data)
    fs.writeFileSync(path, stringfyData)
}

const getReportData = ()=>{
    const jsonData = fs.readFileSync(path, 'utf8')
    return JSON.parse(jsonData)
}

//routes
//get all reports
router.get('/reports', (req, res)=>{
    const reports = getReportData()
    res.send(reports)
    
})

//get single report by id
router.get('/reports/:id', (req, res)=>{

    fs.readFile(path, 'utf8', (err, data)=>{

        const id = req.params['id']
        const reports = JSON.parse(data).elements
        const index = reports.findIndex((report)=> report.id == id)
        res.send(reports[index])

    })
})

//update report
router.put('/reports/:reportId', async (req, res)=>{
    fs.readFile(path, 'utf8', (err, data)=>{
        const reportId = req.params['reportId']
        const reports = JSON.parse(data)
        var index =   reports.elements.findIndex((report)=> report.id == reportId)
        reports.elements[index] = req.body
        saveReportData(reports)
        res.send(reports.elements[index])
    }, true)
})

module.exports = router