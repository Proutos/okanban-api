const sanitizer = require('sanitizer');

const middlewareMagique = (req, res, next) => {
    if (req.body) {
      for (let prop in req.body) {
          req.body[prop] = sanitizer.escape(req.body[prop]);
      }
    }
    next();
};

module.exports = middlewareMagique;