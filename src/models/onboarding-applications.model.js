const onboardingStatus = require('./onboarding-status.enum');
const resourceType = require('./resource-type.enum');

const applications = [{
    id : 100001,
    resourceName : 'Resource 1',
    resourceEmail : 'res1@abc.com',
    type: resourceType.Freelance,
    status : onboardingStatus.Pedning
}];

module.exports = applications