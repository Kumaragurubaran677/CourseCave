document.getElementById("add-course-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const category = document.getElementById("course-category").value;
  const title = document.getElementById("course-title").value;
  const img = document.getElementById("course-img").value;
  const type = document.getElementById("course-type").value;
  const rating = document.getElementById("course-rating").value;
  const learners = document.getElementById("course-learners").value;
  const level = document.getElementById("course-level").value;
  const duration = document.getElementById("course-duration").value;
  const price = document.getElementById("course-price").value;
  const link = document.getElementById("course-link").value;

  const badgeColor = type === "PAID" ? "#0ed44c" : "#fb873f";

  const newCourseHTML = `
  <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
      <div class="course-item shadow">
          <div class="position-relative overflow-hidden text-light image">
              <img class="img-fluid" src="${img}" alt="">
              <div style="position:absolute;top: 15px;left: 16px; font-size:12px; border-radius:3px; background-color:${badgeColor};"
                  class="px-2 py-1 fw-bold text-uppercase">${type}</div>
          </div>
          <div class="p-2 pb-0">
              <h5 class="mb-1">${title}</h5>
          </div>
          <div class="d-flex">
              <small class="flex-fill text-center py-1 px-1"><i class="fa fa-star text-warning me-2"></i> ${rating}</small>
              <small class="flex-fill text-center py-1 px-1"><i class="fa fa-user-graduate me-2"></i>${learners} Learners</small>
              <small class="flex-fill text-center py-1 px-1"><i class="fa fa-user me-2"></i>${level}</small>
          </div>
          <div class="d-flex">
              <small class="flex-fill text-left p-2 px-2"><i class="fa fa-clock me-2"></i>${duration}</small>
              <small class="py-1 px-2 fw-bold fs-6 text-center">₹ ${price}</small>
              <small class=" text-primary py-1 px-2 fw-bold fs-6" style="float:right;">
                  <a href="${link}" target="_blank">Enroll Now</a> <i class="fa fa-chevron-right me-2 fs-10"></i>
              </small>
          </div>
      </div>
  </div>`;

  try {
        const res = await fetch('http://localhost:3000/update-courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category, courseHTML: newCourseHTML })
        });
    

      const result = await res.text();
      alert(result);
  } catch (err) {
      alert("Error adding course: " + err.message);
  }
});
