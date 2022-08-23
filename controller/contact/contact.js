const db = require('../../controller/db_adaptor/mongodb.js');
const { validationResult } = require('express-validator'),
  mongoose = require('mongoose'),
  library = require('../../model/library.js'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  middlewares = require('../../model/middlewares.js'),
  CONFIG = require('../../config/config.js'),
  fs = require('fs');
var _ = require('lodash');

const {contact} = require('../../model/mongodb.js')



let { ObjectId, isObjectId, required_msg, not_valid_msg } = require('../../model/common');
const {
  GetDocument,
  GetOneDocument,
  UpdateOneDocument,
  GetAggregation,
  InsertDocument,
  DeleteDocument,
  DeleteOneDocument,
  UpdateManyDocument
} = require('../../controller/db_adaptor/mongodb.js');

const { promisify } = require('util');
const Product = require('../../schema/Product');
const { result } = require('lodash');
const unlinkAsync = promisify(fs.unlink);

module.exports = (app, io) => {
  var router = {};


  router.CreateContact = async (req,res) => {

    try{


      const username = _.get(req.body,'username','');
      const email  = _.get(req.body,'email','');
      const mobileno = _.get(req.body,'mobileno','');
      const organization = _.get(req.body,'organization','');
      const gender = _.get(req.body,'gender','');
      const feedback = _.get(req.body,'feedback','');
      let contactID = 'CON' + Math.floor(10000 + Math.random() * 90000);
      

      const insert = {
        username,
        email,
        mobileno,
        organization,
        gender,
        feedback,
        contactID
      }

      const contactData = await InsertDocument('contact',insert);

      if(contactData){
        res.json({
          status : 1,
          message : "Success",
          contactData
        })
      }else{
        res.json({
          status : 0,
          message : "Error Accuire"
        })
      }

    }catch{
      res.json({
        status : 0,
        message : "Server Error"
      })
    }

  }


  router.ContactData = async (req,res) => {

    try{

      const contactID = _.get(req.body,'contactID');

      if(contactID != null && contactID != ""){

      const result = await GetOneDocument('contact',{contactID : contactID},{},{});

      if(result != null ){
        res.json({
          status : 1,
          message : "Success",
          result
        })
      }else{
        res.json({
          status : 0,
          message : "Data Not Found"
        })
      }

      }else{
        res.json({
          status : 0,
          message : "ContactID is Required"
        })
      }
      
    }catch{
      res.json({
        status : 0,
        message : "Server Error"
      })
    }

  }


  router.ContactUpdate = async (req,res) => {

    try{

      const IDS = req.params.id

      const username = _.get(req.body,'username','');
      const email  = _.get(req.body,'email','');
      const mobileno = _.get(req.body,'mobileno','');
      const organization = _.get(req.body,'organization','');
      const gender = _.get(req.body,'gender','');
      const feedback = _.get(req.body,'feedback','');

      if(IDS != null && IDS != ""){

          const result = await UpdateManyDocument('contact',{_id : IDS},{$set : {
            username,
            email,
            mobileno,
            organization,
            gender,
            feedback
          }},{});

          if(result.nModified === 0){
            res.json({
              status : 0,
              message : "Updated Wrong"
            })
          }else{
            res.json({
              status : 1,
              message : "Success",
            })
          }
      }

    }catch{
      res.json({
        status : 0,
        message : "Server Error"
      })
    }

  }

  

  router.ContactDelete = async (req,res) => {

    try{

      

    }catch{
      res.json({
        status : 0,
        message : "Server Error"
      })
    }

  }

return router;

}