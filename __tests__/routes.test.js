let request = require('supertest');

describe('testing API in login page', () => {
  it('should be success in loading the page', (done) => {
    request('https://hc.staging.medigo.id/login/')
    .get('/')
    .expect(200,done)
  })
  
  it('should login success (statusCode: 200)', (done) => {
    request('https://api.staging.medigo.id')
    .post('/hc/login')
    .send('username=admintest007')
    .send('password=admintest007')
    .set('Accept', 'application/x-www-form-urlencoded')
    .set('x-medigo-client-id', '994e23e67b6cb551a2951f8abaf2aa5265d5c2fb63a5679457a596efb8444270')
    .expect(200,done)
  })
  
  it('should login failed, wrong password (statusCode: 400)', (done) => {
    request('https://api.staging.medigo.id')
    .post('/hc/login')
    .send('username=admintest007')
    .send('password=testadmin007')
    .set('Accept', 'application/x-www-form-urlencoded')
    .set('x-medigo-client-id', '994e23e67b6cb551a2951f8abaf2aa5265d5c2fb63a5679457a596efb8444270')
    .expect(400,done)
  })
  
  it('should login failed, wrong username (statusCode: 400)', (done) => {
    request('https://api.staging.medigo.id')
    .post('/hc/login')
    .send('username=testadmin007')
    .send('password=admintest007')
    .set('Accept', 'application/x-www-form-urlencoded')
    .set('x-medigo-client-id', '994e23e67b6cb551a2951f8abaf2aa5265d5c2fb63a5679457a596efb8444270')
    .expect(400,done)
  })

  it('should login failed, no username input data (statusCode: 422)', (done) => {
    request('https://api.staging.medigo.id')
    .post('/hc/login')
    .send('password=admintest007')
    .set('Accept', 'application/x-www-form-urlencoded')
    .set('x-medigo-client-id', '994e23e67b6cb551a2951f8abaf2aa5265d5c2fb63a5679457a596efb8444270')
    .expect(422,done)
  })

  it('should login failed, no password input data (statusCode: 422)', (done) => {
    request('https://api.staging.medigo.id')
    .post('/hc/login')
    .send('username=admintest007')
    .set('Accept', 'application/x-www-form-urlencoded')
    .set('x-medigo-client-id', '994e23e67b6cb551a2951f8abaf2aa5265d5c2fb63a5679457a596efb8444270')
    .expect(422,done)
  })
})

describe('API testing in dokter page', () => {
  it('should return with statusCode of 200 (statusCode:200)', (done) => {
    request('https://api.staging.medigo.id')
    .get('/hc/doctor?status=all&fullName=asd&page=1&limit=10&sort=fullName&descending=false')
    .set('Authorization', 'Bearer ae799df7-525e-4299-80b1-07b85d89cee1')
    .set('Accept', 'application/x-www-form-urlencoded')
    .set('x-medigo-client-id', '994e23e67b6cb551a2951f8abaf2aa5265d5c2fb63a5679457a596efb8444270')
    .expect(200,done)
  
  })

  it('should return with data of doctor Abdner (statusCode:200)', (done) => {
    request('https://api.staging.medigo.id')
    .get('/hc/doctor?status=all&fullName=abdner&page=1&limit=10&sort=fullName&descending=false')
    .set('Authorization', 'Bearer ae799df7-525e-4299-80b1-07b85d89cee1')
    .set('Accept', 'application/x-www-form-urlencoded')
    .set('x-medigo-client-id', '994e23e67b6cb551a2951f8abaf2aa5265d5c2fb63a5679457a596efb8444270')
    .expect(200, done)
  })

  it('should return no error even though nothing founded (statusCode:200)', (done) => {
    request('https://api.staging.medigo.id')
    .get('/hc/doctor?status=all&fullName=abdner123&page=1&limit=10&sort=fullName&descending=false')
    .set('Authorization', 'Bearer ae799df7-525e-4299-80b1-07b85d89cee1')
    .set('Accept', 'application/x-www-form-urlencoded')
    .set('x-medigo-client-id', '994e23e67b6cb551a2951f8abaf2aa5265d5c2fb63a5679457a596efb8444270')
    .expect(200, done)
  })

  it('should can add a doctor (statusCode:200)', (done) => {
    request('https://api.staging.medigo.id')
    .post('/hc/doctor')
    .send('birthDate=1988-02-04')
    .send('fullName=qwe')
    .send('gender=pria')
    .set('Authorization', 'Bearer ae799df7-525e-4299-80b1-07b85d89cee1')
    .set('Accept', 'application/x-www-form-urlencoded')
    .set('x-medigo-client-id', '994e23e67b6cb551a2951f8abaf2aa5265d5c2fb63a5679457a596efb8444270')
    .expect(200, done)
  })
  
  it('should failed when adding a doctor, missing fullName input, which is an obligated field(statusCode:422)', (done) => {
    request('https://api.staging.medigo.id')
    .post('/hc/doctor')
    .send('gender=pria')
    .set('Authorization', 'Bearer ae799df7-525e-4299-80b1-07b85d89cee1')
    .set('Accept', 'application/x-www-form-urlencoded')
    .set('x-medigo-client-id', '994e23e67b6cb551a2951f8abaf2aa5265d5c2fb63a5679457a596efb8444270')
    .expect(422, done)
  })
  
  it('should success when editing a doctor (statusCode:200)', (done) => {
    request('https://api.staging.medigo.id')
    .put('/hc/doctor/5d9bd3b651c9ed001a45ea28')
    .send('birthDate=1988-02-04')
    .send('fullName=qwerty')
    .send('gender=pria')
    .set('Authorization', 'Bearer ae799df7-525e-4299-80b1-07b85d89cee1')
    .set('Accept', 'application/x-www-form-urlencoded')
    .set('x-medigo-client-id', '994e23e67b6cb551a2951f8abaf2aa5265d5c2fb63a5679457a596efb8444270')
    .expect(200, done)
  })
  
  it('should failed when editing a doctor, missing fullName input which is an obligated field (statusCode:422)', (done) => {
    request('https://api.staging.medigo.id')
    .put('/hc/doctor/5d9bd3b651c9ed001a45ea28')
    .send('birthDate=1988-02-04')
    .send('gender=pria')
    .set('Authorization', 'Bearer ae799df7-525e-4299-80b1-07b85d89cee1')
    .set('Accept', 'application/x-www-form-urlencoded')
    .set('x-medigo-client-id', '994e23e67b6cb551a2951f8abaf2aa5265d5c2fb63a5679457a596efb8444270')
    .expect(422, done)
  })
  
  it('should success when deleting a doctor (statusCode:200)', (done) => {
    request('https://api.staging.medigo.id')
    .delete('/hc/doctor/5d9bda5051c9ed001a45ea98')
    .set('Authorization', 'Bearer ae799df7-525e-4299-80b1-07b85d89cee1')
    .set('Accept', 'application/x-www-form-urlencoded')
    .set('x-medigo-client-id', '994e23e67b6cb551a2951f8abaf2aa5265d5c2fb63a5679457a596efb8444270')
    .expect(200, done)
  })

  it('should failed when deleting a doctor, since the doctor is no longer exist (statusCode:404)', (done) => {
    request('https://api.staging.medigo.id')
    .delete('/hc/doctor/5d9bda5051c9ed001a45ea98')
    .set('Authorization', 'Bearer ae799df7-525e-4299-80b1-07b85d89cee1')
    .set('Accept', 'application/x-www-form-urlencoded')
    .set('x-medigo-client-id', '994e23e67b6cb551a2951f8abaf2aa5265d5c2fb63a5679457a596efb8444270')
    .expect(404, done)
  })

describe('API testing in jadwal dokter page', () => {
  it('should success to showing all doctor schedule (statusCode:200)', (done) => {
    request('https://api.staging.medigo.id')
    .get('/hc/practice?shortened=true&page=1&limit=10&sort=doctor.fullName&descending=false&scheduleType=regular&status=all')
    .set('Authorization', 'Bearer ae799df7-525e-4299-80b1-07b85d89cee1')
    .set('Accept', 'application/x-www-form-urlencoded')
    .set('x-medigo-client-id', '994e23e67b6cb551a2951f8abaf2aa5265d5c2fb63a5679457a596efb8444270')
    .expect(200, done)
  })

  it('should success adding new regular schedule for dokter zxc (statusCode:200)', (done) => {
    request('https://api.staging.medigo.id')
    .post('/hc/practice/5d971109231aac0029a93c37/schedule')
    .send('consultationAverageLimit=18')
    .send('day=4')
    .send('duration=180')
    .send('quota=10')
    .send('time={"start":"06:00","end":"09:00"}')
    .send('type=regular')
    .set('Authorization', 'Bearer ae799df7-525e-4299-80b1-07b85d89cee1')
    .set('Accept', 'application/x-www-form-urlencoded')
    .set('x-medigo-client-id', '994e23e67b6cb551a2951f8abaf2aa5265d5c2fb63a5679457a596efb8444270')
    .expect(200, done)
  })

  it('should failed adding new regular schedule for dokter zxc, since no start and end date (statusCode:422)', (done) => {
    request('https://api.staging.medigo.id')
    .post('/hc/practice/5d971109231aac0029a93c37/schedule')
    .send('consultationAverageLimit=18')
    .send('day=4')
    .send('duration=180')
    .send('quota=10')
    .send('type=regular')
    .set('Authorization', 'Bearer ae799df7-525e-4299-80b1-07b85d89cee1')
    .set('Accept', 'application/x-www-form-urlencoded')
    .set('x-medigo-client-id', '994e23e67b6cb551a2951f8abaf2aa5265d5c2fb63a5679457a596efb8444270')
    .expect(422, done)
  })
  
  it('should success adding new additional schedule for dokter zxc (statusCode:200)', (done) => {
    request('https://api.staging.medigo.id')
    .post('/hc/practice/5d971109231aac0029a93c37/schedule')
    .send('consultationAverageLimit=18')
    .send('date=2019-10-10')
    .send('day=4')
    .send('duration=240')
    .send('quota=12')
    .send('time={"start":"15:00","end":"19:00"}')
    .send('type=override')
    .set('Authorization', 'Bearer ae799df7-525e-4299-80b1-07b85d89cee1')
    .set('Accept', 'application/x-www-form-urlencoded')
    .set('x-medigo-client-id', '994e23e67b6cb551a2951f8abaf2aa5265d5c2fb63a5679457a596efb8444270')
    .expect(200, done)
  })
  
  it('should failed adding new additional schedule for dokter zxc, since no start and end date (statusCode:422)', (done) => {
    request('https://api.staging.medigo.id')
    .post('/hc/practice/5d971109231aac0029a93c37/schedule')
    .send('consultationAverageLimit=18')
    .send('date=2019-10-10')
    .send('day=4')
    .send('duration=240')
    .send('quota=12')
    .send('type=override')
    .set('Authorization', 'Bearer ae799df7-525e-4299-80b1-07b85d89cee1')
    .set('Accept', 'application/x-www-form-urlencoded')
    .set('x-medigo-client-id', '994e23e67b6cb551a2951f8abaf2aa5265d5c2fb63a5679457a596efb8444270')
    .expect(422, done)
  })
  
  it('should success deleting addition schedule for dokter zxc (statusCode:200)', (done) => {
    request('https://api.staging.medigo.id')
    .delete('/hc/practice/5d971109231aac0029a93c37/schedule/5d9be512231aac0029a9989c')
    .set('Authorization', 'Bearer ae799df7-525e-4299-80b1-07b85d89cee1')
    .set('Accept', 'application/x-www-form-urlencoded')
    .set('x-medigo-client-id', '994e23e67b6cb551a2951f8abaf2aa5265d5c2fb63a5679457a596efb8444270')
    .expect(200, done)
  })
  
  it('should success adding replacement schedule for dokter zxc (statusCode:200)', (done) => {
    request('https://api.staging.medigo.id')
    .post('/hc/practice/5d971109231aac0029a93c37/schedule')
    .send('consultationAverageLimit=18')
    .send('date=2019-10-31')
    .send('day=4')
    .send('duration=210')
    .send('quota=11')
    .send('referenceId=5d9be088231aac0029a9953b')
    .send('time={"start":"08:00","end":"11:30"}')
    .send('type=override')
    .set('Authorization', 'Bearer ae799df7-525e-4299-80b1-07b85d89cee1')
    .set('Accept', 'application/x-www-form-urlencoded')
    .set('x-medigo-client-id', '994e23e67b6cb551a2951f8abaf2aa5265d5c2fb63a5679457a596efb8444270')
    .expect(200, done)
  })

  it('should failed adding replacement schedule for dokter zxc, since no start and end date (statusCode:422)', (done) => {
    request('https://api.staging.medigo.id')
    .post('/hc/practice/5d971109231aac0029a93c37/schedule')
    .send('consultationAverageLimit=18')
    .send('date=2019-10-31')
    .send('day=4')
    .send('duration=210')
    .send('quota=11')
    .send('referenceId=5d9be088231aac0029a9953b')
    .send('type=override')
    .set('Authorization', 'Bearer ae799df7-525e-4299-80b1-07b85d89cee1')
    .set('Accept', 'application/x-www-form-urlencoded')
    .set('x-medigo-client-id', '994e23e67b6cb551a2951f8abaf2aa5265d5c2fb63a5679457a596efb8444270')
    .expect(422, done)
  })

  it('should success deleting replacement schedule for dokter zxc', (done) => {
    request('https://api.staging.medigo.id')
    .delete('/hc/practice/5d971109231aac0029a93c37/schedule/5d9be6f4231aac0029a99a4b')
    .set('Authorization', 'Bearer ae799df7-525e-4299-80b1-07b85d89cee1')
    .set('Accept', 'application/x-www-form-urlencoded')
    .set('x-medigo-client-id', '994e23e67b6cb551a2951f8abaf2aa5265d5c2fb63a5679457a596efb8444270')
    .expect(200, done)
  })


})
})