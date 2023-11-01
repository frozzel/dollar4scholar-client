import React, {useEffect} from 'react';
import AOS from 'aos';

const Breadcrumbs = () => {
  return (
    <section id="breadcrumbs" className="breadcrumbs">
      <div className="breadcrumb-hero">
        <div className="container">
          <div className="breadcrumb-hero">
            <h2>DONOR LOGIN</h2>
            {/* <p>Est dolorum ut non facere possimus quibusdam eligendi voluptatem. Quia id aut similique quia voluptas sit quaerat debitis. Rerum omnis ipsam aperiam consequatur laboriosam nemo harum praesentium. </p> */}
          </div>
        </div>
      </div>
      <div className="container">
        <ol>
          <li><a href="index.html">Home</a></li>
          <li>Donor Login</li>
        </ol>
      </div>
    </section>
  );
};

const PricingSection = () => {
  useEffect(() => {
    AOS.init({duration: 2000, once: true});
   
  }
    , []);

  return (
    <section id="pricing" class="pricing">
      <div class="container">

        <div class="row">

          <div class="col-lg-3 col-md-6">
            <div class="box" data-aos="fade-up">
              <h3>Student Login</h3>
            
              <ul>
                <li>Aida dere</li>
                <li>Nec feugiat nisl</li>
                <li>Nulla at volutpat dola</li>
                <li class="na">Pharetra massa</li>
                <li class="na">Massa ultricies mi</li>
              </ul>
              <div class="btn-wrap">
                <a href="/auth/SignIn" class="btn-buy">Student Login</a>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 mt-4 mt-md-0">
            <div class="box featured" data-aos="fade-up" data-aos-delay="100">
              <h3>For Our Donors</h3>
           
              <ul>
                <li>Aida dere</li>
                <li>Nec feugiat nisl</li>
                <li>Nulla at volutpat dola</li>
                <li>Pharetra massa</li>
                <li class="na">Massa ultricies mi</li>
              </ul>
              <div class="btn-wrap">
                <a href="/auth/SignIn" class="btn-buy">Donor Login</a>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 mt-4 mt-lg-0">
            <div class="box" data-aos="fade-up" data-aos-delay="200">
              <h3>For Our Partners</h3>
             
              <ul>
                <li>Aida dere</li>
                <li>Nec feugiat nisl</li>
                <li>Nulla at volutpat dola</li>
                <li>Pharetra massa</li>
                <li>Massa ultricies mi</li>
              </ul>
              <div class="btn-wrap">
                <a href="//auth/SignIn" class="btn-buy">Institution Login</a>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 mt-4 mt-lg-0">
            <div class="box" data-aos="fade-up" data-aos-delay="300">
              <span class="advanced">Advanced</span>
              <h3>Get Straight To It</h3>
              
              <ul>
                <li>Aida dere</li>
                <li>Nec feugiat nisl</li>
                <li>Nulla at volutpat dola</li>
                <li>Pharetra massa</li>
                <li>Massa ultricies mi</li>
              </ul>
              <div class="btn-wrap">
                <a href="/auth/SignIn" class="btn-buy">Enter to Win</a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

const Donor = () => {
  return (
    <main id="main">
      <Breadcrumbs />
      <PricingSection />
    </main>
  );
};

export default Donor;
