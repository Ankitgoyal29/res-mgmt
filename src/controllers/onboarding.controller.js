const onboardingService = require('../services/onboarding.service');
const resourceService = require('../services/resource.service');
const functions = require('../shared/helper-functions');


module.exports = {
  apply: submitHiringRequestForm,
  approve: approveHiringRequest,
  reject: rejectHiringRequest
}

/**
 * POST /login
 * Sign in using email and password.
 */
function submitHiringRequestForm(req, res, next) {

    if (!req.body.email) {
      res.status(400).send(functions.handleResponse('Email is required'));
      return;
    }

    let applicationRequest = {
        email : req.body.email,
        password : req.body.password
      };
  
      let { status, response } = onboardingService.upsert(applicationRequest);
      return res.status(status).send(response);
  };

  /**
 * POST /login
 * Sign in using email and password.
 */
function approveHiringRequest(req, res, next) {
    let application = onboardingService.approve(req.body.id);
    if(application) {
        let resource = {};
        resourceService.upsert(resource);
    } else {
        return { status : 400, response : functions.handleResponse('Invalid request.', null)};
      }

    return res.status(200).send('Resource approved');
  };

function rejectHiringRequest(req, res, next) {
    let { status, response } = onboardingService.reject(req.body.id);
    return res.status(status).send(response);
  };