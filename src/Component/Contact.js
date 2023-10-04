import React from 'react'

function Contact({ setDomin }) {
  return (
    <div id="contact" class="contact-us section">
      <div class="container">
        <div class="row">
          <div
            class="col-lg-12 wow fadeInUp"
            data-wow-duration="0.5s"
            data-wow-delay="0.25s"
          >
            <form id="contact" action="" method="post">
              <div class="row">
                <div class="col-lg-6 offset-lg-3">
                  <div class="section-heading">
                    <h6>Contact Us</h6>
                    <h2>
                      Fill Out The Form Below To <span>Get</span> In{" "}
                      <em>Touch</em> With Us
                    </h2>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="row">
                    <div class="col-lg-6">
                      <fieldset>
                        <input
                          type="name"
                          name="name"
                          id="name"
                          placeholder="Name"
                          autocomplete="on"
                          required
                        />
                      </fieldset>
                    </div>
                    <div class="col-lg-6">
                      <fieldset>
                        <input
                          type="surname"
                          name="surname"
                          id="surname"
                          placeholder="Surname"
                          autocomplete="on"
                          required
                        />
                      </fieldset>
                    </div>
                    <div class="col-lg-6">
                      <fieldset>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          pattern="[^ @]*@[^ @]*"
                          placeholder="Your Email"
                          required=""
                        />
                      </fieldset>
                    </div>
                    <div class="col-lg-6">
                      <fieldset>
                        <input
                          type="subject"
                          name="subject"
                          id="subject"
                          placeholder="Subject"
                          autocomplete="on"
                        />
                      </fieldset>
                    </div>
                    <div class="col-lg-12">
                      <fieldset>
                        <textarea
                          name="message"
                          type="text"
                          class="form-control"
                          id="message"
                          placeholder="Message"
                          required=""
                        ></textarea>
                      </fieldset>
                    </div>
                    <div class="col-lg-12">
                      <fieldset>
                        <button
                          type="submit"
                          id="form-submit"
                          class="main-button "
                        >
                          Send Message Now
                        </button>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact