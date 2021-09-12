import { remote } from 'webdriverio';
import { assert } from 'chai';
import { Auth } from '@aws-amplify/auth';
import fetch from 'node-fetch';
import pkg from '@next/env';
const { loadEnvConfig } = pkg;
loadEnvConfig(process.cwd());
Auth.configure({
    aws_project_region: process.env.AWS_REGION,
    aws_cognito_region: process.env.AWS_REGION,
    aws_user_pools_id: process.env.COGNITO_USER_POOL_ID,
    aws_user_pools_web_client_id: process.env.COGNITO_APP_CLIENT_ID
});
let passcode = '';
const getAuthToken = async (username, password) => {
    const user = await Auth.signIn(username, password);
    const redeemableFrom = new Date();
    const redeemableTo = new Date();
    const response = await fetch(process.env.GENERATE_PASSCODE_URL, {
        method: 'POST',
        headers: {
            Authorization: user.signInUserSession.idToken.jwtToken
        },
        body: JSON.stringify({
            tourIds: [process.env.TOUR_ID],
            redeemableFrom: Math.floor(redeemableFrom.setMinutes(redeemableFrom.getMinutes() + 0) / 1000),
            redeemableTo: Math.floor(redeemableTo.setMinutes(redeemableTo.getMinutes() + 10) / 1000),
            numberOfLicenses: 1
        })
    });
    const { passcode } = await response.json();
    console.log('Passcode: ', passcode);
    return passcode;
};
describe('Page Refresh Behaviour', function () {
    beforeEach(async () => {
        passcode = await getAuthToken(process.env.AWS_COGNITO_USERNAME, process.env.AWS_COGNITO_PASSWORD);
    });
    it('Should go to Gyde using the Enrol with Passcode URL', async function () {
        console.log('The passcode', passcode);
        const client = await remote({
            capabilities: {
                automationName: 'uiautomator2',
                platformName: 'android',
                deviceName: 'RF8M21KYYEH',
                browserName: 'chrome'
            },
            path: '/wd/hub',
            port: parseInt(process.env.APPIUM_PORT || '4723'),
            logLevel: 'info'
        });
        await client.url(`${process.env.ENROL_URL_BASE}${passcode}`);
        const title = await client.getTitle();
        assert.equal(title, 'Gyde');
        console.log('Online check completed');
        await client.deleteSession();
    });
});
