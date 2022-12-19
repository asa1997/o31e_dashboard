function getjson()
{
    fetch('https://github.com/Be-Secure/besecure-assessment-datastore/blob/main/wordpress/6.1.0/scorecard/wordpress-6.1.0-scorecard-report.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.dir(err);
  });

}
