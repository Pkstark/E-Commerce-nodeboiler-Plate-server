const { check } = require('express-validator');
const CONFIG = require('../../config/config.js');
var library = require('../../model/library.js');
const middlewares = require('../../model/middlewares.js');
const { carts } = require('../../model/mongodb.js');
const { ensureAuthorizedClient } = require('../../model/security/ensureAuthorised.js');

module.exports = (app, io) => {
  try {
    var contact = require('../../controller/contact/contact')(app,io);

    app.post(
      '/contact/create',
      [
        check('username', library.capitalize('username is required')),
        check('email', library.capitalize('email is required ')),
        check('mobileno',library.capitalize('mobilenumber is required ')),
        check('organization',library.capitalize('organization is required ')),
        check('gender',library.capitalize('gender is required ')),
        check('feedback',library.capitalize('feedback is required ')),
        check('contactID', library.capitalize('contactID is required'))
      ],
      contact.CreateContact
    )

    app.post(
      '/contact/getdata',
      [
        check('contactID', library.capitalize('contactID is required'))
      ],
      contact.ContactData
    )

    app.post(
      '/contact/update/:id',
      contact.ContactUpdate
    )

    app.post(
      '/contact/delete/:id',
      contact.ContactDelete
    )


  } catch (error) {
    console.log(`Error occured ${error}`, error.message);
  }
};