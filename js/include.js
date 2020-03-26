


    fetch("include/about.html")
    .then(response => {
      return response.text()
    })
    .then(data => {
      document.getElementById('about').innerHTML = data;
    });

    fetch("include/contact.html")
    .then(response => {
      return response.text()
    })
    .then(data => {
      document.getElementById('contact').innerHTML = data;
    });

    fetch("include/services.html")
    .then(response => {
      return response.text()
    })
    .then(data => {
      document.getElementById('services').innerHTML = data;
    });

    fetch("include/team.html")
    .then(response => {
      return response.text()
    })
    .then(data => {
      document.getElementById('team').innerHTML = data;
    });

    fetch("include/why-us.html")
    .then(response => {
      return response.text()
    })
    .then(data => {
      document.getElementById('why-us').innerHTML = data;
    });