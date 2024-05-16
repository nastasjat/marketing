import './scss/main.scss'
import './scss/reset.scss'
import './scss/mixin.scss'
import './scss/header.scss'
import './scss/banner.scss'
import './scss/home.scss'
import './scss/footer.scss'
import './scss/portfolio.scss'
import './scss/smm.scss'

//filtering portfolio cases
document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.filters button');
  const cases = document.querySelectorAll('.case-img-container');

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const filter = this.textContent.trim().toLowerCase(); // get the text content of the clicked button

      cases.forEach(caseItem => {
        const categories = JSON.parse(caseItem.dataset.categories); // parse the categories as JSON array

        if (categories.includes(filter) || filter === 'всі') {
          caseItem.style.display = 'block'; // show the case if it belongs to the selected category or if all is clicked
        } else {
          caseItem.style.display = 'none'; // hide the case if it doesn't belong to the selected category
        }
      });

      // toggle 'active' class for buttons
      buttons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      });
  });
  
  //smm form
  // get forms
  var modal = document.getElementById("requestForm"); 
  var calcModal = document.getElementById("calculateForm");

  // get the buttons that open the modals
  const openModalBtns = document.querySelectorAll(".button-smm, .button-orange-business, .button-red-business");

  // get the close buttons
  const closeBtns = document.getElementsByClassName("close");

  // function to open a modal
  function openModal(modalElement) {
    modalElement.style.display = "block";
  }

  // function to close a modal
  function closeModal(modalElement) {
    modalElement.style.display = "none";
  }

  // click event listeners to the buttons that open the modals
  openModalBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("button-smm") || btn.classList.contains("button-red-business")) {
        openModal(modal);
      } else if (btn.classList.contains("button-orange-business")) {
        openModal(calcModal);
      }
    });
  });
  
  // click event listeners to the close buttons
  Array.from(closeBtns).forEach(btn => {
    btn.addEventListener("click", () => {
      closeModal(modal);
      closeModal(calcModal);
    });
  });

  // close the modals when clicked outside of the form
  window.addEventListener("click", (event) => {
    if (event.target === modal || event.target === calcModal) {
      closeModal(modal);
      closeModal(calcModal);
    }
  });

  //form calculating the price
  const socials = document.querySelectorAll('input[name="socials"]');
  const postCount = document.querySelector('.post-count');
  const duration = document.querySelectorAll('input[name="duration"]');
  const content = document.querySelectorAll('input[name="content"]');
  const priceElement = document.getElementById('price');

  let basePricePerSocial = 100;
  let basePricePerPost = 10;
  let basePricePerMonth = 50;
  let contentPrice = 200;

  function calculatePrice() {
    let totalPrice = 0;

    // calculate price based on selected socials
    socials.forEach(social => {
      if (social.checked) {
        totalPrice += basePricePerSocial;
      }
    });

    // calculate price based on post count
    if (postCount && postCount.value) { // ensure that the postCount element exists and has a value 
      totalPrice += basePricePerPost * postCount.value;
    }

    // calculate price based on duration
    duration.forEach(durationOption => {
      if (durationOption.checked) {
        totalPrice += basePricePerMonth * durationOption.value;
      }
    });

    // calculate price based on content creation
    content.forEach(contentOption => {
      if (contentOption.value === 'yes' && contentOption.checked) {
        totalPrice += contentPrice;
      }
    });

    priceElement.textContent = totalPrice;
  }

  // event listeners to update the price 
  socials.forEach(social => {
    social.addEventListener('change', calculatePrice);
  });

  if (postCount) {
    postCount.addEventListener('input', calculatePrice);
  }

  duration.forEach(durationOption => {
    durationOption.addEventListener('change', calculatePrice);
  });

  content.forEach(contentOption => {
    contentOption.addEventListener('change', calculatePrice);
  });

  // Calculate the initial price
  calculatePrice();
});

