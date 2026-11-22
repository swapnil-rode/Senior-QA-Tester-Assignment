const assert = require('node:assert/strict');

const BASE_URL = 'https://reqres.in/api';

async function runTests() {

  // TC_API_01: Successful GET
  console.log('\nTC_API_01 - GET Users');

  const getResponse = await fetch(`${BASE_URL}/users?page=2`);
  const getData = await getResponse.json();

  assert.equal(getResponse.status, 200);
  assert.ok(Array.isArray(getData.data));
  assert.ok(getData.data.length > 0);

  console.log('PASS - GET Users');


  // TC_API_02: Successful POST
  console.log('\nTC_API_02 - POST Create User');

  const postResponse = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Swapnil',
      job: 'QA Tester'
    })
  });

  const postData = await postResponse.json();

  assert.equal(postResponse.status, 201);
  assert.equal(postData.name, 'Swapnil');
  assert.equal(postData.job, 'QA Tester');
  assert.ok(postData.id);
  assert.ok(postData.createdAt);

  console.log('PASS - POST Create User');


  // TC_API_03: Invalid / Missing Data
  console.log('\nTC_API_03 - Missing Password');

  const invalidResponse = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'eve.holt@reqres.in'
    })
  });

  const invalidData = await invalidResponse.json();

  assert.equal(invalidResponse.status, 400);
  assert.equal(typeof invalidData.error, 'string');

  console.log('PASS - Missing Password');


  // TC_API_04: 404 Not Found
  console.log('\nTC_API_04 - User Not Found');

  const notFoundResponse = await fetch(`${BASE_URL}/users/23`);
  const notFoundData = await notFoundResponse.json();

  assert.equal(notFoundResponse.status, 404);
  assert.deepEqual(notFoundData, {});

  console.log('PASS - User Not Found');

  console.log('\n4 API TESTS PASSED SUCCESSFULLY!');
}

runTests().catch(error => {
  console.error('\nAPI TEST FAILED:', error.message);
  process.exitCode = 1;
});