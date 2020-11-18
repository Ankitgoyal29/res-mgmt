

const applications = require('../models/onboarding-applications.model');
const onboardingStatus = require('../models/onboarding-status.enum');
const functions = require('../shared/helper-functions');
const resourceService = require('../services/resource.service');


module.exports = {
    upsert : upsertRequest,
    approve : approveRequest,
    reject : rejectRequest
}



function upsertRequest(applicationRequest) {
  let application = applications.find(item => item.resourceEmail === applicationRequest.resourceEmail);

  if(!application) {
    application = {...applicationRequest, status : onboardingStatus.Pedning};
    applications.push(application);
    res.status(200);
  } else {
    res.status(400).send(functions.handleResponse('Duplicate request.', null));
  }
}

function approveRequest(requestId) {
  let application = applications.find(item => item.id === requestId);

  if(application) {
    application.status = onboardingStatus.Approved;
  }

  return application;
}

function rejectRequest(requestId) {
  let application = applications.find(item => item.id === requestId);

  if(application) {
    application.status = onboardingStatus.Rejected;
    return { status : 200, response : "Resource rejected"};
  } else {
    return { status : 400, response : functions.handleResponse('Invalid request.', null)};
  }
}